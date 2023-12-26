import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput as Input,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import Text from "../Components/Text";
import TextInput from "../Components/TextInput";
import GoogleBTN from "../Components/GoogleBTN";
import { Email, Password } from "../Assets/Svgs";
import AppleConnect from "../Components/AppleConnect";
import TouchableOpacity from "../Components/TouchableOpacity";
import { SignInApi, SignInGuest } from "../Store/Actions/auth";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { LightMode } from "../Store/Actions/theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const HandleLoginBTN = async () => {
    setLoading(true);
    const body = {
      email: email,
      password: pass,
    };
    dispatch(SignInApi(body, navigation, setLoading));
  };

  const signInGuestHandle = () => {
    setGuestLoading(true);

    dispatch(SignInGuest(navigation, setGuestLoading));
  };

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 15,
        backgroundColor: "black",
        paddingTop: Platform.OS == "ios" ? StatusBar.currentHeight + 60 : 0,
      }}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <View
        style={
          {
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
            }}
            noBg
            style={{
              alignItems: "flex-end",
              backgroundColor: "#303D5B",
              height: 45,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 45,
          }}
        >
          {/* <View style={{ flex: 1 }} /> */}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../Assets/MAINLOGO.png")}
              style={{
                width: Dimensions.get("window").width - 150,
                height: 150,
                // marginTop: 20,
              }}
              resizeMode='cover'
            />
            <View
              style={{
                backgroundColor: "#383E50",
                width: 3,
                marginHorizontal: 15,
                height: 65,
                alignItems: "center",
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "800",
                  fontSize: 18,
                }}
              >
                Sign
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: 22,
                }}
              >
                In
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: "15%" }}>
        <TextInput
          // icon={<Email />}
          value={email}
          placeholder='Email'
          inputMode='email'
          keyboardType='email-address'
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
      </View>
      <View
        style={[
          styles.textInputView,
          { backgroundColor: "#181F34", width: "100%" },
        ]}
      >
        {/* <Password /> */}
        <Input
          placeholderTextColor='#B7B7B7'
          placeholder='Password'
          secureTextEntry
          onChangeText={(e) => {
            setPass(e);
          }}
          style={styles.textInput}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          // marginVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          noBg
          onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.FORGET);
          }}
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          noBg
          onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.HELP);
          }}
        >
          <Text style={{ color: "#5E72E4", fontWeight: "800" }}>
            Need help signing in?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => HandleLoginBTN()}>
        {loading ? (
          <ActivityIndicator color='black' animating={true} />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",

          // width: Dimensions.get("screen").width - 35,
          // backgroundColor: "red",
          overflow: "hidden",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            OR Sign In
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "900",
              fontSize: 22,
            }}
          >
            With
          </Text>
        </View>
        <GoogleBTN />
        <AppleConnect />
        <View
          style={{
            backgroundColor: "#383E50",
            width: 3,
            marginLeft: 15,
            height: 65,
          }}
        />
        <TouchableOpacity
          style={{
            height: 48,
            width: 75,
            backgroundColor: "#303D5B",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginLeft: 15,
          }}
          // onPress={}
          onPress={signInGuestHandle}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Guest
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Mode
          </Text>
        </TouchableOpacity>
      </View>
      {/* <AppleConnect />

      <GoogleBTN />

      <TouchableOpacity
        noBg
        style={{
          marginTop: 15,
        }}
        onPress={signInGuestHandle}
      >
        {guestLoading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Continue as Guest
          </Text>
        )}
      </TouchableOpacity> */}
    </KeyboardAwareScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 9,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    color: "white",
  },
});
