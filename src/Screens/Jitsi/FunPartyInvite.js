import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  FlatList,
  Platform,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {fetchUserFollowersAndFollowing} from '../../Store/Actions/profile';
import {
  fetch_suggestions_list,
  inviteToFunParty,
} from '../../Store/Actions/minis';
import {
  checkImageUrl,
  generateRandomMeetId,
  generateLink,
} from '../../Utils/helpers';
import {interstitial} from '../../../App';
import {HamburgerSVG} from '../../Assets/Svgs';
import Menu from '../../Components/Profile/Menu';
import MinisSearch from '../../Assets/MinisSearch';
import UserListItem from '../../Components/UserListItem';
import {AdEventType} from 'react-native-google-mobile-ads';
import LeftArrow from '../../Utils/Assets/Icons/LeftArrow';
import WatchPartyGuide from '../../Components/WatchPartyGuide';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const {width} = Dimensions.get('screen');

const FunPartyInvite = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(route.params?.index);
  const refRBSheetFarward = useRef(null);
  const [checked, setChecked] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [guidCheck, setGuidCheck] = useState(true);
  const [isloading, setisloading] = useState(true);
  const [routes] = useState([
    {key: 'Friends', title: 'Friends'},
    {key: 'Suggestions', title: 'Suggestions'},
  ]);
  const userFollowing = useSelector(
    e => e.userFollowerFollowing?.userFollowing,
  );

  const theme = useSelector(e => e.theme);
  const Suggestions_Users = useSelector(
    e => e.friendSuggestionsReducer?.suggested_List,
  );
  const partyStart = async () => {
    const randomMeetId = generateRandomMeetId();

    const generate = await generateLink(randomMeetId);

    const body = {
      users: checked,
      room: generate,
      web_link: `https://shareslate.fun/funparty?meet=${randomMeetId}`,
      room_code: randomMeetId,
    };

    dispatch(inviteToFunParty(body));
    setGuidCheck(!guidCheck);
    interstitial.loaded ? interstitial.show() : interstitial.load();
    navigation.navigate(NAVIGATION_ROUTES.JITSI, {roomId: randomMeetId});
    setChecked([]);
  };
  const handleMenu = () => {
    refRBSheetFarward.current.handleMenu();
  };

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    interstitial.load();
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(fetchUserFollowersAndFollowing(setisloading));
    dispatch(fetch_suggestions_list(setisloading));
    // setFriend(allUser);
  }, []);

  const FriendsList = () => {
    const [search, setSearch] = useState('');

    const filterSearch = search
      ? userFollowing?.filter(x =>
          x.first_name.toLowerCase().includes(search.toLowerCase()),
        )
      : userFollowing;

    const onSubmitEditing = e => {
      console.log('🚀 ~ onSubmitEditing ~ e:', e);

      setSearch(e);
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

    const handleInvitePress = async () => {
      setSearch('');
      if (guidCheck) {
        setGuidCheck(!guidCheck);
      }
    };

    return (
      <View style={[styles.scene, {backgroundColor: '#000000'}]}>
        <View style={{position: 'relative'}}>
          <View
            style={{
              backgroundColor: '#1B2438',
              height: 40,
              width: '100%',
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
              onChangeText={text => onSubmitEditing(text)}
              style={{
                width: '82%',
                color: 'white',
                textAlign: 'left',
                marginLeft: 4,
              }}
              placeholderTextColor={'#B3B3B3'}
              returnKeyType={'search'}
              value={search}
              placeholder={'Search friends'}
            />
          </View>
        </View>
        {userFollowing.length > 0 && filterSearch.length > 0 ? (
          <FlatList
            data={filterSearch}
            contentContainerStyle={{
              paddingBottom: 245,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                tintColor={'black'}
                onRefresh={onRefresh}
                refreshing={isloading}
              />
            }
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
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isloading ? (
              <ActivityIndicator color={theme.text} size={'large'} />
            ) : !filterSearch.length <= 0 ? (
              <Text
                style={{
                  color: theme.text,
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 15,
                }}>
                Looks like you don't have any friends yet! Invite your friends
                for a fun party!
              </Text>
            ) : (
              <Text
                style={{
                  color: theme.text,
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 15,
                }}>
                No User Found
              </Text>
            )}
          </View>
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
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16, padding: 10}}>
            {guidCheck ? 'Invite' : 'Start FunParty'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return <UserListItem item={item} />;
  };
  const onRefresh = () => {
    dispatch(fetch_suggestions_list(setisloading));
  };

  const Suggestions = () => (
    <View style={[styles.scene, {backgroundColor: '#000000', marginTop: 8}]}>
      {Suggestions_Users.length > 0 ? (
        <FlatList
          data={Suggestions_Users}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={'black'}
              refreshing={isloading}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isloading ? (
            <ActivityIndicator color={theme.text} size={'large'} />
          ) : (
            <>
              <Text
                style={{
                  color: theme.text,
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 15,
                }}>
                Refresh page for friend suggestions
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );

  const renderScene = SceneMap({
    Friends: FriendsList,
    Suggestions: Suggestions,
  });

  const handleTabIndex = index => {
    setIndex(index);
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#5E72E4'}}
      style={{
        backgroundColor: '#1B2438',
        color: '#5E72E4',
        borderRadius: 8,
        height: '7%',
      }}
      inactiveColor="white"
      activeColor="#5E72E4"
      renderLabel={({route, color}) => (
        <Text style={{marginBottom: 7, color}}>{route.title}</Text>
      )}
    />
  );
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme?.primary,
          // paddingTop: Platform.OS == 'ios' ? 12 : 0,
          paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow width={18} height={18} color={theme.text} />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              FunParty Invite
            </Text>

            <TouchableOpacity onPress={handleMenu}>
              <HamburgerSVG />
            </TouchableOpacity>
          </View>

          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={handleTabIndex}
            renderTabBar={renderTabBar}
          />
        </View>
      ) : (
        <WatchPartyGuide
          guidCheck={guidCheck}
          setGuidCheck={setGuidCheck}
          handleInvitePress={partyStart}
        />
      )}

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
    marginBottom: 10,
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
  scene: {
    flex: 1,
  },
});
