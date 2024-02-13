import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  Image,
  FlatList,
  Platform,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserFollowersAndFollowing} from '../../Store/Actions/profile';
import {inviteToFunParty} from '../../Store/Actions/minis';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';

import {
  searchByName,
  checkImageUrl,
  generateRandomMeetId,
  generateLink,
} from '../../Utils/helpers';
import MinisSearch from '../../Assets/MinisSearch';
import WatchPartyGuide from '../../Components/WatchPartyGuide';
import Menu from '../../Components/Profile/Menu';
import {HamburgerSVG} from '../../Assets/Svgs';
import {Path, Svg} from 'react-native-svg';
import {interstitial} from '../../../App';
import {AdEventType} from 'react-native-google-mobile-ads';
import LeftArrow from '../../Utils/Assets/Icons/LeftArrow';

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

  const userFollowing = useSelector(
    e => e.userFollowerFollowing?.userFollowing,
  );

  const userFollower = useSelector(e => e.userFollowerFollowing?.userFollower);
  const [search, setSearch] = useState('');
  const allUser = [...userFollowing, ...userFollower];
  const filterSearch = search
    ? userFollowing?.filter(x =>
        x.first_name.toLowerCase().includes(search.toLowerCase()),
      )
    : userFollowing;

  const LOADING = useSelector(e => e.userFollowerFollowing?.isLoading);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }
  useEffect(() => {
    dispatch(fetchUserFollowersAndFollowing(setisloading));
    setFriend(allUser);
  }, []);

  const onChangeText = e => {
    const searchName = searchByName(e, friend);
    setFriend(searchName);
    setSearch(e);
  };

  const handleInvitePress = async () => {
    const randomMeetId = generateRandomMeetId();
    setSearch('');

    const generate = await generateLink(randomMeetId);
    console.log(generate, 'new generate', randomMeetId);
    if (guidCheck) {
      setGuidCheck(!guidCheck);
    } else {
      const body = {
        users: checked,
        room: generate,
        web_link: `https://shareslate.fun/funparty?meet=${randomMeetId}`,
        room_code: randomMeetId,
      };
      console.log(body, 'new thingss');

      dispatch(inviteToFunParty(body));
      setGuidCheck(!guidCheck);
      interstitial.loaded ? interstitial.show() : interstitial.load();
      navigation.navigate(NAVIGATION_ROUTES.JITSI, {roomId: randomMeetId});
      setChecked([]);
    }
  };

  const toggleCheck = (item, index) => {
    if (checked.includes(item._id)) {
      // If item is already checked, unselect it
      setChecked(checked.filter(id => id !== item._id));
    } else {
      // If item is not checked, select it
      setChecked([...checked, item._id]);
    }
    // setChecked([...checked, item._id]);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme?.primary,
          paddingTop: Platform.OS == 'ios' ? 12 : 0,
        },
      ]}>
      <StatusBar barStyle={theme.StatusBar} />

      {guidCheck ? (
        <View
          style={{
            paddingHorizontal: 15,
            flex: 1,
          }}>
          <View style={[styles.flexStyle]}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                // style={{
                //   justifyContent: 'center',
                //   alignItems: 'flex-start',
                //   paddingLeft: 15,
                //   width: '20%',
                // }}
              >
                <LeftArrow width={18} height={18} color={theme.text} />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              FunParty Invite
            </Text>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}

            <TouchableOpacity onPress={handleMenu}>
              <HamburgerSVG />
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={{position: 'relative'}}>
            <View
              style={{
                backgroundColor: '#1B2438',
                height: 45,
                //width: '100%',
                marginHorizontal: 15,
                marginVertical: 15,
                borderRadius: 10,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}>
              <MinisSearch color={'#B3B3B3'} width={18} height={18} />
              <TextInput
                onChangeText={onChangeText}
                style={{
                  width: '82%',
                  color: 'white',
                  textAlign: 'left',
                  marginLeft: 4,
                }}
                placeholderTextColor={'#B3B3B3'}
                returnKeyType={'search'}
                selectTextOnFocus={false}
                contextMenuHidden={true}
                placeholder={'Search contacts'}
              />
              <View
                style={{
                  backgroundColor: '#303D5B',
                  borderWidth: 1,
                  borderColor: 'black',
                  //backgroundColor: 'black',
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingHorizontal: 12,
                }}>
                <Text style={{color: 'white'}}>Search</Text>
              </View>
            </View>
          </View>

          {filterSearch.length > 0 ? (
            <FlatList
              data={filterSearch}
              contentContainerStyle={{
                paddingBottom: 245,
                // alignItems: 'center',
              }}
              // ListEmptyComponent={() => (
              //   <View
              //     style={{
              //       height: height - 200,
              //       flex: 1,
              //       justifyContent: 'center',
              //       alignItems: 'center',
              //       backgroundColor: 'red',
              //     }}>
              //     {isloading ? (
              //       <ActivityIndicator color={theme.text} size={'large'} />
              //     ) : (
              //       <Text
              //         style={{
              //           color: theme.text,
              //           justifyContent: 'center',
              //           textAlign: 'center',
              //           paddingHorizontal: 15,
              //         }}>
              //         Looks like you don't have any friends yet! Invite your
              //         friends for a watch party!
              //       </Text>
              //     )}
              //   </View>
              // )}
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
                          ? checked.includes(item?._id)
                            ? theme.secondary
                            : 'black'
                          : checked.includes(item?._id)
                          ? theme.secondary
                          : 'grey',
                      paddingHorizontal: 10,
                      height: 25,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => toggleCheck(item, index)}>
                    <Text style={{color: 'white'}}>
                      {checked.includes(index) ? 'Invite' : 'Invite'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                // height: height - 200,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              {isloading ? (
                <ActivityIndicator color={theme.text} size={'large'} />
              ) : (
                <Text
                  style={{
                    color: theme.text,
                    justifyContent: 'center',
                    textAlign: 'center',
                    paddingHorizontal: 15,
                  }}>
                  Looks like you don't have any friends yet! Invite your friends
                  for a watch party!
                </Text>
              )}
            </View>
          )}
        </View>
      ) : (
        <WatchPartyGuide guidCheck={guidCheck} setGuidCheck={setGuidCheck} />
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
          height: 45,
          //flex: 1,
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
