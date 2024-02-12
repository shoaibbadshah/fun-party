import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  StatusBar,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import {
  fetchPreviewMinis,
  fetchSearchMinisAndUsers,
  userFollow,
  userFollowing,
} from '../Store/Actions/minis';
import Text from '../Components/Text';
import MinisSearch from '../Assets/MinisSearch';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {checkImageUrl} from '../Utils/helpers';
import {API} from '../Api';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import {
  fetchOtherUserFollowersAndFollowing,
  fetchUserFollowersAndFollowing,
} from '../Store/Actions/profile';

const SearchMini = ({route}) => {
  const navigation = useNavigation();
  const dataProfile = useSelector(e => e.profile?.profile);
  const screenName = route?.params?.item?.screenName;

  const data = dataProfile;
  console.log('check data===================================', data);
  const [caption, setCaption] = useState(
    route?.params && route?.params?.hashTag
      ? `${route?.params?.hashTag}`
      : route?.params && route?.params?.location
      ? `${route?.params?.location}`
      : '',
  );
  const [isFocus, setIsFocus] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading1, setIsLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useSelector(e => e.theme);
  const {users} = useSelector(({previewMinis}) => previewMinis);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileData(
      route?.params?.item?.item?.is_followed ? 'following' : 'Follow',
    );
    if (screenName !== 'OtherProfile') {
      dispatch(fetchUserFollowersAndFollowing());
    } else {
      dispatch(fetchOtherUserMinis(page, {user_id: data?._id}, setLoading));
      dispatch(fetchOtherUserFollowersAndFollowing(data?._id, setLoading));
    }
  }, [data?._id, page]);

  const searchHandle = async () => {
    setIsFocus(true);
    dispatch(fetchSearchMinisAndUsers(caption));
  };
  useEffect(() => {
    if (route.params) {
      searchHandle();
    }
  }, [route.params]);

  // ================================================== Handle Follow start =====================================================

  const handleFollow = async () => {
    if (profileData === 'following') {
      const body = {
        following_id: data?._id,
      };
      dispatch(userFollowing(body, setProfileData, setLoadingFollow));
      data.follower_count = data.follower_count > 0 && data.follower_count - 1;
    } else {
      const body = {
        following_id: data?._id,
      };
      dispatch(userFollow(body, setProfileData, false, setLoadingFollow));
      data.follower_count = data.follower_count + 1;
    }
    dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
  };
  // ================================================== Handle Follow end =====================================================

  const onRefresh = () => {
    setCaption(true);
    setIsLoading(true);
    dispatch(fetchSearchMinisAndUsers(1, []));

    setIsLoading(false);
  };
  // ================================================ Users Search Start ========================================================
  const UsersSearch = () => (
    <View style={{flex: 1, justifyContent: 'center', marginTop: 15}}>
      {users.length > 0 ? (
        <FlatList data={users} renderItem={renderProfile} />
      ) : (
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Search not Found
        </Text>
      )}
    </View>
  );

  // ================================================ Users Search End ========================================================
  // ================================================ Users Search RenderProfile Start========================================================

  const renderProfile = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          width: '90%',
          height: 45,
          marginHorizontal: 15,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: checkImageUrl(
                item.profile_image,
                `https://ui-avatars.com/api/?background=random&name=${item?.first_name}+${item?.last_name}`,
              ),
            }}
            style={{
              borderColor: 'grey',
              borderRadius: 40,
              borderWidth: 1,
              width: 40,
              height: 40,
            }}
            resizeMode="cover"
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: theme.text, fontWeight: 'bold'}}>
              {item?.first_name
                ? item?.first_name + ' ' + item?.last_name
                : item?.user_name}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 70,
              height: 35,
              padding: 0,
              borderRadius: 10,
              elevation: 0,
              backgroundColor: '#5E72E4',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleFollow()}>
            {loadingFollow ? (
              <ActivityIndicator color={'white'} size={15} />
            ) : (
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {dataProfile?.following?.includes(item?._id) ? 'Follow' : 'Unfollow'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // ================================================ Users Search RenderProfile End ========================================================

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
      }}>
      <StatusBar barStyle={theme.statusbar} />
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Header Start +++++++++++++++++++++++++++++++++++++++++++ */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingBottom: 12,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 15,
            width: '20%',
          }}>
          <LeftArrow width={18} height={18} color={theme.text} />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            color: theme.text,
          }}>
          Search
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            boxShadow: 'none',
            width: '20%',
          }}></TouchableOpacity>
      </View>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Header End +++++++++++++++++++++++++++++++++++++++++++ */}
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Search Input Start +++++++++++++++++++++++++++++++++++++++++++ */}

      <View style={[styles.componentView, {backgroundColor: theme.primary}]}>
        <View style={[styles.searchView, {backgroundColor: '#222222'}]}>
          <TextInput
            style={{width: '80%', height: '100%', color: theme.text}}
            placeholderTextColor={'grey'}
            returnKeyType={'search'}
            value={caption}
            onSubmitEditing={searchHandle}
            onChangeText={e => {
              setCaption(e);
            }}
            placeholder={'Enter text to search'}
          />

          <TouchableOpacity
            disabled={caption === '' ? true : false}
            onPress={searchHandle}>
            <MinisSearch color={theme.text} width={24} height={24} />
          </TouchableOpacity>
        </View>
        {isFocus ? (
          <FlatList
            data={users}
            renderItem={UsersSearch}
            refreshControl={
              <RefreshControl
                tintColor={'black'}
                refreshing={isLoading1}
                onRefresh={onRefresh}
              />
            }
          />
        ) : (
          ''
        )}
      </View>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Search Input End +++++++++++++++++++++++++++++++++++++++++++ */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // footerView: {position: 'absolute', zIndex: 10, bottom: 10, left: 10},
  itemContainer: {},
  itemImage: {
    width: '100%',
    height: '100%',
  },
  componentView: {flex: 1},

  searchView: {
    height: 40,
    width: '95%',
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight - 45,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
export default SearchMini;
