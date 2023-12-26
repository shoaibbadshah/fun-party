import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Linking,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch } from "react-redux";

import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { setOnBaorded } from "../Store/Actions/user";

const OnBoard = () => {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setOnBaorded());
  };
  const handleSignUp = () => {
    handlePress();
    navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#293145",
        paddingTop:
          Platform.OS == "ios"
            ? StatusBar.currentHeight + 50
            : StatusBar.currentHeight - 15,
      }}
    >
      <StatusBar barStyle={"light-content"} />

      <View
        style={{
          height: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          display: "none",
        }}
      >
        <TouchableOpacity
          style={{ display: check ? "flex" : "none" }}
          onPress={() => handleSignUp()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>SIGNUP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ display: check ? "flex" : "none" }}
          onPress={() => {
            handlePress();
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <Image
          source={require("../Assets/MAINLOGO.png")}
          style={{
            width: "100%",
            height: "80%",
          }}
          resizeMode='contain'
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          paddingBottom: "10%",
        }}
      >
        <View
          style={{
            marginVertical: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            By continuing, you agree to Share Slate’s {""}
          </Text>
          <TouchableOpacity
            style={{ paddingHorizontal: 0 }}
            noBg
            onPress={() => {
              Linking.openURL("https://www.shareslate.fun/terms");
            }}
          >
            <Text style={{ color: "#5E72E4" }}>Terms & Conditions </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: "100%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            padding: 7,
            marginBottom: -15,
            borderRadius: 4,
            backgroundColor: "#5E72E4",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoard;
