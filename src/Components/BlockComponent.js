import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import TouchableOpacity from "../Components/TouchableOpacity";
import { useSelector, useDispatch } from "react-redux";
import { removeData } from "../Store/Actions/minis";
import { useNavigation } from "@react-navigation/native";
import GuestHandleComp from "./GuestHandleComp";
import { BlockUserSvg, ReportSvg } from "../Assets/Svgs";

const BlockComponent = ({
  handleReport,
  handleBlock,
  savedMiniHandler,
  item,
}) => {
  const theme = useSelector((e) => e.theme);
  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const backToLogin = () => {
    dispatch(removeData(navigation, "login"));
  };

  const backToSignup = () => {
    dispatch(removeData(navigation, "signup"));
  };

  const guestHandle = () => {
    // setModalVisible(!modalVisible);
    dispatch(removeData(navigation));
  };

  return (
    <>
      <View style={styles.componentView}>
        {/* <TouchableOpacity
          onPress={() => {
            savedMiniHandler();
          }}
          noBg
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
          }}
          // onPress={savedMiniHandler}
        >
          <Ionicons
            name={item?.is_saved ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color={item?.is_saved ? '#5E72E4' : 'black'}
          />
          <Text style={{ paddingLeft: 15, color: theme.textColor }}>
            {item?.is_saved ? 'Mini Saved' : 'Save Minis'}
            {/* Save Mini */}
        {/* </Text> */}
        {/* </TouchableOpacity> */}

        <GuestHandleComp
          backToLogin={backToLogin}
          backToSignup={backToSignup}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          guestHandle={guestHandle}
        />

        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
          noBg
          onPress={guestUser ? guestHandle : handleReport}
        >
          {/* <Octicons name={"report"} size={22} color={theme.textColor} /> */}
          <ReportSvg size={21} color={"white"} />
          <Text
            style={{
              paddingLeft: 15,
              color: theme.textColor,
              fontWeight: "bold",
            }}
          >
            Report Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
          noBg
          onPress={guestUser ? guestHandle : handleBlock}
        >
          {/* <AntDesign name={"deleteuser"} size={22} color={theme.textColor} /> */}
          <BlockUserSvg width={24} height={24} />
          <Text
            style={{
              paddingLeft: 15,
              color: theme.textColor,
              fontWeight: "bold",
            }}
          >
            Block User
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footerView: { position: "absolute", zIndex: 10, bottom: 20, left: 10 },
  itemContainer: {},
  itemImage: {
    width: 125,
    height: 180,
    marginBottom: 5,
    borderRadius: 3,
  },
  componentView: {
    flex: 1,
    // justifyContent: 'center',
  },
  searchView: {
    height: 60,
    width: "95%",
    backgroundColor: "white",
    marginVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default BlockComponent;
