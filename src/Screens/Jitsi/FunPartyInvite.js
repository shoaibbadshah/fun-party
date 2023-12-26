import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  Alert,
  FlatList,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {fetchUserFollowersAndFollowing} from '../../Store/Actions/profile';
import {inviteToFunParty} from '../../Store/Actions/minis';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';

import {
  searchByName,
  checkImageUrl,
  generateRandomMeetId,
} from '../../Utils/helpers';
import MinisSearch from '../../Assets/MinisSearch';
import WatchPartyGuide from '../../Components/WatchPartyGuide';
import {navigationRef} from '../../Utils/Navigation/navigationRef';
import LeftArrow from '../../Utils/Assets/Icons/LeftArrow';
import Menu from '../../Components/Profile/Menu';

const {width, height} = Dimensions.get('screen');

const FunPartyInvite = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);

  const [guidCheck, setGuidCheck] = useState(true);
  const [isloading, setisloading] = useState(true);
  const [friend, setFriend] = useState([]);

  const refRBSheetFarward = useRef(null);
  const handleMenu = () => {
    refRBSheetFarward.current.handleMenu();
  };
  const theme = useSelector(e => e.theme);

  const userFollowing = useSelector(e => e.userFollowerFollowing?.friendList);

  const userFollower = useSelector(e => e.userFollowerFollowing?.userFollower);

  const allUser = [...userFollowing, ...userFollower];

  const LOADING = useSelector(e => e.userFollowerFollowing?.isLoading);

  useEffect(() => {
    dispatch(fetchUserFollowersAndFollowing(setisloading)).then(e => {
      setFriend(userFollowing);
    });
  }, []);

  const onChangeText = e => {
    const searchName = searchByName(e, friend);
    setFriend(searchName);
  };

  const handleInvitePress = async () => {
    if (guidCheck) {
      setGuidCheck(!guidCheck);
    } else {
      const selectedUsersIds = checked.map(index => {
        const fff = friend[index]?._id;
        if (!fff) {
          return null;
        } else {
          return friend[index]?._id;
        }
      });

      const randomMeetId = generateRandomMeetId();
      const RoomID = `https://meet.shareslate.fun/${randomMeetId}?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4QjIzQTRCQTg1REU4NUQyOTIyNzAzRjMxOTQ5NjkzNCIsImlzcyI6IjhCMjNBNEJBODVERTg1RDI5MjI3MDNGMzE5NDk2OTM0Iiwic3ViIjoiKiIsInJvb20iOiIqIiwiaWF0IjoxNzAxMTA4ODA3LCJuYmYiOjE3MDEwOTk3MjAsImV4cCI6MTc0MTgwODUyMH0.VuPKduPs0droOLlH05w9QeL9ZNdEDyWmeSnTFzaXcJQ`;
      const body = {
        // users: selectedUsersIds,
        room: RoomID,
      };

      dispatch(inviteToFunParty(body));
      setGuidCheck(!guidCheck);
      navigation.navigate(NAVIGATION_ROUTES.JITSI, {RoomID: RoomID});
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: NAVIGATION_ROUTES.JITSI, RoomID: RoomID }],
      // });
    }
  };

  const toggleCheck = index => {
    const isSelected = checked.includes(index);
    if (isSelected) {
      setChecked(checked.filter(itemIndex => itemIndex !== index));
    } else {
      if (checked.length < 5) {
        setChecked([...checked, index]);
      } else {
        Alert.alert('Invite contact', 'Up to 5 contacts can be invited.');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme?.primary}]}>
      <StatusBar barStyle={theme.StatusBar} />

      {guidCheck ? (
        <>
          <View style={{paddingHorizontal: 15}}>
            <View
              style={[
                styles.flexStyle,
                {
                  // width: width - width / 2 + 40,
                  marginBottom: height - height + 20,
                },
              ]}>
              {/* <Icon
                name='chevron-back'
                size={23}
                color={theme.text}
                onPress={() => {
                  navigation.goBack();
                }}
              /> */}
              <LeftArrow
                onPress={() => navigationRef.current?.goBack()}
                color={'white'}
                width={24}
                height={24}
              />
              <Text
                style={{color: theme.text, fontWeight: 'bold', fontSize: 17}}>
                FunParty Invite
              </Text>
              <Icon
                name="settings-outline"
                size={22}
                color={theme.text}
                style={{paddingRight: 12}}
                onPress={handleMenu}
              />
            </View>
            <View style={{position: 'relative'}}>
              <View
                style={{
                  backgroundColor: theme.button,
                  height: 45,
                  width: '100%',
                  marginVertical: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                }}>
                <MinisSearch color={'grey'} width={18} height={18} />
                <TextInput
                  onChangeText={onChangeText}
                  style={{
                    width: '92%',
                    color: 'grey',
                    textAlign: 'left',
                  }}
                  placeholderTextColor={'grey'}
                  returnKeyType={'search'}
                  selectTextOnFocus={false}
                  contextMenuHidden={true}
                  placeholder={'Search'}
                />
              </View>
            </View>

            <FlatList
              data={friend}
              contentContainerStyle={{paddingBottom: 145}}
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: height - 160,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {isloading ? (
                    <ActivityIndicator color={theme.text} size={'large'} />
                  ) : (
                    <Text style={{color: theme.text}}>
                      you don't have any friends yet
                    </Text>
                  )}
                </View>
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.inviteUser}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#00000010',
                        borderRadius: width,
                        marginRight: 20,
                        overflow: 'hidden',
                      }}>
                      <FastImage
                        // defaultSource={require("../../Assets/avatar.jpg")}
                        // source={{ uri: checkImageUrl(item?.profile_image) }}
                        source={{
                          uri: checkImageUrl(
                            item?.profile_image,
                            `https://ui-avatars.com/api/?background=random&name=${item?.first_name}+${item?.last_name}`,
                          ),
                        }}
                        resizeMode={'cover'}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={{color: theme.text, fontWeight: 'bold'}}>
                      {item?.first_name} {item?.last_name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        theme.name === 'dark'
                          ? checked.includes(index)
                            ? theme.secondary
                            : 'black'
                          : checked.includes(index)
                          ? theme.secondary
                          : 'grey',
                      paddingHorizontal: 10,
                      height: 25,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => toggleCheck(index)}>
                    <Text style={{color: 'white'}}>
                      {checked.includes(index) ? 'Invite' : 'Invite'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <WatchPartyGuide />
      )}
      <TouchableOpacity
        onPress={handleInvitePress}
        disabled={checked.length == 0 ? true : false}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          left: 30,
          backgroundColor: checked.length == 0 ? 'grey' : theme.secondary,
          borderRadius: 8,
          width: width - 60,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 16, padding: 10}}>
          {guidCheck ? 'Invite' : 'Start FunParty'}
        </Text>
      </TouchableOpacity>
      <Menu ref={refRBSheetFarward} />
    </SafeAreaView>
  );
};

export default FunPartyInvite;

const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {flex: 1},
  inviteUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  userInfo: {
    width: 30,
    height: 30,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
