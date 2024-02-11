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
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  fetchPreviewMinis,
  fetchSearchMinisAndUsers,
} from '../Store/Actions/minis';
import Text from '../Components/Text';
import MinisSearch from '../Assets/MinisSearch';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {checkImageUrl} from '../Utils/helpers';
import {API} from '../Api';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';

const SearchMini = ({route}) => {
  const navigation = useNavigation();

  // const {users} = useSelector(({previewMinis}) => previewMinis);

  const [caption, setCaption] = useState(
    route?.params && route?.params?.hashTag
      ? `${route?.params?.hashTag}`
      : route?.params && route?.params?.location
      ? `${route?.params?.location}`
      : '',
  );
  const [isFocus, setIsFocus] = useState(false);
  const [page, setPage] = useState(1);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPreviewMinis(page));
  }, [page]);

  const searchHandle = async () => {
    setIsFocus(true);
    dispatch(fetchSearchMinisAndUsers(caption));
  };

  const _handleIndexChange = index => setIndex(index);

  useEffect(() => {
    if (route.params) {
      searchHandle();
    }
  }, [route.params]);

  const UsersTab = () => (
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

  const renderScene = SceneMap({
    users: UsersTab,
  });
  // const [routes] = React.useState([{key: 'users', title: 'Users'}]);

  const theme = useSelector(e => e.theme);

  const renderProfile = ({item}) => {
    return (
      <Pressable
        onPress={async () => {
          const otherUser = await API.v1.Profile.fetchOtherProfile(item?._id);

          navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
            item: {item: otherUser?.data?.data, screenName: 'OtherProfile'},
          });
        }}
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          alignSelf: 'center',
          width: '90%',
          height: 45,
          justifyContent: 'space-between',
          marginHorizontal: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
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
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <View>
              <Text style={{color: theme.text, fontWeight: 'bold'}}>
                {item?.first_name
                  ? item?.first_name + ' ' + item?.last_name
                  : item?.user_name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
      }}>
      <StatusBar barStyle={theme.statusbar} />

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
          // onPress={openSheet}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            boxShadow: 'none',
            width: '20%',
          }}>
          {/* <ThreeDots width={18} height={18} color={theme.text} /> */}
        </TouchableOpacity>
      </View>

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
          <TabView
            style={{flex: 1, height: 50, width: '100%'}}
            navigationState={{index, routes}}
            renderScene={renderScene}
            indicatorStyle={{backgroundColor: 'white'}}
            // renderTabBar={_renderTabBar}
            onIndexChange={_handleIndexChange}
            animationEnabled
            tabBarPosition="top"
            initialLayout={{width: layout.width - 25}}
          />
        ) : (
          ''
        )}
      </View>
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
