import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { store } from "../Store/store";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import IonIcons from "react-native-vector-icons/Ionicons";
import { API } from "../Api";
import { createRoomAction } from "../Store/Actions/chat";
import { checkImageUrl } from "../Utils/helpers";
// import MinisSearch from '../Assets/MinisSearch';
// import { userFollow } from '../Store/Actions/minis';
// import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
// import FilterIcon from '../Utils/Assets/Icons/FilterIcon';
// import { NAVIGATION_ROUTES } from '../Utils/Navigation/NavigationRoutes';

const FriendList = ({ navigation }) => {
  //ß
  const dispatch = useDispatch();
  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const keyExtractor = useCallback((item, index) => `$${index}`, []);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [firends, setFirends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await API.v1.Profile.fetchAllUsers();
      console.log(
        "🚀 ~ file: FriendList.js:36 ~ getUsers ~ resp:",
        resp.data.data.friendLists,
      );
      setFirends(resp.data.data?.friendLists.reverse());
      setAllUsers(resp.data.data?.get_users.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ file: FriendList.js:36 ~ getUsers ~ error:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  const createRoomHandler = (item) => {
    const body = {
      sender: user?.data?.checkUser?._id,
      receiver: item?._id,
    };
    dispatch(createRoomAction(body, navigation, item));
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 10,
          alignSelf: "center",
          width: "90%",
          height: 45,
          justifyContent: "space-between",
          marginHorizontal: 15,
          alignItems: "center",
        }}
        onPress={() => {
          createRoomHandler(item);
        }}
        //   item?._id === user.data?.checkUser?._id
        //     ? navigation.navigate(NAVIGATION_ROUTES.PROFILE)
        //     : navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
        //         item: { item: item, screenName: 'OtherProfile' },
        //       });
        // }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: checkImageUrl(
                item?.created_by?.profile_image,
                `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
              ),
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
            // defaultSource={require('../Assets/avatar.jpg')}
            resizeMode='cover'
          />
          <View style={{ marginLeft: 10, justifyContent: "center" }}>
            <Text style={{ color: theme.text1, fontWeight: "bold" }}>
              {item?.first_name ? item?.first_name : item?.user_name}{" "}
              {item?.last_name}
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              createRoomHandler(item);
            }}
            // style={{
            //   width: 50,
            //   height: 50,
            //   backgroundColor: 'red',
            //   borderRadius: 25,
            // }}

            // onPress={clickHandler}
          >
            <IonIcons name='chatbubble' size={30} color={"#5E72E4"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop:
          Platform.OS == "ios"
            ? StatusBar.currentHeight
            : StatusBar.currentHeight,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={"black"}
        barStyle={"black" === "black" ? "light-content" : "dark-content"}
      />

      {/* <Text style={{ color: theme.text, fontSize: 20, fontWeight: '800' }}>
        Friends
      </Text> */}
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color={"white"} size={"large"} />
      ) : (
        <FlatList
          data={firends}
          style={{ marginHorizontal: 25 }}
          contentContainerStyle={{
            marginTop: 20,
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
              }}
            >
              <Text style={{ color: theme.text }}>
                You have no followers add followers to chat.
              </Text>
            </View>
          }
          keyExtractor={keyExtractor}
        />
      )}

      {/* <Text>All Users</Text>

      <FlatList
        data={allUsers}
        style={{ marginHorizontal: 25 }}
        contentContainerStyle={{
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  notificationHeaderImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FriendList;
