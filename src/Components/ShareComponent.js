import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import Share from "react-native-share";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { store } from "../Store/store";
import BlockComponent from "./BlockComponent";
import TouchableOpacity from "../Components/TouchableOpacity";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { savedMini } from "../Store/Actions/minis";
import {
  DeleteSvg,
  GiftSvg,
  LinkNewSvg,
  SQRSvg,
  SaveNewSvg,
} from "../Assets/Svgs";

const ShareComponent = ({
  mini_id,
  onSubmit,
  from,
  item,
  handleReport,
  handleBlock,
  handleDelete,
  handleEdit,
  guesthandle,
  CoinButtn,
  LV,
}) => {
  const navigation = useNavigation();
  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const dispatch = useDispatch();
  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);
  const [saved, setSaved] = useState(item?.is_saved);
  const handleQR = async () => {
    let shareURL;
    try {
      shareURL = await generateLink({ from, mini_id });
      console.log(shareURL);
    } catch (error) {
      console.log(error);
    }
    try {
      if (shareURL !== "") {
        navigation.navigate(NAVIGATION_ROUTES.QR_CODE, { image: shareURL });
        onSubmit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shareUser = async (id) => {
    try {
      const getLink = await generateLink({ from, mini_id });
      const res = await Share.open({
        message: "",
        url: getLink,
      });
      onSubmit();
    } catch (error) {
      onSubmit();
    }
  };
  const savedMiniHandler = () => {
    const body = {
      mini_id: item._id,
    };

    dispatch(savedMini({ body, setSaved }));

    // refRBSheet3.current.close();
  };
  return (
    <>
      <View style={[styles.componentView]}>
        <View
          style={{
            flexDirection: "row",
            bottom: 15,
            justifyContent: "center",
            alignItems: "center",
            display: "none",
          }}
        ></View>

        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
          noBg
          onPress={() => handleQR()}
        >
          {/* <Ionicons
            name={"qr-code-outline"}
            size={22}
            color={theme.textColor}
          /> */}
          <SQRSvg size={20} color={"white"} />
          <Text
            style={{
              paddingLeft: 15,
              color: theme.textColor,
              fontWeight: "bold",
            }}
          >
            Share Slate Code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
          noBg
          onPress={shareUser}
        >
          {/* <Ionicons name={"share-outline"} size={22} color={theme.textColor} /> */}
          <LinkNewSvg size={22} color={"white"} />
          <Text
            style={{
              paddingLeft: 15,
              color: theme.textColor,
              fontWeight: "bold",
            }}
          >
            Share Link
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
          noBg
          onPress={savedMiniHandler}
        >
          {/* <Ionicons name={"share-outline"} size={22} color={theme.textColor} /> */}
          {/* <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={25}
            color={saved ? "#5E72E4" : "#FFFFFF"}
          /> */}
          <SaveNewSvg size={25} color={saved ? "#5E72E4" : "#FFFFFF"} />
          <Text
            style={{
              paddingLeft: 15,
              color: theme.textColor,
              fontWeight: "bold",
            }}
          >
            {saved ? "Unsave" : "Save"}
          </Text>
        </TouchableOpacity>

        {from === "mini" &&
        item?.created_by?._id !== user.data?.checkUser?._id ? (
          <BlockComponent
            handleReport={handleReport}
            handleBlock={handleBlock}
            item={item}
          />
        ) : from === "mini" ? (
          <>
            <TouchableOpacity
              noBg
              onPress={() => (guestUser ? guesthandle : handleDelete(item))}
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              {/* <AntDesign name='delete' size={22} color={theme.textColor} /> */}
              <DeleteSvg size={22} color={"white"} />

              <Text
                style={{
                  color: theme.textColor,
                  fontWeight: "bold",
                  paddingLeft: 15,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              noBg
              onPress={() => (guestUser ? guesthandle : handleEdit(item))}
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <AntDesign name='edit' size={22} color={theme.textColor} />

              <Text
                style={{
                  color: theme.textColor,
                  fontWeight: "bold",
                  paddingLeft: 15,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              noBg
              onPress={() =>
                guestUser
                  ? guesthandle
                  : (navigation.navigate(
                      NAVIGATION_ROUTES.LONG_VIDEOS_CONNECT,
                      {
                        item: item,
                      },
                    ),
                    onSubmit())
              }
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <AntDesign name='disconnect' size={22} color={theme.textColor} />

              <Text
                style={{
                  color: theme.textColor,
                  fontWeight: "bold",
                  paddingLeft: 15,
                }}
              >
                Connect
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
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
    marginHorizontal: 15,
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
export default ShareComponent;
// export const generateLink = async ({ from, mini_id }) => {
//   try {
//     var link = await dynamicLinks().buildShortLink(
//       {
//         link: `https://appshareslatefun.page.link/V9Hh/?${from}=${mini_id}`,
//         domainUriPrefix: "https://appshareslatefun.page.link",
//         android: {
//           packageName: "com.ShareSlateFun",
//           minimumVersion: "18",
//         },
//         ios: {
//           appStoreId: "1670628391",
//           bundleId: "com.ShareSlateFun",
//           minimumVersion: "18",
//         },
//       },
//       dynamicLinks.ShortLinkType.DEFAULT,
//     );

//     return link;
//   } catch (error) {
//     console.log("error raised", error);
//   }
// };
