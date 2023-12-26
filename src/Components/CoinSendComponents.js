import React, { useRef, useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { useDispatch, useSelector } from "react-redux";

import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import Text from "./Text";
import * as ITouchableOpacity from "./TouchableOpacity";
import { SendCoinAction } from "../Store/Actions/minis";
import { MinisCOIN, MinisCOINNew } from "../Assets/MinisLike";
import {
  BouquetSvg,
  CrownSvg,
  HeartSvg,
  KissSvg,
  StarsSvg,
  ThumbUpSvg,
} from "../Assets/Svgs";

const CoinComponent = ({ user, refRBSheetCoin, navigation, onMoveProfile }) => {
  console.log(
    "🚀 ~ file: CoinSendComponents.js:22 ~ CoinComponent ~ user:",
    user,
  );
  const dispatch = useDispatch();
  const theme = useSelector((e) => e.theme);
  const amout = [
    { amt: "10", name: "Flowers" },
    { amt: "20", name: "Thumbs up" },
    { amt: "50", name: "Stars" },
    { amt: "100", name: "Love" },
    { amt: "250", name: "Kiss" },
    { amt: "500", name: "Crown" },
  ];

  const [selectedCoin, setSelectedCoin] = useState("");

  const SendCoin = (amt) => {
    const body = {
      reciver: user?._id,
      send_coins: amt,
    };
    console.log("🚀 ~ file: CoinSendComponents.js:39 ~ SendCoin ~ body:", body);
    refRBSheetCoin?.current?.close();
    dispatch(SendCoinAction(body, refRBSheetCoin));
  };

  const yesHandle = (item) => {
    console.log("🚀 ~ file: CoinSendComponents.js:57 ~ yesHandle ~ amt:", item);
    Alert.alert(
      "Appreciate creator",
      `Sending ${item.name} to ${user?.first_name} ${user?.last_name}. Send?`,
      [
        {
          text: "Not now",
          onPress: () => console.log("Cancel option selected"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => SendCoin(item.amt),
        },
      ],
      { cancelable: false },
    );
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            backgroundColor: selectedCoin == item.amt ? "#687598" : "#303d5b",
            width: Dimensions.get("screen").width / 2.4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            margin: 12,
            //marginBottom: 12,
            // borderColor: selectedCoin == item.amt ? "#5E72E4" : "white",
            // borderWidth: 2,
            padding: 8,
            // flexDirection: "row",
          }}
          onPress={() => {
            // setSelectedCoin(item.amt);
            yesHandle(item);
          }}
        >
          {item.amt === "10" ? (
            // <HeartSvg size={68} />
            <BouquetSvg size={68} />
          ) : item.amt === "20" ? (
            <ThumbUpSvg size={68} />
          ) : item.amt === "50" ? (
            <StarsSvg size={68} />
          ) : item.amt === "100" ? (
            <HeartSvg size={68} />
          ) : item.amt === "250" ? (
            <KissSvg size={68} />
          ) : (
            item.amt === "500" && <CrownSvg size={68} />
          )}
          <Text
            style={{
              color: "white",

              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item.name}{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",

                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.amt}{" "}
            </Text>
            <MinisCOINNew
              color={"#fff"}
              // color={guestUser ? '#fff' : likeCOlor}
              width={18}
              height={18}
            />
          </View>

          {/* <BouquetSvg size={18} /> */}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View>
      <RBSheet
        ref={refRBSheetCoin}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={Dimensions.get("window").height / 1.8}
        closeOnPressBack={true}
        closeDuration={50}
        onClose={() => {
          setSelectedCoin("");
        }}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            backgroundColor: "black",
            borderRadius: 15,
          },
        }}
      >
        {/* <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          extraHeight={30}
        > */}
        <View style={{ padding: 15 }}>
          <FlatList
            data={amout}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 15,
            }}
            // ListFooterComponent={
            //   <>
            //     <ITouchableOpacity.default
            //       onPress={() => {
            //         Alert.alert(
            //           "Choose an option",
            //           `Sending ${selectedCoin} to ${item?.first_name} ${item?.last_name}. Send?`,
            //           [
            //             {
            //               text: "May be later",
            //               onPress: () =>
            //                 console.log("May be later option selected"),
            //             },
            //             {
            //               text: "No",
            //               onPress: () => console.log("Cancel option selected"),
            //               style: "cancel",
            //             },
            //             {
            //               text: "Send",
            //               onPress: SendCoin,
            //             },
            //           ],
            //           { cancelable: false },
            //         );
            //       }}
            //       style={{
            //         margin: 10,
            //         borderRadius: 5,
            //         backgroundColor:
            //           selectedCoin == "" ? "lightgrey" : "#5E72E4",
            //       }}
            //       disabled={selectedCoin == "" && true}
            //     >
            //       <Text
            //         style={{ color: selectedCoin == "" ? "black" : "white" }}
            //       >
            //         Gift Coins
            //       </Text>
            //     </ITouchableOpacity.default>
            //   </>
            // }
            // ItemSeparatorComponent={<View style={{ height: 12 }}></View>}
          />
        </View>
        {/* </KeyboardAwareScrollView> */}
      </RBSheet>
    </View>
  );
};

export default CoinComponent;
