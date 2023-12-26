import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as TouchButton from "./TouchableOpacity";
import { debounce } from "lodash";
import {
  deleteMini,
  fetchComments,
  fetchInsights,
  likeMini,
  removeData,
  reportMini,
  savedMini,
} from "../Store/Actions/minis";
import ReportMini from "./Report";
import { store } from "../Store/store";
import ThreeDots from "../Assets/ThreeDots";
import MinisLike, { MinisCOIN } from "../Assets/MinisLike";
import ShareComponent from "./ShareComponent";
import BlockComponent from "./BlockComponent";
import MinisShare from "../Assets/MinisShare";
import CommentComponent from "./CommentComponent";
import MinisMessage, { SVGCards } from "../Assets/MinisMessage";
import { blockUserAccount } from "../Store/Actions/profile";
import { NOTIFICATIONS } from "../Utils/notificationsTypes";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { Modal } from "react-native";
import socketServcies from "../Utils/socketServcie";
import { Types } from "../Store/Types/type";
import * as CText from "../Components/Text";
import CoinComponent from "./CoinSendComponents";
import { DoubleTap } from "./DoubleTap";
import GuestHandleComp from "./GuestHandleComp";
import { AnalyticsSvg, GiftSvg, ShareSvg } from "../Assets/Svgs";
const FeedSidebar = ({
  item,
  likeHandler,
  notificationType,
  setPage,
  index,
  selectedIndex,
  isExplore,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = store.getState().user;
  const [likeCOlor, setlikeCOlor] = useState(item.is_like ? "#5E72E4" : "#fff");

  const theme = useSelector((e) => e.theme);
  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);
  const [liked, setLiked] = useState(
    item?.likes_count == 0 ? false : item?.is_like,
  );
  const [saved, setSaved] = useState(item?.is_saved);

  const [likes, setLikes] = useState(item?.likes_count);
  // console.log('🚀 ~ file: FeedSidebar.js:64 ~ likes:', likes, liked);

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheetComponent = useRef();
  const refRBSheetCoin = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (
      (notificationType &&
        NOTIFICATIONS.MINI_COMMENT.type === notificationType) ||
      NOTIFICATIONS.MINI_COMMENT_REPLY.type === notificationType
    ) {
      openSheetComment(item._id);
    }
  }, []);

  const openSheet = (itemObj, e, heigh) => {
    if (e === "share") {
      refRBSheet.current.open();
    } else if (e === "block") {
      refRBSheet3.current.open();
    } else {
      refRBSheet2.current.open();
    }
  };

  const openSheetComment = (itemId) => {
    dispatch(fetchComments(itemId));
    refRBSheetComponent.current.open();
  };

  const LikeButtn = () => {
    setLiked((l) => !l);
    setLikes((l) => (liked ? l - 1 : l + 1));
    // likeHandler(item._id, true);
    const body = {
      mini: item._id,
      like: true,
    };

    dispatch(likeMini(body));
    dispatch({
      type: Types.LIKE_COUNT,
      payload: {
        like_id: item._id,
        like_count: likes,
        is_like: liked,
      },
    });
  };

  const savedMiniHandler = () => {
    const body = {
      mini_id: item._id,
    };

    dispatch(savedMini({ body, setSaved }));

    // refRBSheet3.current.close();
  };
  const handleShare = async (image) => {
    refRBSheet.current.close();
  };

  const handleReport = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      refRBSheet2.current.open();
    }, 500);
  };

  const handleBlock = async () => {
    refRBSheet3.current.close();

    Alert.alert("Block User", "Are you sure you want to block this user?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          setPage(1),
            dispatch(blockUserAccount({ block_user: item.created_by._id }));

          refRBSheet.current.close();
        },
      },
    ]);
  };

  const onSubmitReport = (reason) => {
    refRBSheet2.current.close();

    const body = {
      mini_id: item._id,
      reason: reason,
    };
    dispatch(reportMini(body));
    refRBSheet.current.close();
    refRBSheet3.current.close();
  };

  const handleInsights = async (i) => {
    refRBSheet2.current.close();
    refRBSheet3.current.close();
    dispatch(fetchInsights(i._id));
    navigation.navigate(NAVIGATION_ROUTES.MINI_INSIGHTS);
  };
  const handleDelete = async (i) => {
    refRBSheet2.current.close();
    dispatch(deleteMini(i._id));
    navigation.navigate(NAVIGATION_ROUTES.PROFILE);
  };

  const handleEdit = async (videoData) => {
    refRBSheet2.current.close();
    onSubmit();
    navigation.navigate(NAVIGATION_ROUTES.CREATE_MINI, {
      image: videoData.minis_url,
      from: "upload",
      type: "video",
      caption: videoData.caption,
      updateId: videoData._id,
      location: videoData.location,
    });
  };

  const backToLogin = () => {
    dispatch(removeData(navigation, "login"));
  };

  const backToSignup = () => {
    dispatch(removeData(navigation, "signup"));
  };

  const guestHandle = () => {
    // setModalVisible(!modalVisible);
    // navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
    dispatch(removeData(navigation));
  };
  return (
    <View
      key={index}
      style={[styles.sidebarContainer, { bottom: isExplore ? 75 : 40 }]}
    >
      <CommentComponent
        itemId={item?._id}
        refRBSheetComponent={refRBSheetComponent}
        navigation={navigation}
      />
      <CoinComponent
        user={item?.created_by}
        refRBSheetCoin={refRBSheetCoin}
        navigation={navigation}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("screen").height / 2.3}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.primary,
          },
        }}
      >
        <ShareComponent
          mini_id={item._id}
          onSubmit={handleShare}
          getRef={(c) => setProductQRref(c)}
          from='mini'
          item={item}
          handleBlock={guestUser ? guestHandle : handleBlock}
          handleReport={guestUser ? guestHandle : handleReport}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          guesthandle={guestHandle}
          // openSheet={openSheet}
        />
      </RBSheet>

      <RBSheet
        ref={refRBSheet3}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("screen").height / 2.3}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.footer,
          },
        }}
      >
        <BlockComponent
          handleReport={handleReport}
          handleBlock={handleBlock}
          savedMiniHandler={savedMiniHandler}
          item={item}
        />
      </RBSheet>

      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("screen").height / 1.5}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.footer,
          },
        }}
      >
        {guestUser ? guestHandle : <ReportMini onSubmit={onSubmitReport} />}
      </RBSheet>

      <GuestHandleComp
        backToLogin={backToLogin}
        backToSignup={backToSignup}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        guestHandle={guestHandle}
      />

      <View style={styles.sidebarInnerContainer}>
        <View style={styles.sidebarContentWrapper}>
          {/* <TouchableOpacity
            onPress={() => {
              // guestUser ? guestHandle() : CoinButtn();
            }}
          >
            <View style={[styles.sidebarIconWrapper, { marginBottom: 5 }]}>
              <Ionicons name={'flash-outline'} color={'white'} size={38} />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              guestUser ? guestHandle() : handleInsights();
            }}
          >
            <View style={[styles.sidebarIconWrapper]}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(fetchInsights(item?._id));
                  guestUser
                    ? guestHandle()
                    : navigation.navigate(NAVIGATION_ROUTES.MINI_INSIGHTS);
                }}
                style={{
                  borderRadius: 33,
                  // backgroundColor: "#27324E",
                  // opacity: 0.8,
                  paddingHorizontal: 10,
                  display:
                    item?.created_by?._id === user.data?.checkUser?._id
                      ? "flex"
                      : "none",
                }}
              >
                <AnalyticsSvg size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={
              {
                // display: guestUser
                //   ? "flex"
                //   : item?.created_by?._id === user.data?.checkUser?._id
                //   ? "none"
                //   : "flex",
                // display: "none",
              }
            }
            onPress={() => {
              guestUser ? guestHandle() : CoinButtn();
            }}
          >
            <View style={[styles.sidebarIconWrapper, { marginBottom: 5 }]}>
              <GiftSvg height={42} width={42} />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              guestUser ? guestHandle() : LikeButtn();
            }}
          >
            <View style={[styles.sidebarIconWrapper, { marginTop: 33 }]}>
              <View
                style={{
                  borderRadius: 33,
                  //backgroundColor: "#27324E",
                  // opacity: 0.8,
                  paddingHorizontal: 10,
                }}
              >
                <MinisLike
                  color={guestUser ? "#fff" : liked ? "#FFBC00" : "#fff"}
                  // color={guestUser ? '#fff' : likeCOlor} size={24}
                  width={24}
                  height={24}
                />
              </View>
              <Text style={[styles.sidebarTextStyle, { marginBottom: 17 }]}>
                {likes == 0 ? "" : Math.abs(likes)}
              </Text>
            </View>
          </TouchableOpacity>
          {/* </DoubleTap> */}

          <TouchableOpacity
            onPress={() => {
              guestUser ? guestHandle() : openSheetComment(item._id);
            }}
          >
            <View style={[styles.sidebarIconWrapper, { marginBottom: 5 }]}>
              <View
                style={{
                  borderRadius: 33,
                  // backgroundColor: "#27324E",

                  // opacity: 0.8,
                  paddingHorizontal: 10,
                }}
              >
                <MinisMessage color={"#fff"} width={26} height={26} />
              </View>
              <Text style={styles.sidebarTextStyle}>
                {item?.comment_count == "0"
                  ? ""
                  : Math.abs(item?.comment_count)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sidebarIconWrapper, { marginTop: 10 }]}
            onPress={() => {
              openSheet(item._id, "share", Dimensions.get("screen").height / 3);
            }}
          >
            <View
              style={{
                borderRadius: 33,
                // backgroundColor: "#27324E",
                // opacity: 0.8,
                paddingHorizontal: 10,
              }}
            >
              {/* <Ionicons name={"arrow-redo"} size={30} color={"white"} /> */}
              <ShareSvg size={20} color={"white"} />
            </View>
          </TouchableOpacity>

          <View
            style={[
              styles.sidebarIconWrapper,
              { marginBottom: 5, display: "none" },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                guestUser ? guestHandle() : savedMiniHandler();
              }}
            >
              <Ionicons
                name='bookmark'
                size={32}
                color={saved ? "#5E72E4" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute",
    width: "16%",

    right: 8,
    zIndex: 99,
  },
  sidebarInnerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
  },
  sidebarContentWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  sidebarContentColumnWrapper: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarIconWrapper: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 15,
    // shadowOpacity: 4,
    // textShadowColor: '#0005',
    // shadowOffset: { height: 1, width: 0 },
  },

  sidebarTextStyle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  footerImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "rgba(0,0,0,0.19)",
  },
  plus: {
    position: "absolute",
    zIndex: 1,
    left: -10,
    backgroundColor: "black",
    borderRadius: 22,
    padding: 1,
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
    //padding: 5,
    justifyContent: "center",
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
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
});
export default FeedSidebar;
