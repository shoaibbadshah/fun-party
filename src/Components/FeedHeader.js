import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { store } from "../Store/store";
import MinisSearch from "../Assets/MinisSearch";
import GuestHandleComp from "./GuestHandleComp";
import { NotificationSvg } from "../Assets/Svgs";
import { removeData } from "../Store/Actions/minis";

const FeedHeader = ({
  subscribe,
  item,
  index,
  setActiveTab,
  activeTab,
  onRefresh,
  onPressNotification,
  onPressSearch,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = store.getState().user;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector((e) => e.theme);
  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  const backToLogin = () => {
    setModalVisible(!modalVisible);
    dispatch(removeData(navigation, "login"));
  };

  const backToSignup = () => {
    setModalVisible(!modalVisible);
    dispatch(removeData(navigation, "signup"));
  };

  const guestHandle = () => {
    dispatch(removeData(navigation));
  };
  return (
    <View style={styles.feedHeaderContainer}>
      <View style={styles.headerInnerWrapper}>
        <TouchableOpacity
          onPress={() => {
            guestUser ? guestHandle() : onPressSearch();
          }}
          style={{
            color: "transparent",
            marginRight: 15,
            shadowOpacity: 4,
            textShadowColor: "#000",
            shadowOffset: { height: 1, width: 0 },
          }}
        >
          <MinisSearch color={"#fff"} width={23} height={23} />
        </TouchableOpacity>

        <View style={styles.feedHeaderContentWrapper}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginLeft: -5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setActiveTab("trending");
                onRefresh();
              }}
            >
              <Text
                style={{
                  ...styles.headerTextStyle,
                  paddingLeft: "4%",
                  color: activeTab === "trending" ? "white" : "#FFFFF7",
                  opacity: activeTab === "trending" ? 1 : 0.6,
                  fontWeight: activeTab === "trending" ? "800" : "normal",
                }}
              >
                Trends
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                ...styles.headerTextStyle,
              }}
            >
              {" "}
              |{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                guestUser ? guestHandle() : setActiveTab("follow"), onRefresh();
              }}
            >
              <Text
                style={{
                  ...styles.headerTextStyle,
                  color: activeTab === "follow" ? "white" : "#FFFFF7",
                  opacity: activeTab === "follow" ? 1 : 0.6,
                  fontWeight: activeTab === "follow" ? "800" : "normal",
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: 45,
            shadowOpacity: 4,

            textShadowColor: "#000",
            shadowOffset: { height: 1, width: 0 },
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: 100,
              position: "relative",
              // backgroundColor: "green",
            }}
            onPress={() => (guestUser ? guestHandle() : onPressNotification())}
          >
            <NotificationSvg stroke={"#fff"} height={75} width={75} />
          </TouchableOpacity>
        </View>
      </View>

      <GuestHandleComp
        backToLogin={backToLogin}
        backToSignup={backToSignup}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        guestHandle={guestHandle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  feedHeaderContainer: {
    left: 0,
    zIndex: 99,
    // width: "100%",
    width: Dimensions.get("screen").width,
    position: "absolute",
    top: Platform.OS === "ios" ? "6%" : "2%",
  },
  headerInnerWrapper: {
    // alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingRight: 0,
    // marginTop: 18,
  },
  feedHeaderContentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTextStyle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "800",
    borderColor: "#D0D0D0",

    // borderWidth: 3,

    shadowOpacity: 1,
    textShadowColor: "#D0D0D0",
    shadowOffset: { height: 0.2, width: 0 },
  },
  headerTextSpanStyle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.19)",
  },
  plus: {
    position: "absolute",
    zIndex: 1,
    left: -12,
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
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    width: "80%",
    // height: '35%',
    // textAlign: 'start',
    // textAlign
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    backgroundColor: "#5E72E4",
    padding: 5,
    height: 37,
    borderRadius: 5,
    width: "42%",
    borderColor: "#5E72E4",
    borderWidth: 2,
    borderRadius: 8,
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

export default FeedHeader;
