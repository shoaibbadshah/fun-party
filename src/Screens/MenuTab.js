import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Share from "react-native-share";
import { useSelector } from "react-redux";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CONSTANTS } from "../Utils";
import { store } from "../Store/store";
import { checkImageUrl, generateLink, onShareLink } from "../Utils/helpers";
import { MinisCOIN } from "../Assets/MinisLike";
import MinisSearch from "../Assets/MinisSearch";
import { navigate } from "../Utils/Navigation/navigationRef";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { handleQR } from "./Profile";
import { InviteUSerSvg, SQRSvg, TvSvg } from "../Assets/Svgs";

const MenuTab = () => {
  // const user = store.getState().user?.data?.checkUser;
  const user = useSelector((e) => e.profile?.profile);

  const [loader, setLoader] = useState(false);
  const theme = useSelector((e) => e.theme);
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.statusbar} />
      <View style={{ marginBottom: "10%" }}>
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Spaces
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "7%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigate(NAVIGATION_ROUTES.PROFILE);
          }}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                resizeMode: "cover",
              }}
              source={{
                uri: checkImageUrl(
                  user?.profile_image,
                  `https://ui-avatars.com/api/?background=random&name=${user?.created_by?.first_name}+${user?.created_by?.last_name}`,
                ),
              }}
            />
          </View>

          <Text
            style={{
              color: theme.primaryText,
              fontSize: 18,
              fontWeight: "400",
              alignSelf: "center",
              paddingLeft: 12,
            }}
          >
            {user?.first_name} {user?.last_name}
          </Text>
        </TouchableOpacity>
        {/* <MaterialCommunityIcons
          onPress={() => {
            handleQR(user?._id);
            // navigate(NAVIGATION_ROUTES.QR_CODE, {
            //   image: user?._id,
            // });
          }}
          name='qrcode-scan'
          size={22}
          color={theme.text}
          style={{
            fontSize: 18,
            fontWeight: "700",
            alignSelf: "center",
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            handleQR(user?._id);
            // navigate(NAVIGATION_ROUTES.QR_CODE, {
            //   image: user?._id,
            // });
          }}
          style={{
            fontSize: 18,
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          <SQRSvg size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate(NAVIGATION_ROUTES.SEARCH);
        }}
        style={{
          backgroundColor: theme.button,
          height: 45,
          width: "100%",
          marginVertical: 15,
          borderRadius: 10,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
          marginBottom: "15%",
        }}
      >
        <MinisSearch color={"grey"} width={18} height={18} />
        <Text
          // onPress={() => {
          //   navigate(NAVIGATION_ROUTES.SEARCH);
          // }}
          style={{
            width: "92%",
            // height: "100%",
            color: "grey",
            textAlign: "left",
          }}
          placeholderTextColor={"grey"}
          returnKeyType={"search"}
          // editable={false}
          selectTextOnFocus={false}
          contextMenuHidden={true}
          placeholder={"Search"}
        >
          Search
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            backgroundColor: theme.button,
            borderRadius: 12,
            marginRight: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigate(NAVIGATION_ROUTES.MEDIA_CAMERA, {
              createType: CONSTANTS.IS_MINI,
            });
          }}
        >
          <Octicons
            name="device-mobile"
            size={22}
            style={{
              color: theme.primaryText,
              fontSize: 30,
              fontWeight: '700',
            }}
          />
          <Text
            style={{
              color: theme.text1,
              fontSize: 12,
              marginTop: 10,
              fontWeight: '700',
            }}
          >
            MINIS
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            backgroundColor: theme.button,
            borderRadius: 12,
            marginRight: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigate(NAVIGATION_ROUTES.LONG_VIDEOS_LISTINGS);
          }}
        >
          {/* <MaterialIcons
            name='video-library'
            size={22}
            color={theme.primaryText}
            style={{
              fontSize: 30,
              fontWeight: "700",
            }}
          /> */}
          <TvSvg height={40} width={40} />
          <Text style={styles.caption}>Videos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate(NAVIGATION_ROUTES.WALLET_HOME);
          }}
          style={{
            height: 100,
            width: 100,
            backgroundColor: theme.button,
            borderRadius: 12,
            marginRight: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MinisCOIN color={"#fff"} width={30} height={30} />
          <Text style={styles.caption}>Manage Coins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loader}
          style={{
            height: 100,
            width: 100,
            backgroundColor: theme.button,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={async () => {
            // InviteUser();
            await onShareLink(setLoader);
          }}
        >
          {loader ? (
            <ActivityIndicator
              color={theme.secondary}
              animating={loader}
              size={"small"}
            />
          ) : (
            // <Ionicons
            //   name='person-add' //person-add
            //   size={22}
            //   color={theme.primaryText}
            //   style={{
            //     fontSize: 30,
            //     fontWeight: "700",
            //   }}
            // />
            <InviteUSerSvg size={28} color={"white"} />
          )}
          <Text style={styles.caption}>Invite Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuTab;

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primary,
      padding: 12,
      // paddingTop:
      //   Platform.OS == "ios"
      //     ? StatusBar.currentHeight
      //     : StatusBar.currentHeight,
      paddingTop: Platform.OS === "ios" ? "12%" : "8%",
      paddingHorizontal: 15,
    },
    optionsWrapper: {
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
      paddingVertical: 6,
      marginVertical: 6,
    },
    caption: {
      color: theme.primaryText,
      fontSize: 12,
      marginTop: 10,
      fontWeight: "500",
      textAlign: "center",
      paddingHorizontal: 9,
    },
  });
