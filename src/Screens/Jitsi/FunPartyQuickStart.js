import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { navigate } from "../../Utils/Navigation/navigationRef";
import { NAVIGATION_ROUTES } from "../../Utils/Navigation/NavigationRoutes";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GiftSvg } from "../../Assets/Svgs";
import HeaderBackGen from "../../Components/headerBackGen";

const FunPartyQuickStart = ({ navigation }) => {
  const theme = useSelector((e) => e.theme);
  return (
    <View //"Create FunParty"
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingHorizontal: 22,
        paddingTop: StatusBar.currentHeight + 40,
      }}
    >
      {/* <StatusBar barStyle={"light-content"} /> */}
      <View style={{ marginLeft: -22 }}>
        <HeaderBackGen
          isBack={true}
          middleText={"Create FunParty"}
          leftAction={() => {
            navigation.goBack();
          }}
        />
      </View>
      <Text
        style={{ marginVertical: 44, color: theme.text, textAlign: "center" }}
      >
        Before you start
      </Text>

      <View
        style={{ backgroundColor: theme.button, borderRadius: 12, padding: 12 }}
      >
        <Text style={{ color: theme.text, marginVertical: 12 }}>
          To start a FunParty you need video link
        </Text>

        <Text style={{ color: theme.text, fontSize: 18, marginVertical: 22 }}>
          Using Share Slate Videos
        </Text>
        <Text style={{ color: theme.text, lineHeight: 28, paddingRight: 44 }}>
          To create Share Slate based video FunParty please go to Videos
          <View>
            <MaterialIcons
              name='video-collection'
              size={25}
              color={theme.text}
              style={{ marginHorizontal: 7 }}
            />
          </View>
          via spaces, search the video you want to play and tap the FunParty
          Icon .{" "}
          <View>
            <MaterialIcons
              name='tv'
              size={25}
              color={theme.text}
              style={{ marginHorizontal: 7 }}
            />
          </View>
        </Text>
        <Text style={{ marginVertical: 22, color: theme.text }}>
          Follow rest of the instructions in next screens.
        </Text>

        {/* ==== */}
        <Text style={{ color: theme.text, fontSize: 18, marginVertical: 22 }}>
          Using Youtube Videos
        </Text>
        <Text style={{ color: theme.text, lineHeight: 28 }}>
          Go to Youtube and copy the video link you want to watch via FunParty.
          Follow the steps mentioned in the next screen
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE)}
        style={{
          backgroundColor: theme.secondary,
          borderRadius: 8,
          alignItems: "center",
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          marginHorizontal: 22,
        }}
      >
        <Text style={{ color: "white", padding: 10 }}>Ready to start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FunPartyQuickStart;

const styles = StyleSheet.create({});
