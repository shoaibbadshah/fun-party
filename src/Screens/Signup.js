import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  Button,
  Dimensions,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import { API } from "../Api";
import { Email, Password } from "../Assets/Svgs";
import Avatar from "../Utils/Assets/Icons/Avatar";
import TouchableOpacity from "../Components/TouchableOpacity";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { setUser } from "../Store/Actions/user";
import { appleLogin, resendOtp, SignInGuest } from "../Store/Actions/auth";
import GoogleBTN from "../Components/GoogleBTN";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import AppleConnect from "../Components/AppleConnect";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomAlert from "../Components/CustomAlert";
import { showCustomAlert2 } from "../../App";

const Signup = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [refferal, setRefferal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const theme = useSelector((e) => e.theme);
  const [clicked, setIsClicked] = useState(false);
  const [check, setCheck] = useState(true);
  const [Otpsend, setOtpsend] = useState(false);

  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const otpVerification = async (otpVerify) => {
    const body = {
      email: emailAdress,
      step: "second",
      otp: otpVerify,
    };
    try {
      const { data } = await API.v1.Auth.signup(body);
      setIsClicked(false);

      setOtpsend(!Otpsend);
      Alert.alert("Account created successfully!");
      if (data && data.status === 200) {
        dispatch(setUser(data.data));
      }
    } catch (error) {
      setIsClicked(false);
      Alert.alert("Registration Error", "error while submitting otp");
    }
  };

  const signupBtn = async () => {
    if (!firstname || !lastname || !emailAdress || !password || !phoneNumber) {
      Alert.alert(
        "Information missing",
        "Fill out the required information to continue.",
      );
      // showCustomAlert2("Missing information", "error");
    } else if (phoneNumber.length < 9) {
      Alert.alert("Error", "Enter valid phone number");
    } else {
      setIsClicked(true);
      const body = {
        step: "first",
        first_name: firstname,
        last_name: lastname,
        email: emailAdress,
        password: password,
        referral_code: refferal,
        phone_no: phoneNumber,
        // 'user_name': username,
        your_interests: ["bio", "fantasy"],
      };

      try {
        const { data } = await API.v1.Auth.signup(body);
        console.log("🚀 ~ file: Signup.js:125 ~ signupBtn ~ data:", data);
        setIsClicked(false);
        // setOtpsend(!Otpsend);
        Alert.alert(
          "Verification code sent",
          "Verification code sent to your registered email.",
        );
        navigation.navigate(NAVIGATION_ROUTES.OTP_SCREEN, {
          email: emailAdress,
        });
      } catch (error) {
        setIsClicked(false);

        Alert.alert("Registration Error", error.response.data.message);
      }
    }
  };
  const signInGuestHandle = () => {
    dispatch(SignInGuest(navigation));
  };

  const handleResend = () => {
    dispatch(resendOtp(emailAdress));
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "black",
        paddingTop: Platform.OS === "ios" ? 55 : 0,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.LOGIN);
            }}
            noBg
            style={{ alignItems: "flex-end", backgroundColor: "#303D5B" }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
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
                Up
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              styles.textInputView,
              { backgroundColor: "#181f34", width: "45%" },
            ]}
          >
            {/* {props.icon !== undefined && props.icon} */}
            {/* <Avatar color={'white'} /> */}

            {/* <AntDesign name='user' color={"#B7B7B7"} size={22} /> */}
            <TextInput
              placeholderTextColor='#B7B7B7'
              placeholder='First Name'
              onChangeText={(e) => {
                setfirstname(e);
              }}
              style={[
                [styles.textInput, { color: "white", fontWeight: "bold" }],
              ]}
            />
          </View>
          <View style={[styles.textInputView, { width: "45%" }]}>
            {/* <Email /> */}
            <TextInput
              placeholderTextColor='#B7B7B7'
              placeholder='Last Name'
              onChangeText={(e) => {
                setlastname(e);
              }}
              style={[styles.textInput, { color: "white" }]}
            />
          </View>
        </View>

        <View style={[styles.textInputView, { width: "100%" }]}>
          {/* <Email /> */}
          <TextInput
            placeholderTextColor='#B7B7B7'
            placeholder='Email Address'
            autoCapitalize='none'
            autoCorrect={false}
            inputMode='email'
            keyboardType={"email-address"}
            autoComplete={"email"}
            onChangeText={(e) => {
              setEmailAdress(e);
            }}
            style={[styles.textInput, { color: "white" }]}
          />
        </View>
        <View style={[styles.textInputView, { width: "100%" }]}>
          {/* <Password /> */}
          <TextInput
            placeholderTextColor='#B7B7B7'
            placeholder='Password'
            secureTextEntry
            onChangeText={(e) => {
              setPassword(e);
            }}
            style={[styles.textInput, { color: "white" }]}
          />
        </View>
        <View
          style={[styles.textInputView, { width: "100%", display: "none" }]}
        >
          {/* <Email /> */}
          <TextInput
            placeholderTextColor='#B7B7B7'
            placeholder='Username'
            onChangeText={(e) => {
              setUsername(e);
            }}
            style={[styles.textInput, { color: "white" }]}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={[styles.textInputView, { width: "45%" }]}>
            {/* <Ionicons name='people-outline' size={25} color={"#B7B7B7"} /> */}
            {/* <Password /> */}
            <TextInput
              placeholderTextColor='#B7B7B7'
              placeholder='Referral Code'
              onChangeText={(e) => {
                setRefferal(e);
              }}
              style={[
                styles.textInput,
                { color: "white", paddingLeft: 15, paddingRight: 0 },
              ]}
            />
          </View>
          <View style={[styles.textInputView, { width: "50%" }]}>
            {/* <Ionicons name='call-outline' size={20} color={"#B7B7B7"} /> */}
            <TextInput
              placeholderTextColor='#B7B7B7'
              placeholder='Phone Number'
              inlineImageLeft='phoneNumber'
              onChangeText={(e) => {
                setPhoneNumber(e);
              }}
              style={[styles.textInput, { color: "white" }]}
            />
          </View>
        </View>

        <View
          style={{
            // flexDirection: "row",
            marginVertical: 15,
            // alignItems: "center",
            maxWidth: Dimensions.get("screen").width - 45,
          }}
        >
          {/* <CheckBox
            style={{ paddingRight: 10 }}
            isChecked={check}
            checkBoxColor={"#5E72E4"}
            onClick={() => setCheck(!check)}
            //   rightText={"CheckBox"}
          /> */}
          <Text style={{ color: "white" }}>
            By continuing, you agree to Share Slate’s {""}
          </Text>
          <TouchableOpacity
            style={{ paddingHorizontal: 0 }}
            noBg
            start
            // onPress={() => {
            //   navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
            //     typ: "terms",
            //   });
            // }}
            onPress={() => {
              Linking.openURL("https://www.shareslate.fun/terms");
            }}
          >
            <Text
              style={{ color: "#5E72E4", fontWeight: "bold", marginTop: -7 }}
            >
              Terms & Conditions{" "}
            </Text>
          </TouchableOpacity>
          {/* <Text style={{ color: "white" }}>and </Text> */}

          {/* <TouchableOpacity
            style={{ paddingHorizontal: 0 }}
            noBg
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                typ: "policy",
              });
            }}
          >
            <Text style={{ color: "#5E72E4" }}>Privacy Policies.</Text>
          </TouchableOpacity> */}
        </View>
        {!Otpsend ? (
          <TouchableOpacity
            disable={clicked ? true : false}
            onPress={signupBtn}
          >
            <View style={{ flexDirection: "row" }}>
              <ActivityIndicator
                animating={clicked}
                size={"small"}
                color={"#1A2236"}
                style={{ display: clicked ? "flex" : "none", marginRight: 15 }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                SIGNUP
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <OTPInputView
              style={{
                height: 50,
                marginVertical: 12,
                // padding: 5,
                width: "70%",
                alignSelf: "center",
                // backgroundColor: "#293145",
              }}
              pinCount={4}
              // code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              //onCodeChanged={(code) => {
              // setOtpCode(code);
              //}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              onCodeFilled={(code) => {
                otpVerification(code);
              }}
            />
            <TouchableOpacity onPress={handleResend}>
              <Text style={{ color: "white" }}>Resend code</Text>
            </TouchableOpacity>
          </>
        )}

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
              OR Sign Up
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

        <View
          style={{
            marginTop: 15,
          }}
        ></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 9,
    backgroundColor: "#181f34",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  underlineStyleBase: {
    borderWidth: 0,
    color: "white",

    borderWidth: 1,
    borderColor: "grey",
    fontSize: 18,
    tintColor: "white",
  },
});
