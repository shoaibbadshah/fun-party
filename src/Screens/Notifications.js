import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity as ITouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {
  fetchNotificationsList,
  applyNotificationsFilter,
  fetchPaginatedNotificationsList,
} from '../Store/Actions/notifications';
import MinisLike from '../Assets/MinisLike';
import ThreeDots from '../Assets/ThreeDots';
import MinisMessage from '../Assets/MinisMessage';
import Notification from '../Components/Notification';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import {NOTIFICATIONS} from '../Utils/notificationsTypes';
import RBSheet from 'react-native-raw-bottom-sheet';

import SvgMessage, {
  FollowingNotiSvg,
  NotifiFilter,
  WatchPartySvg,
} from '../Assets/Svgs';

const NotificationScreen = ({navigation}) => {
  const refRBSheet = useRef();
  const theme = useSelector(e => e.theme);
  const {notifications, totalPages, page, filteredNotifications, isLoading} =
    useSelector(({notifications}) => notifications);
  const [notificationsList, setNotificationsList] = useState([]);
  const [isLoading1, setIsLoading] = useState(false);

  console.log(
    '🚀 ~ NotificationScreen ~ filteredNotifications:',
    filteredNotifications[0],
  );
  const [selectedFilter, setSelectedFilter] = useState({
    value: 'Fun party',
  });

  const dispatch = useDispatch();
  const {height} = useWindowDimensions();

  const keyExtractor = useCallback(item => `notification-${item._id}`, []);
  const renderItem = useCallback(
    ({item}) => <Notification item={item} />,
    [filteredNotifications],
  );

  const filters = [
    // {name: 'All', value: 'all', icon: 'filter'},
    // {
    //   name: 'Comments',
    //   value: NOTIFICATIONS.MINI_COMMENT.type,
    //   icon: 'chatbox-outline',
    // },
    // {
    //   name: 'Liked',
    //   value: NOTIFICATIONS.MINI_LIKE.type,
    //   icon: 'heart-outline',
    // },
    // {
    //   name: 'Follow',
    //   value: NOTIFICATIONS.FOLLOW.type,
    //   icon: 'bandage-outline',
    // },
    {
      name: 'Fun party',
      value: NOTIFICATIONS.Watch_Party_Invitation.type,
      icon: 'tv-outline',
    },
  ];

  useEffect(() => {
    dispatch(fetchNotificationsList(1, []));
    // setNotificationsList(filteredNotifications);
    //   dispatch(applyNotificationsFilter(filters[0].value));
  }, []);

  // useEffect(() => {
  //   if (selectedFilter.value !== 'all') {
  //     setNotificationsList(filteredNotifications);
  //   } else {
  //       setNotificationsList(notifications);
  //     }
  //     // else if (activeRoute === "recent") {
  //     //     setNotificationsList(notifications);
  //     //   } else if (activeRoute === "read") {
  //     //     setNotificationsList(read);
  //     //   } else if (activeRoute === "unread") {
  //     //     setNotificationsList(unread);
  //     //   }
  // }, [filteredNotifications, notifications]);
  // }, [filteredNotifications, notifications]);

  const openSheet = () => {
    refRBSheet.current.open();
  };
  const onEndReachedHandle = () => {
    if (totalPages >= page) {
      dispatch(
        fetchPaginatedNotificationsList(
          page + 1,
          notifications,
          selectedFilter.value,
        ),
      );
    }
  };

  const onRefresh = () => {
    setSelectedFilter({value: 'all'});
    setIsLoading(true);
    dispatch(fetchNotificationsList(1, []));
    // setNotificationsList(filteredNotifications);
    // dispatch(applyNotificationsFilter(filters[0].value));
    setIsLoading(false);
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
        <ITouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 15,
            width: '20%',
          }}>
          <LeftArrow width={18} height={18} color={theme.text} />
        </ITouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
          }}>
          Notifications
        </Text>

        <ITouchableOpacity
          // onPress={openSheet}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            boxShadow: 'none',
            width: '20%',
          }}>
          {/* <ThreeDots width={18} height={18} color={theme.text} /> */}
        </ITouchableOpacity>
      </View>

      {isLoading ? (
        <View
          style={{
            backgroundColor: theme.primary,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={theme.text} size={'large'} />
        </View>
      ) : filteredNotifications.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: height / 1.5,
          }}>
          <Text
            style={{
              color: theme.text,
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Notifications not found
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredNotifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            marginHorizontal: 12,
          }}
          refreshControl={
            <RefreshControl
              tintColor={'black'}
              refreshing={isLoading1}
              onRefresh={onRefresh}
            />
          }
          onEndReached={onEndReachedHandle}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
        />
      )}

      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('screen').height / 2.3}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: 'grey',
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.primary,
          },
        }}>
        <>
          {filters.map(filter => (
            <Pressable
              onPress={() => {
                setSelectedFilter(filter);
                dispatch(applyNotificationsFilter(filter.value));
                // setFilterVisible(false);
                // debugger;
                refRBSheet.current.close();
              }}
              key={filter.name}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                //marginTop: 15,
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              {filter.name === 'Follow' ? (
                <FollowingNotiSvg size={22} color={'white'} />
              ) : filter.name === 'All' ? (
                <NotifiFilter size={20} color={'white'} />
              ) : filter.name === 'Fun party' ? (
                <WatchPartySvg height={20} width={20} />
              ) : filter.name === 'Liked' ? (
                <MinisLike height={20} width={20} color="white" />
              ) : filter.name === 'Comments' ? (
                <MinisMessage height={20} width={20} color={'white'} />
              ) : (
                <IonIcons
                  name={filter.icon}
                  color={theme.textColor}
                  size={22}
                />
              )}
              <Text
                style={{
                  paddingLeft: 15,
                  color: theme.textColor,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                {filter.name}
              </Text>
            </Pressable>
          ))}
        </>
      </RBSheet> */}
    </SafeAreaView>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  notificationHeaderImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
