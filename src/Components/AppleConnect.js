/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {appleLogin} from '../Store/Actions/auth';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {API} from '../Api';
import TouchableOpacity from './TouchableOpacity';
import TextInput from './TextInput';
import {setUser} from '../Store/Actions/user';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';

import ImageCropPicker from 'react-native-image-crop-picker';

export default function AppleConnect({isDecide}) {
  const theme = useSelector(s => s.theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUserApple] = useState(null);

  const [firstName, setFirstName] = useState();
  const [phone, setPhone] = useState();
  const [modalEmail, setModalEmail] = useState();
  const [lastName, setLastName] = useState();
  const [dp, setDp] = useState();

  const [isChangePassVisible, setIsChangePassVisible] = useState(false);
  const handleChangePassword = () => {
    setIsChangePassVisible(!isChangePassVisible);
  };
  const updateAppleSignup = () => {
    if (!firstName || !lastName || !modalEmail) {
      Alert.alert('Missing information', 'Complete your profile to continue.');
    } else {
      dispatch(
        appleLogin(
          {
            familyName: lastName,
            givenName: firstName,
            user: user,
            email: modalEmail,
            // phone_no: phone,
          },
          navigation,
        ),
      );
      handleChangePassword();
    }
  };
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      try {
        const {data} = await API.v1.Auth.appleLoginVerify({
          apple_id: appleAuthRequestResponse.user,
          // apple_id:
          //   '34567890vy78uioiuh9rtyuoi.34567890vy78uioiuh9rtyuoi.iouy5678',
        });
        // console.log(
        //   '🚀 ~ file: AppleConnect.js:73 ~ onAppleButtonPress ~ data:',
        //   data.data,
        // );
        await dispatch(setUser(data.data));
        navigation.navigate(NAVIGATION_ROUTES.PROFILE);
        //
      } catch (error) {
        // console.log(
        //   '🚀 ~ file: AppleConnect.js:81 ~ onAppleButtonPress ~ error:',
        //   error,
        // );
        //
        if (credentialState === appleAuth.State.REVOKED) {
          // User has revoked access to their Apple ID, handle this appropriately.
        } else if (credentialState === appleAuth.State.AUTHORIZED) {
          if (
            appleAuthRequestResponse.email == null
            // appleAuthRequestResponse.fullName == null &&
            // appleAuthRequestResponse.user == null
          ) {
            //====== if we have got the email & full name then populate the modal

            handleChangePassword();
            setFirstName(appleAuthRequestResponse.fullName.familyName);
            setLastName(appleAuthRequestResponse.fullName.givenName);
            setModalEmail(appleAuthRequestResponse.email);
            setUserApple(appleAuthRequestResponse.user);
          } else {
            dispatch(
              appleLogin(
                {
                  // familyName: 'Amber',
                  familyName: appleAuthRequestResponse.fullName.familyName,
                  // givenName: 'herd',
                  givenName: appleAuthRequestResponse.fullName.givenName,
                  user: appleAuthRequestResponse.user,
                  email: appleAuthRequestResponse.email,
                  // email: 'amber@herd.com',
                },
                navigation,
              ),
            );
          }
        } else {
          // console.log('Apple authentication request was revoked by the user');
        }
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // console.log('Apple authentication request was canceled by the user');
      } else {
        console.error('Apple login error:', error);
      }
    }
  };
  const onProfileImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,

      cropperCircleOverlay: true,
    }).then(image => {
      setDp('file://' + image?.path);
      // if (isIos) {
      //   handleChangeValue("file://" + image?.path, "profile_image");
      // } else {
      //   handleChangeValue(image?.path, "profile_image");
      // }
    });
  };
  return (
    <>
      {Platform.OS === 'ios' && (
        <>
          {/* <AppleButton
            buttonStyle={AppleButton.Style.WHITE_OUTLINE}
            buttonType={AppleButton.Type.CONTINUE}
            style={{
              marginTop: 15,
              height: 48,
              width: 56,
              
            }}
            onPress={() => onAppleButtonPress()}logo-apple
            onPress={() => onAppleButtonPress()} 
          /> */}
          <TouchableOpacity
            onPress={() => onAppleButtonPress()}
            style={{
              // flex: 1,

              height: 48,
              width: 56,
              backgroundColor: '#303D5B',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: isDecide ? 50 : 5,
              marginLeft: isDecide ? 0 : 15,
            }}>
            <Ionicons name="logo-apple" size={25} color={'white'} />
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isChangePassVisible}
            onRequestClose={handleChangePassword}
            style={{margin: 0, flex: 1}}>
            <TouchableOpacity
              onPress={handleChangePassword}
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  backgroundColor: theme.primary,
                  width: '90%',
                  borderRadius: 10,
                  padding: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Complete your profile
                </Text>
                <TouchableOpacity
                  noBg
                  onPress={onProfileImage}
                  style={{
                    height: 112,
                    width: 112,
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{
                      height: 110,
                      width: 110,
                      borderRadius: 100,
                      backgroundColor: 'white',
                      overflow: 'hidden',
                    }}
                    source={{
                      uri: dp
                        ? dp
                        : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                    }}
                    // defaultSource={require("../Assets/avatar.jpg")}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      alignSelf: 'flex-end',
                    }}
                    noBg
                    onPress={() => {
                      // onProfileImage();
                    }}>
                    {/* <PencilSvg width={20} height={20} color={"#5E72E4"} /> */}
                  </TouchableOpacity>
                </TouchableOpacity>
                <TextInput
                  value={firstName}
                  placeholder="First name"
                  onChangeText={e => {
                    setFirstName(e);
                  }}
                />
                <TextInput
                  value={lastName}
                  placeholder="Last name"
                  onChangeText={e => {
                    setLastName(e);
                  }}
                />
                {/* <TextInput
                  value={phone}
                  keyboardType='phone-pad'
                  placeholder='Phone number'
                  onChangeText={(e) => {
                    setPhone(e);
                  }}
                /> */}
                <TextInput
                  value={modalEmail}
                  placeholder="Email"
                  inputMode="email"
                  keyboardType="email-address"
                  onChangeText={e => {
                    setModalEmail(e);
                  }}
                />

                <Pressable
                  onPress={updateAppleSignup}
                  style={{
                    backgroundColor: theme.black,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: '70%',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 45,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: theme.white,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Continue
                  </Text>
                </Pressable>
              </Pressable>
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </>
  );
}
