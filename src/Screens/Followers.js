import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  SaveContactAction,
  fetchUserFollowersAndFollowing,
  fetchOtherUserFollowersAndFollowing,
} from "../Store/Actions/profile";
import { API } from "../Api";
import { store } from "../Store/store";
import { checkImageUrl } from "../Utils/helpers";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import ModalForContact from "../Components/ModalForContact";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeaderBackGen from "../Components/headerBackGen";

const Followers = ({ route, navigation }) => {
  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const Tab = createMaterialTopTabNavigator();
  const data = route?.params?.followerScreen?.followData;
  const screenName = route?.params?.followerScreen?.ScreenName;
  const profileData = route?.params?.followerScreen?.ProfileDataParam;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop:
          Platform.OS == "ios"
            ? StatusBar.currentHeight + 40
            : StatusBar.currentHeight,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={"black"}
        barStyle={"black" === "black" ? "light-content" : "dark-content"}
      />
      {/* <TouchableOpacity
        style={{
          justifyContent: "flex-start",
          paddingHorizontal: 25,
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 25,
          marginRight: 0,
          marginLeft: 12,
        }}
        onPress={() => navigation.goBack()}
      >
        <LeftArrow color={theme.text} width={14} height={14} />
      </TouchableOpacity> */}
      <HeaderBackGen
        isBack={true}
        middleText={"Circle"}
        leftAction={() => {
          navigation.goBack();
        }}
      />
      <Tab.Navigator
        initialRouteName={screenName}
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            color: theme.text,
          },
          tabBarContentContainerStyle: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
          },

          tabBarStyle: { backgroundColor: theme.primary },
        }}
      >
        <Tab.Screen
          name='Followers'
          component={followData}
          initialParams={{
            tab: "Followers",
            followData: data,
            profileData: profileData,
          }}
          options={{
            tabBarLabel: "Followers",
            tabBarLabelStyle: {
              textTransform: "none",
              color: theme.text,
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        />
        <Tab.Screen
          name='Following'
          component={followData}
          initialParams={{
            tab: "Following",
            followData: data,
            profileData: profileData,
          }}
          options={{
            tabBarLabel: "Following",
            tabBarLabelStyle: {
              textTransform: "none",
              color: theme.text,
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        />
        {profileData?._id === user.data?.checkUser?._id && (
          <Tab.Screen
            name='Contacts'
            component={followData}
            initialParams={{ tab: "Contacts", profileData: profileData }}
            options={{
              tabBarLabel: "Phone Book",
              tabBarLabelStyle: {
                textTransform: "none",
                color: theme.text,
                fontWeight: "bold",
                fontSize: 16,
              },
            }}
          />
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Followers;

const followData = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const profileData = route.params?.profileData;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const userFollowerFollowingData = useSelector(
    (state) => state.userFollowerFollowing,
  );

  const keyExtractor = useCallback((item, index) => `$${index}`, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          height: 75,
          width: "33%",
          marginBottom: 50,
          alignSelf: "center",
          justifyContent: "space-between",
        }}
        onPress={async () => {
          const otherUser =
            item?._id !== user.data?.checkUser?._id &&
            (await API.v1.Profile.fetchOtherProfile(item?._id));
          item?._id === user.data?.checkUser?._id
            ? navigation.navigate(NAVIGATION_ROUTES.PROFILE)
            : navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                item: {
                  item: otherUser?.data?.data,
                  screenName: "OtherProfile",
                },
              });
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            // source={{ uri: checkImageUrl(item?.profile_image) }}
            source={{
              uri: checkImageUrl(
                item?.profile_image,
                `https://ui-avatars.com/api/?background=random&name=${item?.first_name}+${item?.last_name}`,
              ),
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme.secondary,
            }}
            resizeMode='cover'
          />

          <Text
            numberOfLines={2}
            style={{
              color: theme.text1,
              fontWeight: "bold",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {item?.first_name} {item?.last_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (!user?.isUserAllow?.isUserAllow && route.params?.tab === "Contacts") {
      setModalVisible(true);
    }
  }, []);
  useEffect(() => {
    if (profileData?._id === user.data?.checkUser?._id) {
      dispatch(fetchUserFollowersAndFollowing(setLoading));
    } else {
      dispatch(
        fetchOtherUserFollowersAndFollowing(profileData?._id, setLoading),
      );
    }
  }, []);

  const allowHandler = () => {
    dispatch(SaveContactAction());
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
      }}
    >
      <FlatList
        numColumns={3}
        data={
          route?.params?.tab === "Followers"
            ? route?.params?.followData?.Follower
            : route?.params?.tab === "Following"
            ? route?.params?.followData?.Following
            : userFollowerFollowingData?.contacts
        }
        style={{ marginHorizontal: 25 }}
        contentContainerStyle={{
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            {loading ? (
              <ActivityIndicator animating={true} size={"large"} />
            ) : (
              <Text style={{ color: theme.text }}>
                {route?.params?.tab === "Followers"
                  ? "No user found"
                  : route?.params?.tab === "Following"
                  ? "No user found"
                  : "No contacts found"}
              </Text>
            )}
          </View>
        }
      />

      <ModalForContact
        allowHandler={allowHandler}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
};
