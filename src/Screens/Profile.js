import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity as ITouchableOpacity,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {navigate} from '../Utils/Navigation/navigationRef';

import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Notification from '../Utils/Assets/Icons/Notification';
import ThreeDotss from './assets/images/ThreeDotss';
import King from './assets/images/premium-quality';
import GradiantButton from './assets/images/GradiantButton';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Path, Svg} from 'react-native-svg';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';

import {
  calculateAge,
  checkImageUrl,
  convertMentionsToPlainText,
  countFormatter,
  onShareLink,
  timeSince,
} from '../Utils/helpers';
import {
  fetchUserLv,
  fetchProfile,
  fetchUserMinis,
  blockUserAccount,
  fetchOtherUserLv,
  fetchUserSavedMinis,
  fetchOtherUserMinis,
  fetchUserMentionMinis,
  fetchUserFollowersAndFollowing,
  fetchOtherUserFollowersAndFollowing,
  fetchUserSavedLongVideoAction,
  fetchUserContacts,
  fetchPaginatedUserMinis,
  fetchPaginatedOtherUserMinis,
} from '../Store/Actions/profile';
import {store} from '../Store/store';
import {fetchNotificationsList} from '../Store/Actions/notifications';
import Menu from '../Components/Profile/Menu';

const UserProfile = ({route, navigation}) => {
  const [visible, setIsVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector(e => e.theme);
  const dataProfile = useSelector(e => e.profile?.profile);

  const refRBSheetFarward = useRef(null);
  const handleMenu = () => {
    refRBSheetFarward.current.handleMenu();
  };
  const {notifications, totalPages, filteredNotifications, isLoading} =
    useSelector(({notifications}) => notifications);
  // const data = route?.params?.item?.item;
  const data = dataProfile;

  useEffect(() => {
    dispatch(fetchProfile(setLoading));
  }, [data?._id]);
  useEffect(() => {
    dispatch(fetchNotificationsList(1, []));
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            paddingTop:
              Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
          }}>
          <ActivityIndicator animating={true} size={'large'} color={'white'} />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 15,
              backgroundColor: 'black',
              paddingTop:
                Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
            }}>
            <ITouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '20%',
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 70,
                  backgroundColor: '#303D5B',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Notification width={18} height={18} color={theme.text} /> */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NAVIGATION_ROUTES.NOTIFICATON)
                  }>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}>
                    <Path
                      fill={'white'}
                      d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            </ITouchableOpacity>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: theme.text,
              }}>
              {data?.first_name} {data?.last_name}
            </Text>
            <ITouchableOpacity
              onPress={() => {
                handleMenu();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '20%',
              }}>
              <ThreeDotss width={18} height={18} color={theme.text} />
            </ITouchableOpacity>
          </View>

          <ScrollView
            style={{
              paddingHorizontal: 15,
              backgroundColor: 'black',
              // paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
            }}
            contentContainerStyle={{paddingBottom: 75}}
            showsVerticalScrollIndicator={false}>
            {/* =======================================================Header Start========================================= */}

            {/* =======================================================Header End ========================================= */}
            {/* =======================================================Image Start========================================= */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#303D5B',
                }}>
                <ITouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}>
                  <Image
                    source={{
                      uri: checkImageUrl(
                        data?.profile_image,
                        `https://ui-avatars.com/api/?background=random&name=${data?.first_name}+${data?.last_name}`,
                      ),
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </ITouchableOpacity>
                <ImageView
                  images={[
                    {
                      uri: checkImageUrl(
                        data?.profile_image,
                        `https://ui-avatars.com/api/?background=random&name=${data?.first_name}+${data?.last_name}`,
                      ),
                    },
                  ]}
                  imageIndex={0}
                  visible={visible}
                  animationType={'slide'}
                  onRequestClose={() => setIsVisible(false)}
                />
                <King
                  style={{
                    width: 35,
                    height: 35,
                    position: 'absolute',

                    left: -18,
                    bottom: -10,
                    display: data?.is_bot ? 'flex' : 'none',
                  }}
                />
              </View>
            </View>
            {/* =======================================================Image End ========================================= */}
            {/* =======================================================Image Text & Caption Start ========================================= */}

            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '400',
                  color: theme.text,
                  marginTop: 10,
                }}>
                @{data?.user_name?.toLowerCase()}
              </Text>
            </View>
            <View
              style={{
                marginTop: 30,
                alignItems: 'center',
                display: data?.user_bio ? 'flex' : 'none',
              }}>
              <Text numberOfLines={0} style={{fontSize: 12, color: theme.text}}>
                {data?.user_bio}
              </Text>
            </View>
            {/* =======================================================Image Text & Caption End ========================================= */}
            {/* ======================================================= Followers Start ========================================= */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 28,
              }}>
              <View
                style={{
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: 6,
                  }}>
                  {Math.abs(data?.following_count)}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '700',
                    color: theme.text,
                  }}>
                  Following
                </Text>
              </View>
              <TouchableOpacity
                disabled={true}
                style={{
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: 6,
                  }}>
                  {Math.abs(data?.follower_count)}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '700',
                    color: theme.text,
                  }}>
                  Followers
                </Text>
              </TouchableOpacity>
            </View>
            {/* ======================================================= Followers End ========================================= */}
            {/* ======================================================= Edit Profile Start ========================================= */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 23,
              }}>
              <ITouchableOpacity
                onPress={() => {
                  navigate(NAVIGATION_ROUTES.EDIT_PROFILE, {
                    profileData: data,
                  });
                }}
                style={{
                  alignItems: 'flex-end',
                  backgroundColor: '#303D5B',
                  height: 35,
                  width: 250,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text,
                  }}>
                  Edit Profile
                </Text>
              </ITouchableOpacity>

              <ITouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  // navigate(NAVIGATION_ROUTES.SEARCH);
                  // navigate(NAVIGATION_ROUTES.SEARCH)
                }}>
                <GradiantButton />
              </ITouchableOpacity>
            </View>

            {/* ======================================================= Edit Profile End ========================================= */}
            {/* =======================================================  Line Start ========================================= */}
            <View
              style={{
                marginTop: 20,
                height: 1,
                width: '100%',
                backgroundColor: 'gray',
              }}
            />
            {/* =======================================================  Line End ========================================= */}

            <View
              style={{
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <ITouchableOpacity
                onPress={() => {
                  navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
                }}
                style={{
                  backgroundColor: '#303D5B',
                  alignItems: 'center',
                  height: 45,
                  width: 320,
                  borderRadius: 25,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../Assets/landing.png')}
                  style={{
                    width: 40,
                    height: 40,
                    paddingHorizontal: 15,
                    marginRight: 10,
                    marginLeft: 38,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: theme.text,
                  }}>
                  Start Fun Party
                </Text>
              </ITouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 24,
                // alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#6B6B6B',
                  paddingLeft: 15,
                }}>
                Previous Fun Party
              </Text>
            </View>
            <View
            //  style={{height:'10%'}}
            >
              {filteredNotifications.map((item, i) => {
                return (
                  <View style={{marginTop: 16, flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 70,
                        backgroundColor: '#303D5B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                        alignSelf: 'center',
                        overflow: 'hidden',
                      }}>
                      {/* <Text style={{color: '#FBC129', fontWeight: 'bold'}}>cw</Text> */}
                      {/* <Image source={{uri}} /> */}
                      <Image
                        source={{
                          uri: checkImageUrl(
                            item?.from?.profile_image,
                            `https://ui-avatars.com/api/?background=random&name=${item?.from?.first_name}+${item?.from?.last_name}`,
                          ),
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          // borderRadius: 25,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: theme.text,
                          marginBottom: 10,
                        }}>
                        {item?.from?.first_name} {item?.from?.last_name}{' '}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // backgroundColor: 'red',
                          width: '87%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.text,
                          }}>
                          invited your for a watch party{' '}
                        </Text>

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: theme.text,
                          }}>
                          {timeSince(new Date(item.createdAt))}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <Menu ref={refRBSheetFarward} />
          </ScrollView>
        </>
      )}
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
