import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity as ITouchableOpacity,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import ImageView from 'react-native-image-viewing';

import {Path, Svg} from 'react-native-svg';
import Menu from '../Components/Profile/Menu';
import King from './assets/images/premium-quality';
import ThreeDotss from './assets/images/ThreeDotss';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProfile} from '../Store/Actions/profile';
import {useIsFocused} from '@react-navigation/native';
import RightArrow from '../Utils/Assets/Icons/RightArrow';
import {checkImageUrl, timeSince} from '../Utils/helpers';
import {navigate} from '../Utils/Navigation/navigationRef';
import GradiantButton from './assets/images/GradiantButton';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {fetchNotificationsList} from '../Store/Actions/notifications';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';

const UserProfile = ({route, navigation}) => {
  const [visible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector(e => e.theme);
  const dataProfile = useSelector(e => e.profile?.profile);

  const refRBSheetFarward = useRef(null);
  const handleMenu = () => {
    refRBSheetFarward.current.handleMenu();
  };
  const {notifications, totalPages, filteredNotifications, isLoading} =
    useSelector(({notifications}) => notifications);
  const isFocused = useIsFocused();
  const data = dataProfile;
  const userFollowing = useSelector(
    e => e.userFollowerFollowing?.userFollowing,
  );
  useEffect(() => {
    dispatch(fetchProfile());
  }, [isFocused]);
  useEffect(() => {
    dispatch(fetchNotificationsList(1, []));
  }, []);

  return (
    <>
      <StatusBar barStyle={theme.statusbar} />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 15,
          backgroundColor: 'black',
          paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
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
            fontSize: 20,
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
          width: '100%',
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
                // fontSize: 12,
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
                // fontSize: 12,
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
              navigation.navigate(NAVIGATION_ROUTES.SEARCH);
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
              navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE, {
                index: userFollowing?.length >= 1 ? 0 : 1,
              });
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
              source={require('../Assets/MAINLOGO.png')}
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
        <View>
          {filteredNotifications.map((item, i) => {
            return (
              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  marginHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 70,
                    backgroundColor: '#303D5B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={{
                      uri: checkImageUrl(
                        item?.from?.profile_image,
                        `https://ui-avatars.com/api/?background=random&name=${item?.from?.first_name}+${item?.from?.last_name}`,
                      ),
                    }}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 70,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{marginLeft: 10, flex: 1}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: theme.text,
                    }}>
                    {item?.from?.first_name} {item?.from?.last_name}{' '}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: theme.text,
                        // marginRight: 20,
                      }}>
                      Invited you for a fun party
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
      <View style={{backgroundColor: 'black', height: '6%'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_ROUTES.NOTIFICATON)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
              marginTop: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 15,
              }}>
              More activities
            </Text>
            <RightArrow width={12} height={10} color={theme.text} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
