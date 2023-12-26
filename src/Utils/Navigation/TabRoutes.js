import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity as ITouchableOpacity,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Text from "../../Components/Text";
import AddIcon from "../Assets/Icons/AddIcon";
import { NAVIGATION_ROUTES } from "./NavigationRoutes";
import { removeData } from "../../Store/Actions/minis";

import SvgMessage, {
  NotificationSvg,
  ProfuserSvg,
  WidgetSvg,
} from "../../Assets/Svgs";
import GuestHandleComp from "../../Components/GuestHandleComp";
// import CreateOptionsScreen from "../../Screens/DeepAR/screens/CreateOptionsScreen";
import MinisSearch from "../../Assets/MinisSearch";
import FunPartyQuickStart from "../../Screens/Jitsi/FunPartyQuickStart";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("screen");

function TabRoutes() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector((e) => e.theme);
  const user = useSelector((e) => e.profile?.profile);

  const [modalVisible, setModalVisible] = useState(false);
  const { guestUser } = useSelector((state) => state.guestUser?.guestUser);

  const logoutHeaderLeft = () => {
    return (
      <View
        style={{
          width: width,
          flexDirection: "row",
          paddingHorizontal: 12,
          alignItems: "center",
          justifyContent: "space-between",
          // marginTop: 15,
        }}
      >
        <ITouchableOpacity
          onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.SEARCH);
          }}
          style={{ marginTop: -3 }}
        >
          {/* <Ionicons name={"search-outline"} size={32} color={theme.text} /> */}
          <MinisSearch color={"#fff"} width={28} height={28} />
        </ITouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            // paddingLeft: 12,

            fontWeight: "bold",
            display: user?.first_name || user?.last_name ? "flex" : "none",
          }}
        >
          {user?.first_name + " " + user?.last_name}
        </Text>

        <ITouchableOpacity
          style={
            {
              // marginTop: 12,
              // marginRight: -12,
            }
          }
          onPress={() => navigation.navigate(NAVIGATION_ROUTES.NOTIFICATON)}
        >
          <NotificationSvg stroke={theme.text} height={30} width={30} />
        </ITouchableOpacity>
      </View>
    );
  };

  const backToLogin = () => {
    setModalVisible(!modalVisible);
    dispatch(removeData(navigation, "login"));
  };

  const backToSignup = () => {
    setModalVisible(!modalVisible);
    dispatch(removeData(navigation, "signup"));
  };

  const guestHandle = () => {
    // setModalVisible(!modalVisible);
    // navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
    dispatch(removeData(navigation));
  };

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <ITouchableOpacity
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ height: 67 }}
            >
              <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                {label}
              </Text>
            </ITouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <>
      <GuestHandleComp
        backToLogin={backToLogin}
        backToSignup={backToSignup}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        guestHandle={guestHandle}
      />

      <Tab.Navigator
        //tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName={NAVIGATION_ROUTES.HOME}
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleStyle: { color: theme.text },
          // unmountOnBlur: true,
          // freezeOnBlur: true,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: Platform.OS === "ios" ? 67 : 55,
            padding: 10,
            borderTopWidth: 0.7,
            backgroundColor: "black",
            borderTopColor: "#191c24",
          },
        }}
      >
        {/* <Tab.Screen
          name={NAVIGATION_ROUTES.HOME}
          component={MinisVideosContainer}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Home color={focused && "#5E72E4"} />;
            },
          }}
        /> */}

        {/* <Tab.Screen
          name={NAVIGATION_ROUTES.MENU}
          component={MenuTab}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (guestUser) {
                e.preventDefault();
                guestHandle();
              } else {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={
                    {
                    }
                  }
                >
                  <WidgetSvg
                    color={focused ? "#5E72E4" : "white"}
                    height={26}
                    width={26}
                  />
                </View>
              );
            },
          }}
        /> */}
        {/* <Tab.Screen
          name={NAVIGATION_ROUTES.CAMERA}
          component={CameraScreen}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (guestUser) {
                e.preventDefault();
                guestHandle();
              } else {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
              return <AddIcon color={focused ? '#5E72E4' : '#FFF'} />;
            },
          }}
        /> */}

        <Tab.Screen
          name={NAVIGATION_ROUTES.FUN_PARTY_QUICK_START}
          component={FunPartyQuickStart}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     if (guestUser) {
          //       e.preventDefault();
          //       guestHandle();
          //     } else {
          //       navigation.navigate(route.name);
          //     }
          //   },
          // })}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <AddIcon
                    color={focused ? "#5E72E4" : "#FFF"}
                    width={28}
                    height={28}
                  />

                  {/* <Entypo
                    name='squared-plus'
                    size={35}
                    style={{ marginTop: -4 }}
                    color={focused ? "#5E72E4" : "#FFF"}
                  /> */}
                </>
              );
            },
          }}
        />

        {/* <Tab.Screen
          name={NAVIGATION_ROUTES.CHAT_FRIEND_LIST}
          component={ChatFriends}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (guestUser) {
                e.preventDefault();
                guestHandle();
              } else {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
              const count = useSelector((state) => state?.chatFriends?.count);
              return (
                <View>
                  <SvgMessage
                    color={focused ? "#5E72E4" : "white"}
                    height={26}
                    width={26}
                  />

                  <View
                    style={{
                      // height: 25,
                      // width: 35,
                      display: count > 0 ? "flex" : "none",
                      position: "absolute",
                      backgroundColor: "red",
                      paddingVertical: 2,
                      paddingHorizontal: 5,
                      top: -5,
                      // right: 65,

                      borderRadius: 25,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {count > 99 ? "99+" : count}
                    </Text>
                  </View>
                </View>
              );
            },
            headerShown: false,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: theme.text,
            headerBackTitleStyle: { color: theme.text },
            headerTitleStyle: { color: theme.text },
            headerStyle: {
              backgroundColor: theme.background,
            },
          }}
        /> */}

        {/* <Tab.Screen
          name={NAVIGATION_ROUTES.PROFILE}
          component={Profile}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (guestUser) {
                e.preventDefault(); // Prevents the tab from switching
                guestHandle();
              } else {
                navigation.navigate(route.name);
              }
            },
          })}
          options={{
            unmountOnBlur: true,
            title: "",
            //headerRight: logoutHeaderRight,
            headerLeft: logoutHeaderLeft,
            headerShown: true,
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: "transparent",
              elevation: 0,
              backgroundColor: theme.primary,
            },
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {user?.profile_image ? (
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: checkImageUrl(
                            user?.profile_image,
                            `https://ui-avatars.com/api/?background=random&name=${user?.first_name}+${user?.last_name}`,
                          ),
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 20,
                        }}
                      />
                    </View>
                  ) : (
                    // <Ionicons
                    //   name={focused ? "person" : "person-outline"}
                    //   size={28}
                    //   color={focused ? "#5E72E4" : "white"}
                    // />
                    <ProfuserSvg
                      size={24}
                      color={focused ? "#5E72E4" : "white"}
                    />
                  )}
                </>
              );
            },
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  salesPrice: {
    fontSize: 15,
    marginLeft: 0,
    color: "white",
    textAlign: "right",
  },
  supSalePrice: {
    fontSize: 10,
    color: "white",
    paddingTop: "-3%",
    paddingLeft: "0%",
  },
  cartStyle: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#00ab15",
    borderRadius: 10,
    flexDirection: "row",
    padding: 1,
    zIndex: 9,
    paddingRight: 3,
    paddingLeft: 3,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    width: "80%",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonGroup1: {
    flexDirection: "row",
  },
  button: {
    padding: 5,
    height: 37,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
});

export default TabRoutes;
