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
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import {
  fetchPreviewMinis,
  fetchSearchMinisAndUsers,
  userFollow,
  userFollowing,
  userUnFollow,
} from '../Store/Actions/minis';
import Text from '../Components/Text';
import MinisSearch from '../Assets/MinisSearch';
import {checkImageUrl} from '../Utils/helpers';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import {
  fetchOtherUserFollowersAndFollowing,
  fetchUserFollowersAndFollowing,
} from '../Store/Actions/profile';

const SearchMini = ({route}) => {
  const navigation = useNavigation();
  const dataProfile = useSelector(e => e.profile?.profile);

  const data = dataProfile;
  // console.log('check data===================================', data);
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
  const [is_followed, setis_followed] = useState(false);
  const [loadingFollowState, setLoadingFollowState] = useState({});
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(false);
  const theme = useSelector(e => e.theme);
  const {users} = useSelector(({previewMinis}) => previewMinis);
  // console.log(
  //   'setProfileData00000000000000000000000000000000000000000000',
  //   users?.is_followed,
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    setProfileData(
      route?.params?.item?.item?.is_followed ? 'following' : 'Follow',
    );
    dispatch(fetchUserFollowersAndFollowing());
    dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
  }, [data?._id]);

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
  const unFollowMe = id => {
    const body = {
      following_id: id,
    };
    console.log('followMe check---------------------------------');

    data.follower_count = data.follower_count > 0 && data.follower_count - 1;
    dispatch(userFollowing(body, setProfileData, setLoadingFollow));
  };

  const followMe = id => {
    const body = {
      following_id: id,
    };
    console.log('followMe check---------------------------------');
    // console.log('followMe check---------------------------------');

    data.follower_count = data.follower_count > 0 && data.follower_count + 1;
    dispatch(
      userFollow(body, setProfileData, setLoadingFollow, setis_followed),
    );
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

  // console.log("🚀 ~ renderProfile ~ users:", users)

  const [localLoading, setLocalLoading] = useState(false)
  const renderProfile = ({item, index}) => {
    console.log(
      '🚀 ~ renderProfile ~ item._id === users[index]._id:',
      item._id === users[index]._id,
    );

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

        <TouchableOpacity
          style={{
            width: 65,
            height: 30,
            padding: 0,
            borderRadius: 5,
            elevation: 0,
            backgroundColor: '#5E72E4',
            alignItems: 'center',
            justifyContent: 'center',

            // display: item?.is_followed || is_followed ? 'flex' : 'flex',
          }}
          onPress={async () => {
            // setLoadingFollow(true);
            localLoading(true)
            item?.is_followed || is_followed
              ? unFollowMe(item?._id)
              : followMe(item?._id);
            // setLoadingFollow(false)
            localLoading(false)
          }}>
          {localLoading ? (
            <ActivityIndicator color={'white'} size={15} />
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              {profileData === 'following'
                ? 'Following'
                : item?.is_followed
                ? 'Unfollow'
                : 'Follow'}
            </Text>
          )}
        </TouchableOpacity>
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
        {isFocus
          ? // <FlatList
            //   data={users}
            //   renderItem={UsersSearch}
            //   keyExtractor={item => item.id}
            //   refreshControl={
            //     <RefreshControl
            //       tintColor={'black'}
            //       refreshing={isLoading1}
            //       onRefresh={onRefresh}
            //     />
            //   }
            // />
            UsersSearch()
          : ''}
      </View>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Search Input End +++++++++++++++++++++++++++++++++++++++++++ */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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