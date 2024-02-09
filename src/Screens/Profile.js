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
} from 'react-native';
import ImageView from 'react-native-image-viewing';

import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Notification from '../Utils/Assets/Icons/Notification';
import ThreeDotss from './assets/images/ThreeDotss';
import King from './assets/images/premium-quality';
import GradiantButton from './assets/images/GradiantButton';
import React, {useState, useEffect} from 'react';
import {Path, Svg} from 'react-native-svg';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';

import {
  calculateAge,
  checkImageUrl,
  convertMentionsToPlainText,
  countFormatter,
  onShareLink,
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

const UserProfile = ({route, navigation}) => {
  const [visible, setIsVisible] = useState(false);
  const [item, setItem] = useState(route?.params?.item?.item);
  const [profileData, setProfileData] = useState(null);
  const [miniArrauy, setMiniArrauy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minisloading, setMinisLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const user = store.getState().user;
  const dispatch = useDispatch();
  const theme = useSelector(e => e.theme);
  const dataProfile = useSelector(e => e.profile?.profile);
  const otherUserMinisData = useSelector(state => state.otherUserMinis);
  const userMinisSelfData = useSelector(state => state.userMinis);

  console.log('check username dataProfile=======================', dataProfile);

  const screenName = route?.params?.item?.screenName;
  console.log('check username screenName=======================', screenName);
  // const data = route?.params?.item?.item;
  const data =
    screenName === 'OtherProfile' ? route?.params?.item?.item : dataProfile;
  console.log('check username data=======================', data);

  const userMinisData =
    screenName === 'OtherProfile'
      ? otherUserMinisData?.otherUserMinis
      : userMinisSelfData?.userMinis;

  useEffect(() => {
    setProfileData(
      route?.params?.item?.item?.is_followed ? 'following' : 'Follow',
    );

    if (screenName !== 'OtherProfile') {
      dispatch(fetchProfile());
    } else {
      dispatch(
        fetchOtherUserMinis(
          page,
          {user_id: data?._id},
          setLoading,
          setMinisLoading,
        ),
      );
      dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
      dispatch(fetchOtherUserLv(page, {user_id: data?._id}, setLoading)); //long videos instead of mentions
    }
  }, [data?._id]);

  // const handleFollow = async () => {
  //   if (profileData === 'following') {
  //     const body = {
  //       following_id: data?._id,
  //     };
  //     dispatch(userFollowing(body, setProfileData, setLoadingFollow));
  //     data.follower_count = data.follower_count > 0 && data.follower_count - 1;
  //   } else {
  //     const body = {
  //       following_id: data?._id,
  //     };
  //     dispatch(userFollow(body, setProfileData, false, setLoadingFollow));
  //     data.follower_count = data.follower_count + 1;
  //   }
  //   dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
  // };

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 15,
        backgroundColor: 'black',
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
      }}
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      {/* =======================================================Header Start========================================= */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
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
            // onPress={() =>
            //   navigation.navigate(NAVIGATION_ROUTES.NOTIFICATON)
            // }
            >
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
          {data?.user_name?.toLowerCase()}
        </Text>
        <ITouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '20%',
          }}>
          <ThreeDotss width={18} height={18} color={theme.text} />
        </ITouchableOpacity>
      </View>
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
        {/* <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '700',
            color: theme.text,
            marginTop: 14,
          }}>
          Beautiful emaige shwoing the beach name of the beach and name of
        </Text> */}
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
            {Math.abs(data?.fun_count)}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '700',
              color: theme.text,
            }}>
            Fun Party
          </Text>
        </View>
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
          }}>

          <GradiantButton />
        </ITouchableOpacity>
        {/* <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={Dimensions.get("screen").height / 2.3}
              closeOnPressBack={true}
              openDuration={50}
              customStyles={{
                draggableIcon: {
                  backgroundColor: "grey",
                },
                container: {
                  borderRadius: 15,
                  backgroundColor: theme.primary,
                },
              }}
            >
              <GradiantButton
                mini_id={data?._id}
                onSubmit={handleShareCLose}
                getRef={(c) => setProductQRref(c)}
                from={"profile"}
              />
            </RBSheet> */}

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
      {/* =======================================================  Line Start ========================================= */}

      <View
        style={{
          marginTop: 20,
          alignSelf: 'center',
        }}>
        <ITouchableOpacity
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
          }}>
          <Text style={{color: '#FBC129', fontWeight: 'bold'}}>cw</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 10,
            }}>
            @linelinelinelineline
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
            }}>
            invited your for a watch party{' '}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: theme.text,
              }}>
              3d ago
            </Text>
          </Text>
        </View>
      </View>
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
          }}>
          <Text style={{color: '#FBC129', fontWeight: 'bold'}}>cw</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 10,
            }}>
            @linelinelinelineline
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text,
            }}>
            invited your for a watch party{' '}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: theme.text,
              }}>
              3d ago
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
