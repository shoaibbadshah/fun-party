import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  StatusBar,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import {checkImageUrl, isIos} from '../Utils/helpers';
import {LocationNewSvg, PencilSvg} from '../Assets/Svgs';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import {fetchProfile, updateProfile} from '../Store/Actions/profile';
import CaretArrowBottomIcon from '../Utils/Assets/Icons/CaretArrowBottomIcon';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import {updateUser} from '../Store/Actions/user';

const usernameRegex = /^[a-z0-9_]+$/;

const validateUsername = username => {
  if (!usernameRegex.test(username)) {
    return false;
  }
  return true;
};

const EditProfile = props => {
  const {route} = props;
  const {width, height} = Dimensions.get('screen');

  const sex = route?.params?.profileData.gender;
  const {data} = useSelector(({user}) => user);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const theme = useSelector(e => e.theme);

  const [gender, setGender] = useState(sex);
  const [editLoading, setEditLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [locationName, setLocationname] = useState(null);
  const [location, setLocation] = useState(null);

  const [dateShow, setDateShow] = useState(
    route?.params?.profileData?.date_of_birth &&
      moment(route?.params?.profileData?.date_of_birth).toDate(),
  );

  // const [currentLocation, setCurrentLocation] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentLocation({
  //           description: 'Current Location',
  //           geometry: { location: { lat: latitude, lng: longitude } },
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );
  //   } else {
  //     console.log('Geolocation is not supported');
  //   }
  // }, []);

  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(1900);
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const refRBSheet = useRef(null);

  const [editProfileData, setEditProfileData] = useState({
    first_name: route?.params?.profileData?.first_name
      ? route?.params?.profileData?.first_name
      : '',
    last_name: route?.params?.profileData?.last_name
      ? route?.params?.profileData?.last_name
      : '',
    user_name: route?.params?.profileData?.user_name
      ? route?.params?.profileData?.user_name?.toLowerCase()
      : '',
    address: route?.params?.profileData?.address
      ? route?.params?.profileData?.address
      : '',
    bio: route?.params?.profileData?.user_bio
      ? route?.params?.profileData?.user_bio
      : '',
    profile_image: route?.params?.profileData?.profile_image
      ? route?.params?.profileData?.profile_image
      : '',
    email: route?.params?.profileData?.email
      ? route?.params?.profileData?.email
      : '',
  });
  console.log(
    '🚀 ~ file: EditProfile.js:113 ~ EditProfile ~ editProfileData:',
    editProfileData?.profile_image,
  );

  const handleChangeValue = (value, name) => {
    //
    setEditProfileData({...editProfileData, [name]: value});
    if (!validateUsername(value) && [name] == 'user_name') {
      setValidationMessage('Username can only contain letters and numbers.');
    } else {
      setValidationMessage('');
    }

    //
  };
  const onProfileImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,

      cropperCircleOverlay: true,
    }).then(image => {
      if (isIos) {
        handleChangeValue('file://' + image?.path, 'profile_image');
      } else {
        handleChangeValue(image?.path, 'profile_image');
      }
    });
  };
  const handleSubmitData = async () => {
    if (
      !editProfileData?.first_name ||
      !editProfileData?.last_name ||
      !editProfileData?.user_name
    ) {
      Alert.alert(
        'Information missing',
        'Fill out the required information to continue.',
      );
    } else {
      let fcmToken = await messaging().getToken();

      let token = {};
      if (isIos) {
        token.ios = fcmToken;
      } else {
        token.android = fcmToken;
      }

      const formdata = new FormData();

      formdata.append('first_name', editProfileData?.first_name);
      formdata.append('gender', gender);
      formdata.append('fcm_token', JSON.stringify(token));
      formdata.append('last_name', editProfileData?.last_name);
      formdata.append('user_name', editProfileData?.user_name);

      formdata.append(
        'city',
        location?.city !== 'undefined' && location?.city !== undefined
          ? location.city
          : editProfileData?.address?.city !== 'undefined' &&
            editProfileData?.address?.city !== undefined
          ? editProfileData?.address?.city
          : editProfileData?.address,
      );

      formdata.append(
        'country',
        location?.city !== 'undefined' && location?.city !== undefined
          ? location.country
          : editProfileData?.address?.city !== 'undefined' &&
            editProfileData?.address?.city !== undefined
          ? editProfileData?.address?.country
          : editProfileData?.address,
      );

      formdata.append('bio', editProfileData?.bio);
      formdata.append(
        'date_of_birth',
        dateShow ? moment(dateShow).format('YYYY/MM/DD') : '',
      );

      editProfileData?.profile_image &&
        formdata.append('image', {
          uri: editProfileData?.profile_image,
          name: 'profile.jpeg',
          type: 'image/jpeg',
        });
      try {
        // const response = await API.v1.Minis.createMini({
        // const response = await axios({
        //   url: "https://apis.shareslate.fun/api/users/edit_profile",
        //   method: "PUT",
        //   data: formdata,
        //   headers: {
        //     Accept: "*/*",
        //     Authorization: `Bearer ${data.token}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        setEditLoading(true);
        const response = await axios.put(
          'https://apis.shareslate.fun/api/users/edit_profile',
          formdata,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${data.token}`, // Replace with your actual token
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('responsessss', response);
        setEditLoading(false);
        // await dispatch(setProfile(data?.data));
        await dispatch(fetchProfile());

        await dispatch(updateUser(response.data?.data?.profile_image));
        console.log(
          '🚀 ~ file: EditProfile.js:222 ~ handleSubmitData ~ response.data?.data?.profile_image:',
          response.data?.data?.profile_image,
        );

        navigation.goBack();
        // if (response.status === 200) {
        //   return response.data;
        // } else {
        //   alert('An error has occurred inside return handle');
        //   BackgroundService.stop();
        //   return;
        // }
      } catch (error) {
        console.log(
          '🚀 ~ file: CreateMini.js:224 ~ veryIntensiveTask ~ error:',
          JSON.stringify(error),
        );
        setEditLoading(false);
        // BackgroundService.stop();
        // alert("An error has occurred");
        // return;
      }
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleLocation = () => {
    refRBSheet.current.open();
  };

  const styles = useStyles(theme);

  return (
    <>
      <StatusBar
        barStyle={theme.statusbar}
        backgroundColor={theme.background}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled
        style={{backgroundColor: theme.primary}}>
        <View
          style={{
            ...styles.editProfileContainer,
          }}>
          <View style={styles.editProfileHeader}>
            {route && (
              <TouchableOpacity
                style={styles.editBackWrapper}
                onPress={() => navigation.goBack()}>
                <LeftArrow color={theme.text} width={18} height={18} />
              </TouchableOpacity>
            )}
            <View style={styles.editHeaderWrapper}>
              <Text style={[styles.editTextStyle, {color: theme.text}]}>
                Edit Profile
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editButtonTouchStyle}
              onPress={handleSubmitData}>
              <Text style={styles.buttonTextStyle}>
                {editLoading ? (
                  <ActivityIndicator style={{paddingTop: 3}} color={'#000'} />
                ) : (
                  'Save'
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.editFormWrapper}>
            <View style={styles.editFormInnerWrapper}>
              <View style={styles.profileImageFieldWrapper}>
                <TouchableOpacity
                  onPress={onProfileImage}
                  style={{
                    height: 112,
                    width: 112,
                  }}>
                  <Image
                    style={{
                      height: 110,
                      width: 110,
                      borderRadius: 100,
                      backgroundColor: 'white',
                      overflow: 'hidden',
                    }}
                    // source={{
                    //   uri: editProfileData?.profile_image
                    //     ? editProfileData?.profile_image
                    //     : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                    // }}
                    source={{
                      uri: checkImageUrl(
                        editProfileData?.profile_image,
                        `https://ui-avatars.com/api/?background=random&name=${editProfileData?.first_name}+${editProfileData?.last_name}`,
                      ),
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      alignSelf: 'flex-end',
                    }}
                    noBg
                    onPress={() => {
                      onProfileImage();
                    }}>
                    <PencilSvg width={20} height={20} color={theme.text} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  User Name
                </Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundHighlight,
                    },
                  ]}
                  value={editProfileData?.user_name}
                  onChangeText={e => handleChangeValue(e, 'user_name')}
                  placeholder="username"
                  autoCapitalize="none"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                />
                {validationMessage !== '' && (
                  <Text style={{color: 'red'}}>{validationMessage}</Text>
                )}
              </View>
              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      color: 'grey',
                      backgroundColor: theme.backgroundHighlight,
                    },
                  ]}
                  value={editProfileData?.email}
                  onChangeText={e => handleChangeValue(e, 'email')}
                  placeholder="email"
                  autoCapitalize="none"
                  placeholderTextColor={'grey'}
                  keyboardType="default"
                  editable={false}
                />
                {validationMessage !== '' && (
                  <Text style={{color: 'red'}}>{validationMessage}</Text>
                )}
              </View>
              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  First Name
                </Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundHighlight,
                    },
                  ]}
                  value={editProfileData?.first_name}
                  placeholderTextColor={'grey'}
                  onChangeText={e => handleChangeValue(e, 'first_name')}
                  placeholder="First Name"
                  keyboardType="default"
                />
              </View>
              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  Last Name
                </Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundHighlight,
                    },
                  ]}
                  value={editProfileData?.last_name}
                  placeholderTextColor={'grey'}
                  onChangeText={e => handleChangeValue(e, 'last_name')}
                  placeholder="Last Name"
                  keyboardType="default"
                />
              </View>

              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  Date Of Birth
                </Text>
                <Pressable
                  style={[
                    styles.datePickerWrapper,
                    {backgroundColor: theme.backgroundHighlight},
                  ]}
                  onPress={showDatePicker}>
                  <Text
                    style={{
                      color: theme.text,
                    }}>
                    {dateShow
                      ? moment(dateShow).format('YYYY/MM/DD')
                      : 'Select a date'}
                  </Text>

                  {/* <CaretArrowBottomIcon
                    width={25}
                    height={25}
                    color={theme.text}
                  /> */}

                  <Ionicons name="chevron-down" size={22} color={theme.text} />
                </Pressable>
                {isDatePickerVisible && (
                  <DatePicker
                    modal
                    open={isDatePickerVisible}
                    date={dateShow ? dateShow : new Date()}
                    mode={'date'}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onConfirm={date => {
                      setDatePickerVisibility(false);
                      setDateShow(date);
                    }}
                    onCancel={() => {
                      setDatePickerVisibility(false);
                    }}
                  />
                )}
              </View>

              <Text style={[styles.inputFieldWrapper, {color: theme?.text}]}>
                Gender
              </Text>

              <View style={styles.genderWrapperStyling}>
                <TouchableOpacity
                  style={{
                    borderColor:
                      gender === 'male' || gender === 'Male'
                        ? '#5E72E4'
                        : '#ACACAC',
                    ...styles.genderWrapperStyle,
                  }}
                  onPress={() => setGender('male')}>
                  <Ionicons
                    // width={23}
                    // height={34}
                    name="male-outline"
                    color={
                      gender === 'male' || gender === 'Male'
                        ? '#5E72E4'
                        : '#ACACAC'
                    }
                  />
                  <Text
                    style={{
                      ...styles.genderTextStyle,
                      color:
                        gender === 'male' || gender === 'Male'
                          ? '#5E72E4'
                          : '#ACACAC',
                    }}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderColor:
                      gender === 'female' || gender === 'Female'
                        ? '#5E72E4'
                        : '#ACACAC',
                    ...styles.genderWrapperStyle,
                  }}
                  onPress={() => setGender('female')}>
                  <Ionicons
                    // width={23}
                    // height={34}
                    name="female-outline"
                    color={
                      gender === 'female' || gender === 'Female'
                        ? '#5E72E4'
                        : '#ACACAC'
                    }
                  />
                  <Text
                    style={{
                      ...styles.genderTextStyle,
                      color:
                        gender === 'female' || gender === 'Female'
                          ? '#5E72E4'
                          : '#ACACAC',
                    }}>
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderColor:
                      gender === 'others' || gender === 'Others'
                        ? '#5E72E4'
                        : '#ACACAC',
                    ...styles.genderWrapperStyle,
                  }}
                  onPress={() => setGender('others')}>
                  <FontAwesome
                    // width={23}
                    // height={34}
                    name="genderless"
                    color={
                      gender === 'others' || gender === 'Others'
                        ? '#5E72E4'
                        : '#ACACAC'
                    }
                  />
                  <Text
                    style={{
                      ...styles.genderTextStyle,
                      color:
                        gender === 'others' || gender === 'Others'
                          ? '#5E72E4'
                          : '#ACACAC',
                    }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputFieldWrapper, {marginTop: 12}]}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  Location
                </Text>
                <TouchableOpacity
                  onPress={handleLocation}
                  style={[
                    styles.datePickerWrapper,
                    {backgroundColor: theme.backgroundHighlight},
                  ]}>
                  <Text
                    style={{
                      color: theme.text,
                      width: '92%',
                      // height: 40,
                    }}
                    multiline={false}
                    numberOfLines={1}
                    maxLength={40}
                    placeholderTextColor={'grey'}
                    onChangeText={e => handleChangeValue(e, 'address')}
                    placeholder="Tap here"
                    keyboardType="default">
                    {location?.city !== 'undefined' &&
                    location?.city !== undefined
                      ? location.city +
                        `${location.city && ', '}` +
                        location.country
                      : editProfileData?.address?.city !== 'undefined' &&
                        editProfileData?.address?.city !== undefined
                      ? editProfileData?.address?.city +
                        `${editProfileData?.address?.city && ', '}` +
                        editProfileData?.address?.country
                      : editProfileData?.address
                      ? editProfileData?.address
                      : 'Tap here'}
                  </Text>
                  {/* <Ionicons
                    size={25}
                    onPress={handleLocation}
                    name={"location-outline"}
                    color={theme.text}
                  /> */}
                  <LocationNewSvg size={22} color={'white'} />
                </TouchableOpacity>
              </View>

              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('screen').height / 1.2}
                closeOnPressBack={true}
                openDuration={50}
                customStyles={{
                  draggableIcon: {
                    backgroundColor: 'grey',
                  },
                  container: {
                    borderRadius: 15,
                    backgroundColor: theme.primary,
                  },
                }}>
                <SafeAreaView style={{flex: 1}}>
                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    listViewDisplayed={false}
                    onPress={(data, details = null) => {
                      console.log('Location closed');
                      setLocationname(details);
                      const {address_components} = details;
                      const city = address_components.find(c =>
                        c?.types?.includes('locality'),
                      )?.long_name;
                      const state = address_components.find(c =>
                        c?.types?.includes('administrative_area_level_1'),
                      )?.long_name;
                      const country = address_components.find(c =>
                        c?.types?.includes('country'),
                      )?.long_name;
                      setLocation({
                        ...details.geometry.location,
                        city: city ? city : '',
                        state: state ? state : '',
                        country: country ? country : '',
                      });
                      refRBSheet.current.close();
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    listEmptyComponent={() => (
                      <View
                        style={{
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: theme.primary,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: theme.text,
                            marginTop: '10%',
                          }}>
                          No results were found
                        </Text>
                      </View>
                    )}
                    styles={{
                      textInputContainer: {
                        height: 40,
                        marginHorizontal: 12,
                        zIndex: 1,
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: theme.button,
                        overflow: 'hidden',
                      },
                      container: {
                        backgroundColor: theme.primary,
                        height: 40,
                        width: '90%',
                        alignSelf: 'center',
                      },
                      listView: {
                        backgroundColor: theme.primary,
                        marginHorizontal: 15,
                      },

                      row: {
                        backgroundColor: theme.button,
                      },
                      textInput: {
                        color: theme.text,
                        height: 40,
                        width: '90%',
                        overflow: 'hidden',
                        backgroundColor: theme.button,
                      },
                      description: {
                        color: theme.text,
                      },
                    }}
                    query={{
                      key: 'AIzaSyA6962QZEZa1hXFPm0U5DdDn7tsy3MN1-M',
                      language: 'en',
                    }}
                  />
                </SafeAreaView>
              </RBSheet>

              <View style={styles.inputFieldWrapper}>
                <Text style={[styles.fieldLabelStyle, {color: theme.text}]}>
                  About me
                </Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      justifyContent: 'flex-end',
                      textAlignVertical: 'top',
                      height: 125,
                      color: theme.text,
                      backgroundColor: theme.backgroundHighlight,
                    },
                  ]}
                  maxLength={120}
                  placeholderTextColor={'grey'}
                  value={editProfileData?.bio}
                  onChangeText={e => handleChangeValue(e, 'bio')}
                  placeholder="Type here..."
                  keyboardType="default"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const useStyles = theme =>
  StyleSheet.create({
    editProfileContainer: {
      paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
    },
    editProfileHeader: {
      flexDirection: 'row',
      width: '100%',
    },
    editBackWrapper: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 12,
      width: '20%',
    },
    editHeaderWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editTextStyle: {
      // marginLeft: 5,
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    editFormWrapper: {
      backgroundColor: 'transparent',
      padding: 0,
      marginHorizontal: 10,
      marginVertical: 10,
      paddingBottom: 22,
    },
    editFormInnerWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    inputFieldWrapper: {
      width: '100%',
      padding: 10,
    },
    profileImageFieldWrapper: {
      width: '100%',
      padding: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    fieldLabelStyle: {
      marginBottom: 10,
    },
    textInputStyle: {
      backgroundColor: '#fff',
      margin: 0,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      borderColor: 'transparent',
    },
    datePickerWrapper: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 0,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      borderColor: 'transparent',
    },
    editButtonContainer: {
      bottom: 0,
      marginHorizontal: 10,
    },

    editButtonTouchStyle: {
      // backgroundColor: '#5E72E4',
      backgroundColor: theme.secondary,
      width: '20%',
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 7,
      borderRadius: 5,
    },
    buttonTextStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    genderWrapperStyling: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    genderWrapperStyle: {
      opacity: 1,
      paddingHorizontal: 10,
      width: Dimensions.get('screen').width / 3.42,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 2,
      borderRadius: 150,
      paddingVertical: 12,
    },
  });
export default EditProfile;
