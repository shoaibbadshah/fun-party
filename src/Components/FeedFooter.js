import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Modal,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { API } from "../Api";
import { store } from "../Store/store";
import { Dimensions } from "react-native";
import GuestHandleComp from "./GuestHandleComp";
import { removeData, userFollow } from "../Store/Actions/minis";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import {
  checkImageUrl,
  convertMentionsToPlainText,
  countFormatter,
  interStitialAdsWithInApp,
  interStitialAdsWithInAppSHOW,
  showInterstitial,
} from "../Utils/helpers";
import TabPlayIcon from "../Utils/Assets/Icons/TabPlayIcon";
import { GiftSvg } from "../Assets/Svgs";
import CoinComponent from "./CoinSendComponents";

const FeedFooter = ({ displayWidth, item, navigation, index, isExplore }) => {
  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const dispatch = useDispatch();
  const [numLine, setnumLine] = useState(false);
  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  const [modalVisible, setModalVisible] = useState(false);
  const [is_followed, setis_followed] = useState(false);

  const caption = item?.caption ? item?.caption : "#Shareslate";

  const words = caption.split(" ");

  const followMe = (id) => {
    const body = {
      following_id: id,
    };
    item.created_by["follower_count"] = item?.created_by?.follower_count + 1;
    dispatch(userFollow(body, "", setis_followed));
  };

  const tagPress = async (text) => {
    const regex = /\((.*?)\)/;
    const match = text.match(regex);
    if (match !== null) {
      const userID = match[1];
      try {
        const { data } = await API.v1.Profile.fetchOtherProfile(userID);
        navigation.navigate(
          userID === user.data?.checkUser?._id
            ? navigation.navigate(NAVIGATION_ROUTES.PROFILE)
            : navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                item: {
                  item: data.data,
                  screenName: "OtherProfile",
                },
              }),
        );
      } catch (error) {
        console.log("🚀 ~ file: FeedFooter.js:69 ~ tagPress ~ error:", error);
      }
    }
  };

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
  const refRBSheetCoin = useRef();
  const CoinButtn = () => {
    refRBSheetCoin.current.open();
  };
  const caption1 = item.caption ? item.caption : "#ShareSlate";
  return (
    <View
      key={item?._id}
      style={[styles.footerContainer, { bottom: isExplore ? 45 : 15 }]}
    >
      <TouchableOpacity
        style={{
          display: guestUser
            ? "flex"
            : item?.created_by?._id === user.data?.checkUser?._id
            ? "none"
            : "flex",
          // display: "none",
          // backgroundColor: "red",
          marginBottom: 25,
          // padding: 15,
          //backgroundColor: "#27324E",
          justifyContent: "center",
          alignItems: "center",
          //opacity: 0.8,
          height: 45,
          width: 45,
          borderRadius: 45,
          paddingBottom: 5,
        }}
        onPress={() => {
          guestUser ? guestHandle() : CoinButtn();
        }}
      >
        <View style={{}}>
          <GiftSvg height={30} width={30} />
        </View>
      </TouchableOpacity>
      <View style={[styles.innerFooterContainer]}>
        <View style={{ ...styles.footerImage }}>
          <TouchableOpacity
            onPress={() => {
              guestUser
                ? guestHandle()
                : item?.created_by?._id === user.data?.checkUser?._id
                ? navigation.navigate(NAVIGATION_ROUTES.PROFILE)
                : navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                    item: {
                      item: item?.created_by,
                      screenName: "OtherProfile",
                    },
                  });
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                resizeMode: "cover",
              }}
              source={{
                uri: checkImageUrl(
                  item?.created_by?.profile_image,
                  `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
                ),
              }}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              guestUser
                ? guestHandle()
                : item?.created_by?._id === user.data?.checkUser?._id
                ? navigation.navigate(NAVIGATION_ROUTES.PROFILE)
                : navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                    item: {
                      item: item?.created_by,
                      screenName: "OtherProfile",
                    },
                  });
            }}
          >
            <Text style={{ ...styles.text, fontWeight: "700", marginLeft: 10 }}>
              {item?.created_by?.first_name
                ? item?.created_by?.first_name +
                  " " +
                  item?.created_by?.last_name
                : "Test User"}
            </Text>
          </TouchableOpacity>

          <View style={styles.innerFooterContainer}>
            <Text style={[styles.text, { fontWeight: "600", marginLeft: 10 }]}>
              {countFormatter(item?.views_count)} views
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              borderRadius: 3,
              backgroundColor: "#5E72E4",
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              shadowOpacity: 0.2,
              shadowOffset: { height: 5, width: 0 },

              display: guestUser
                ? "flex"
                : item?.created_by?._id === user.data?.checkUser?._id ||
                  item?.created_by?.is_followed ||
                  is_followed
                ? "none"
                : "flex",
              flexDirection: "row",
            }}
            onPress={async () => {
              // await interStitialAdsWithInAppSHOW();
              guestUser ? guestHandle() : followMe(item?.created_by?._id);
            }}
          >
            <Text
              style={{
                padding: 5,
                color: "white",

                fontSize: 16,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.locationContainer,
          {
            // display:
            //   !item?.location?.city === "undefined" || !item?.location?.city
            //     ? "flex"
            //     : "none",
            display: "none",
          },
        ]}
      >
        <Icon
          name='map-marker'
          size={20}
          color='#333'
          style={styles.locationIcon}
        />
        <Text
          onPress={() => {
            guestUser
              ? guestHandle()
              : navigation.navigate(NAVIGATION_ROUTES.SEARCH, {
                  location: item?.location?.city,
                });
          }}
          style={styles.location}
        >
          {item?.location?.city}, {item?.location?.country}
        </Text>
      </View>

      <View style={{ ...styles.footerDescription }}>
        <View
          style={{
            ...styles.footerInnerDescription,
            width: displayWidth - 128,
          }}
        >
          <Text
            onPress={() => {
              setnumLine(!numLine);
            }}
            numberOfLines={numLine ? 0 : 2}
            ellipsizeMode='tail'
            lineBreakMode='tail'
            style={[
              styles.footerDescriptionText,
              { marginBottom: isExplore ? 35 : 0 },
            ]}
          >
            {caption1
              ? words.map((word, index) => {
                  if (word.startsWith("#")) {
                    return (
                      <Text
                        onPress={() => {
                          guestUser
                            ? guestHandle()
                            : navigation.navigate(NAVIGATION_ROUTES.SEARCH, {
                                hashTag: convertMentionsToPlainText(word),
                              });
                        }}
                        key={index}
                        style={[styles.hashtagText]}
                      >
                        {convertMentionsToPlainText(word)}{" "}
                      </Text>
                    );
                  }
                  if (word.startsWith("@")) {
                    return (
                      <Text
                        onPress={() => {
                          guestUser ? guestHandle() : tagPress(word);
                        }}
                        key={index}
                        style={[styles.hashtagText]}
                      >
                        {convertMentionsToPlainText(word)}{" "}
                      </Text>
                    );
                  }
                  return (
                    <Text key={index} style={styles.footerDescriptionText}>
                      {convertMentionsToPlainText(word)}{" "}
                    </Text>
                  );
                })
              : moment(new Date(item?.createdAt)).fromNow()}
          </Text>
        </View>

        <GuestHandleComp
          backToLogin={backToLogin}
          backToSignup={backToSignup}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          guestHandle={guestHandle}
        />
        <CoinComponent
          user={item?.created_by}
          refRBSheetCoin={refRBSheetCoin}
          navigation={navigation}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NAVIGATION_ROUTES.LONG_VIDEOS_DETAIL, {
            item: item.related_long,
            screenName:
              item?.created_by?._id !== user.data?.checkUser?._id
                ? "OtherProfile"
                : null,
          })
        }
        style={[
          styles.suggestion,
          {
            display: item?.related_long ? "flex" : "none",
            flexDirection: "row",
            marginBottom: isExplore ? 15 : -15,
          },
        ]}
      >
        <Text style={{ color: "white", marginRight: 5 }}>RELATED VIDEOS</Text>
        {/* <Ionicons name={'chevron-forward-outline'} size={30} color={'white'} /> */}
        <Ionicons name={"play-outline"} size={26} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    zIndex: 10,

    left: 10,
  },
  innerFooterContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    marginTop: 3,
  },
  footerImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    backgroundColor: "transparent",
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    shadowOpacity: 4,
    textShadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
  },
  followContainer: {
    justifyContent: "flex-start",
    marginTop: 1,
    alignItems: "flex-start",
    borderRadius: 5,
    marginLeft: 15,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#5E72E4",
  },
  followText: {
    fontSize: 12,
    fontWeight: "bold",

    color: "#ffffff",
  },
  footerDescription: {
    backgroundColor: "transparent",
    flexDirection: "row",
    width: Dimensions.get("window").width - 28,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInnerDescription: {
    paddingLeft: 10,
    paddingTop: 15,
  },
  footerDescriptionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    shadowOpacity: 0.5,
    textShadowColor: "#0005",
    shadowOffset: { height: 1, width: 0 },
  },

  hashtagText: {
    fontSize: 16,
    color: "#5E72E4",
  },
  footerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    padding: 12,
    paddingTop: 10,
    display: "none",
    paddingBottom: 10,
    alignSelf: "flex-end",
  },
  footerButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",

    shadowOpacity: 4,
    textShadowColor: "#0005",
    shadowOffset: { height: 1, width: 0 },
  },
  location: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    shadowOpacity: 4,
    textShadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
  },
  locationIcon: {
    marginRight: 7,
    color: "white",
  },
  locationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 5,
    marginTop: 12,
    paddingLeft: 10,
    maxWidth: "70%",
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
    //backgroundColor: '#AFAFAF',
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  suggestion: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: "#27324E42",
    // paddingVertical: 5,
    // paddingHorizontal: 0,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginHorizontal: 40,

    // marginHorizontal: -22,
    paddingLeft: 32,
    paddingVertical: 2,
  },
});

export default React.memo(FeedFooter);
