import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import MinisSearch from "../Assets/MinisSearch";
import { NotificationSvg } from "../Assets/Svgs";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import { useSelector } from "react-redux";

const HeaderBackGen = ({
  middleText,
  leftIcon,
  RightIcon,
  leftAction,
  RightAction,
  isBack,
}) => {
  const theme = useSelector((e) => e.theme);
  const { width, height } = Dimensions.get("screen");
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 7,
      }}
    >
      <TouchableOpacity onPress={leftAction}>
        {/* <Ionicons name={"search-outline"} size={32} color={theme.text} /> */}
        {/* <MinisSearch color={"#fff"} width={28} height={28} /> */}

        <LeftArrow color={theme.text} width={24} height={24} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          marginLeft: -32,

          fontWeight: "bold",
          color: theme.text,
          // display: user?.first_name || user?.last_name ? "flex" : "none",
        }}
      >
        {/* {user?.first_name + " " + user?.last_name} */}
        {middleText}
      </Text>

      <TouchableOpacity
        style={{
          // width: 40,
          // height: 40,
          marginTop: 12,
          marginRight: -12,
        }}
        onPress={RightAction}
      >
        {/* <NotificationSvg stroke={theme.text} height={30} width={30} /> */}
        {/* <RightIcon /> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBackGen;
