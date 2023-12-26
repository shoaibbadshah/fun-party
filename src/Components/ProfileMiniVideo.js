import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import _ from "lodash";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";
import ProgressBar from "react-native-progress/Bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import FeedFooter from "./FeedFooter";
import { store } from "../Store/store";
import FeedSidebar from "./FeedSidebar";
import { isIos } from "../Utils/helpers";
import { Types } from "../Store/Types/type";
import socketServcies from "../Utils/socketServcie";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import TabPlayIcon from "../Utils/Assets/Icons/TabPlayIcon";
import { fetchInsights, likeMini, miniView } from "../Store/Actions/minis";
import FeedHeader from "./FeedHeader";

import Ionicons from "react-native-vector-icons/Ionicons";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import Play from "../Assets/Play";

const ProfileMiniVideo = ({ navigation, route }) => {
  const [miniItem, setminiItem] = useState(route?.params?.item);

  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  const dispatch = useDispatch();
  const [time, setTime] = useState(true);
  const [opacity, setopacity] = useState(0);
  const handleProgress = (data) => {
    const { currentTime } = data;
    if (currentTime <= 2.2 && currentTime >= 1.9 && time) {
      const body = item._id;
      dispatch(miniView(body));
    }
  };

  // console.log(route?.params, 'route?.params');

  const minis = useSelector((state) => state.userMinis);
  const otherUserMinisData = useSelector((state) => state.otherUserMinis);
  const userSelfMentionMinis = useSelector((state) => state?.userMentionMinis);
  const userSavedMinis = useSelector((state) => state?.userSavedMinis);

  const item =
    route?.params?.screenName === "OtherProfile"
      ? _.find(otherUserMinisData?.otherUserMinis, {
          _id: route?.params?.item._id,
        })
      : route?.params?.from == "minis"
      ? _.find(minis?.userMinis, { _id: route?.params?.item._id })
      : route?.params?.from == "mentioned"
      ? _.find(userSelfMentionMinis?.userMentionMinis, {
          _id: route?.params?.item._id,
        })
      : route?.params?.from == "notification" || route?.params?.from == "app.js"
      ? miniItem
      : _.find(userSavedMinis?.userSavedMinis, {
          _id: route?.params?.item._id,
        });

  const filename = item?.minis_url;

  const type = filename?.split(".").pop();
  const notificationType = route?.params.notificationType;

  const user = store.getState().user;

  useEffect(() => {
    if (route?.params?.from === "app.js") {
      socketServcies.emit("mini", {
        user_id: user.data?.checkUser?._id,
        mini_id: route?.params?.mini_id,
      });
      socketServcies.on("mini", (e) => {
        // don't remove the if statement otherwise you will see blank white screen when clicked on notification.
        if (e) {
          setminiItem(e);
        }

        // dispatch({
        //   type: Types.UPDATE_MINI,
        //   payload: {
        //     update_miniId: e?._id,
        //     mini: e,
        //     liked: e?.is_like,
        //   },
        // });
        // e.preventDefault();
      });
    } else {
      socketServcies.emit("mini", {
        user_id: user.data?.checkUser?._id,
        mini_id: route?.params?.item._id,
      });
      // if (!route?.params?.from === 'mentioned') {
      socketServcies.on("mini", (e) => {
        if (e) {
          setminiItem(e);
        }

        // dispatch({
        //   type: Types.UPDATE_MINI,
        //   payload: {
        //     update_miniId: e?._id,
        //     mini: e,
        //     liked: e?.is_like,
        //   },
        // });
        // e.preventDefault();
      });
      // }
    }
    // }, [miniItem?.likes_count]);
  }, []);

  const [tabPaused, setTabPaused] = useState(false);

  const { height, width } = Dimensions.get("window");

  const videoRef = useRef(null);
  const isFocused = useIsFocused();

  const followHandler = (id) => {
    const body = {
      following_id: id,
    };
    dispatch(userFollow(body));
  };
  const likeHandler = (id, liked) => {
    const body = {
      mini: id,
      like: liked,
    };
    dispatch(likeMini(body));
  };

  const fetchOtherProfileHandler = (id) => {
    dispatch(fetchOtherProfile(id));
  };

  const onLoadStart = () => {
    setopacity(1);
  };
  const onLoad = () => {
    setopacity(0);
  };
  const onBuffer = ({ isBuffering }) => {
    setopacity(isBuffering ? 1 : 0);
  };

  return (
    <>
      {item ? (
        <>
          {type === "mp4" ? (
            <View style={styles.profileVideoContainer}>
              {/* <View
                style={{
                  width: 45,
                  shadowOpacity: 4,
                  textShadowColor: '#000',
                  shadowOffset: { height: 1, width: 0 },
                  flexDirection: 'column',

                  right: 0,
                  zIndex: 99,
                  //width: '100%',//
                  position: 'absolute',
                  top: Platform.OS === 'ios' ? 50 : 20,
                }}
              >
                <Ionicons
                  name={'analytics-sharp'}
                  size={30}
                  color={'white'}
                  style={{
                    display: guestUser
                      ? 'flex'
                      : item?.created_by?._id === user.data?.checkUser?._id
                      ? 'flex'
                      : 'none',
                  }}
                  onPress={() => {
                    dispatch(fetchInsights(item?._id));
                    guestUser
                      ? guestHandle()
                      : navigation.navigate(NAVIGATION_ROUTES.MINI_INSIGHTS);
                  }}
                />
                <Ionicons
                  name={'wallet'}
                  size={30}
                  style={{
                    marginTop: 15,
                    display: guestUser
                      ? 'flex'
                      : item?.created_by?._id === user.data?.checkUser?._id
                      ? 'flex'
                      : 'none',
                  }}
                  color={'white'}
                  onPress={() => {
                    guestUser
                      ? guestHandle()
                      : navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
                  }}
                />
                <View
                  style={{
                    width: 35,
                    height: 2,
                    backgroundColor: 'white',
                    marginTop: 15,
                    borderRadius: 2,
                    marginLeft: -5,
                    display: guestUser
                      ? 'flex'
                      : item?.created_by?._id === user.data?.checkUser?._id
                      ? 'flex'
                      : 'none',
                  }}
                ></View>
              </View> */}
              {/* <FeedHeader
                //displayWidth={displayWidth}
                //displayHeight={displayHeight}
                //  activeTab={activeTab}
                //setActiveTab={setActiveTab}
                //subscribe={subscribe}
                item={item}
                //index={index}
              /> */}
              <FeedSidebar
                item={miniItem}
                likeHandler={likeHandler}
                notificationType={notificationType}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  zIndex: 9999,
                  left: 15,
                  top: isIos ? 50 : 20,
                }}
                onPress={() => navigation.goBack()}
              >
                <LeftArrow color={"#ffffff"} width={24} height={24} />
              </TouchableOpacity>
              <Video
                ref={videoRef}
                onBuffer={onBuffer}
                onLoadStart={onLoadStart}
                onLoad={onLoad}
                source={{
                  uri: item?.minis_url,
                }}
                autoPlay={true}
                repeat={true}
                onProgress={handleProgress}
                // onError={(e) => videoError(e)}
                resizeMode={"cover"}
                muted={false}
                style={{
                  width: width,
                  height: height,
                  borderRadius: 3,
                }}
                playInBackground={false}
                paused={!isFocused || tabPaused === true}
                controls={false}
                poster={item?.thumbnail}
                posterResizeMode={"cover"}
                // onEnd={() => {
                //   navigation.goBack();
                // }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                  top: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setTabPaused(!tabPaused);
                }}
              >
                {tabPaused == true ? (
                  <Play color={"#ffffff"} height={60} width={60} />
                ) : null}
              </TouchableOpacity>
              <ProgressBar
                width={Dimensions.get("screen").width}
                height={3}
                borderWidth={0}
                unfilledColor={"#fff"}
                style={{
                  position: "absolute",
                  bottom: 9,
                  opacity: opacity,
                }}
                color='#5E72E4'
                indeterminate={true}
              />
              <FeedFooter
                displayWidth={width}
                item={miniItem}
                followHandler={followHandler}
                fetchOtherProfileHandler={fetchOtherProfileHandler}
                navigation={navigation}
                subscribe={true}
              />
            </View>
          ) : (
            <FastImage
              source={{
                uri: item?.minis_url,
              }}
              resizeMode={"contain"}
            />
          )}
        </>
      ) : (
        <ActivityIndicator
          style={{
            flex: 1,
            alignSelf: "center",
          }}
          animating={true}
          size={"large"}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileVideoContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default ProfileMiniVideo;
