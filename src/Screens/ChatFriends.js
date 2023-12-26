import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import moment from "moment/moment";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SwipeableFlatList from "react-native-swipeable-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  chatAllRooms,
  chatCount,
  createRoomAction,
  deleteChatFriendAction,
} from "../Store/Actions/chat";
import { height } from "../Utils";
import { store } from "../Store/store";
import { checkImageUrl } from "../Utils/helpers";
import ModalForContact from "../Components/ModalForContact";
import {
  SaveContactAction,
  fetchAllUsers,
  fetchUserFollowersAndFollowing,
} from "../Store/Actions/profile";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { SVGNewMessage } from "../Assets/MinisMessage";
import { DeleteSvg } from "../Assets/Svgs";

const ChatFriends = ({ route, navigation }) => {
  const [chatId, setChatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const chatFriends = useSelector((state) => state?.chatFriends);
  const loadingChat = useSelector((state) => state?.chatFriends?.loadingChat);
  const countChat = useSelector((state) => state?.chatFriends?.count);

  const friend = useSelector((e) => e.userFollowerFollowing?.friendList);

  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(chatAllRooms());
    dispatch(fetchAllUsers());
    dispatch(chatCount());
  }, [isFocused]);

  const handleDelete = async (id, rowMap) => {
    console.log("delte", id);
    dispatch(deleteChatFriendAction(id));
    closeAllItems();
  };

  const keyExtractor = useCallback((item, index) => `$${index}`, []);
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ",
      s: "Just now",
      ss: "%d s ",
      m: "1m ",
      mm: "%dm",
      h: "1hr ",
      hh: "%dhr ",
      d: "1d ",
      dd: "%dd ",
      M: "1M ",
      MM: "%dM ",
      y: "1y ",
      yy: "%dy ",
    },
  });
  const createRoomHandler = (item) => {
    const body = {
      sender: user?.data?.checkUser?._id,
      receiver:
        item?.receiver?._id === user?.data?.checkUser?._id
          ? item?.sender?._id
          : item?.receiver?._id,
    };
    const itemData = {
      first_name:
        item?.receiver?._id === user?.data?.checkUser?._id
          ? item?.sender?.first_name
          : item?.receiver?.first_name,
      last_name:
        item?.receiver?._id === user?.data?.checkUser?._id
          ? item?.sender?.last_name
          : item?.receiver?.last_name,
      profile_image:
        item?.receiver?._id === user?.data?.checkUser?._id
          ? item?.sender?.profile_image
          : item?.receiver?.profile_image,
    };
    dispatch(createRoomAction(body, navigation, itemData));
  };

  const closeAllItems = (rowMap) => {
    if (refRBSheet.current && refRBSheet.current.closeRow) {
      refRBSheet.current.closeRow();
    }
  };

  const renderItem = ({ item }) => {
    const truncatedMessage = item?.last_message
      ? `${item?.last_message?.substring(0, 30)}`
      : "📷";
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginVertical: "3%",
          width: "100%",
          backgroundColor: theme.primary,
        }}
        activeOpacity={1}
        onPress={() => createRoomHandler(item)}
      >
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              item?.receiver === user?.data?.checkUser?._id
                ? {
                    uri: checkImageUrl(
                      item?.sender?.profile_image,
                      `https://ui-avatars.com/api/?background=random&name=${item?.sender?.first_name}+${item?.sender?.last_name}`,
                    ),
                  }
                : {
                    uri: checkImageUrl(
                      item?.receiver?.profile_image,
                      `https://ui-avatars.com/api/?background=random&name=${item?.receiver?.first_name}+${item?.receiver?.last_name}`,
                    ),
                  }
            }
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>

        <View
          style={{
            width: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {item?.receiver?._id === user?.data?.checkUser?._id
              ? item?.sender?.first_name
              : item?.receiver?.first_name}{" "}
            {item?.receiver?._id === user?.data?.checkUser?._id
              ? item?.sender?.last_name
              : item?.receiver?.last_name}
          </Text>
          {item?.is_last_message_deleted ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons
                name={"close-circle-outline"}
                size={25}
                color={theme.seeMore}
                style={{
                  marginRight: 4,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: item?.is_deleted ? 5 : 2,
                  marginLeft: 2,
                  fontWeight: "300",
                  color: theme.seeMore,
                  textAlign: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {"This message is deleted"}
              </Text>
            </View>
          ) : (
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                paddingRight: 15,
                color: theme.textSecondry,
              }}
            >
              {truncatedMessage}
            </Text>
          )}
        </View>
        <View style={{ width: "10%" }}>
          {item?.unread_count > 0 ? (
            <View
              style={{
                // height: 25,
                // width: 35,
                // display: count > 0 ? "flex" : "none",
                // position: "absolute",
                backgroundColor: "red",
                paddingVertical: 2,
                // paddingHorizontal: 5,
                // top: -5,
                // right: 65,
                justifyContent: "center",
                alignItems: "center",

                borderRadius: 25,
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                {item?.unread_count > 99 ? "99+" : item?.unread_count}
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 13, color: "grey" }}>
              {moment(item?.updatedAt).fromNow()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = ({ index, item }) => {
    return (
      <View
        style={{
          height: "83%",
          marginTop: "3%",
          paddingLeft: 15,
          marginRight: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            top: 0,
            right: 2,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
          }}
          onPress={() => handleDelete(item?._id)}
        >
          {/* <AntDesign name='delete' size={28} color={theme.text} /> */}
          <DeleteSvg size={28} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  };
  const createRoomHandlerNew = (item) => {
    const body = {
      sender: user?.data?.checkUser?._id,
      receiver: item?._id,
    };
    dispatch(createRoomAction(body, navigation, item));
  };

  const allowHandler = () => {
    dispatch(SaveContactAction());
    setModalVisible(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop:
          Platform.OS === "ios"
            ? StatusBar.currentHeight + 60
            : StatusBar.currentHeight,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={"black"}
        barStyle={theme.statusbar}
      />
      <View
        style={{
          padding: 10,
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text></Text>
        </View>

        <Text
          style={{
            color: theme.text,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Messages
        </Text>

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 10,
          }}
          onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.FRIEND_LIST);
          }}
        >
          {/* <MaterialCommunityIcons
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.FRIEND_LIST);
            }}
            name='shape-square-plus'
            size={28}
            style={{ marginRight: 10 }}
            color={theme.text}
          /> */}
          <SVGNewMessage width={25} height={25} color={"white"} />
          {/* <Entypo name='dots-three-vertical' size={22} color={theme.text} /> */}
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: theme.text,
          marginLeft: 12,
          marginVertical: 12,
          display: friend?.length > 0 ? "flex" : "none",
        }}
      >
        Recently added
      </Text>
      <View style={{ flexDirection: "row", marginLeft: 12 }}>
        <FlatList
          data={friend}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginRight: 5,
                  marginTop: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "grey",
                    borderRadius: 100,
                  }}
                  onPress={() => {
                    createRoomHandlerNew(item);
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 100,
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: checkImageUrl(
                        item?.profile_image,
                        `https://ui-avatars.com/api/?background=random&name=${item?.first_name}+${item?.last_name}`,
                      ),
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ color: theme.text, marginHorizontal: 5 }}>
                  {item?.first_name} {item?.last_name}
                </Text>
              </View>
            );
          }}
        />
      </View>

      {/* {true ? ( */}
      {loadingChat ? (
        <ActivityIndicator color={"grey"} size={"large"} style={{ flex: 1 }} />
      ) : !loadingChat && chatFriends?.chatFriends?.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <Text style={{ color: theme.text }}>No contacts found</Text>
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 42,
              borderRadius: 5,
              backgroundColor: theme.secondary,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
            onPress={() => setModalVisible(true)}
          >
            {/* <Ionicons name='person-add-outline' size={25} color='#fff' /> */}
            <SVGNewMessage width={20} height={20} color={"white"} />
            <Text style={{ color: "white", marginLeft: 12 }}>Add contacts</Text>
          </TouchableOpacity>

          <ModalForContact
            allowHandler={allowHandler}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </View>
      ) : (
        <View style={{ marginHorizontal: "5%", marginTop: "7%" }}>
          <View style={{ height: "90%" }}>
            <SwipeableFlatList
              //data={[]}
              data={chatFriends?.chatFriends}
              ListEmptyComponent={
                <View
                  style={{
                    height: height * 0.7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: theme.text }}>No message history</Text>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 22,
                      borderRadius: 5,
                      backgroundColor: "red",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                    onPress={() => {
                      navigation.navigate(NAVIGATION_ROUTES.FRIEND_LIST);
                    }}
                  >
                    {/* <Ionicons
                      name='person-add-outline'
                      size={25}
                      color='#fff'
                    /> */}
                    <SVGNewMessage width={20} height={20} color={"white"} />
                    <Text style={{ color: "white", marginLeft: 12 }}>
                      Create new message
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              renderItem={renderItem}
              renderQuickActions={(index, item) =>
                renderHiddenItem(index, item)
              }
              maxSwipeDistance={50}
              shouldBounceOnMount={false}
              ref={refRBSheet}
              keyExtractor={keyExtractor}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatFriends;
const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#5E72E4",
    borderRadius: 25,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
  },
});
