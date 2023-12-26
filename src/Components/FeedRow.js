import React, { useEffect, forwardRef, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FeedFooter from "./FeedFooter";
import FeedSidebar from "./FeedSidebar";
import VideoComponent from "./VideoComponent";
import FeedHeader from "./FeedHeader";
import { isIos } from "../Utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Store/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchComments, postComment } from "../Store/Actions/minis";
import CommentComponent from "./CommentComponent";
import Video from "react-native-video";
import TabPlayIcon from "../Utils/Assets/Icons/TabPlayIcon";
import FastImage from "react-native-fast-image";
// import socketServcies from "../Utils/socketServcie";
// import { store } from "../Store/store";

const FeedRow = forwardRef(
  (
    {
      isTabFocused,
      onPressPaused,
      isTabPaused,
      displayWidth,
      displayHeight,
      item,
      index,
      selectedIndex,
      followHandler,
      videoRef,
      isFocused,
      tabPaused,
      setTabPaused,
      likeHandler,
      fetchOtherProfileHandler,
      navigation,
      isExplore,
      activeTab,
      setActiveTab,
      subscribe,
      onRefresh,
      setPage,
      onPressPlay,
    },
    ref,
  ) => {
    const snapHeight = isExplore ? 75 : isIos ? 65 : 55;

    const theme = useSelector((state) => state.theme);

    const [buffering, setbuffering] = useState(true);
    const [paused, setPaused] = useState(false);

    const refRBSheetComponent = useRef();

    const dispatch = useDispatch();
    const openSheetComment = (itemId) => {
      dispatch(fetchComments(itemId));
      refRBSheetComponent.current.open();
    };
    const onBuffer = ({ isBuffering }) => {
      setbuffering(isBuffering);
    };
    const onPlayPause = () => {
      if (paused) {
        onPressPlay();
        setPaused(false);
      } else {
        onPressPaused();
        setPaused(true);
      }
    };

    // const filename = item;
    // console.log("🚀 ~ file: FeedRow.js:75 ~ filename:", filename);

    return (
      <View key={index}>
        <FeedSidebar
          index={index}
          item={item}
          likeHandler={likeHandler}
          setPage={setPage}
          isExplore={isExplore}
          selectedIndex={selectedIndex}
        />

        <Video
          ref={(r) => {
            if (r) {
              ref.current[item?._id] = r;
            }
          }}
          playInBackground={false}
          playWhenInactive={false}
          source={{
            uri: item?.minis_url,
          }}
          // paused={true}
          // autoPlay={true}
          //   muted={true}
          resizeMode={"cover"}
          // paused={!!index || !isTabFocused}
          //poster={item?.thumbnail}
          // posterResizeMode={'cover'}
          paused={true}
          repeat={true}
          //posterResizeMode={"cover"}
          ignoreSilentSwitch='ignore'
          automaticallyWaitsToMinimizeStalling={true}
          // onBuffer={onBuffer}
          onLoad={() => setbuffering(false)} // Hide the loader when the video is loaded
          onLoadStart={() => setbuffering(true)}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          // bufferConfig={{
          //   minBufferMs: 2500,
          //   maxBufferMs: 2500,
          //   bufferForPlaybackMs: 2500,
          //   bufferForPlaybackAfterRebufferMs: 5000,
          // }}
          // onError={(e) => videoError(e)}
          // onProgress={!guestUser && handleProgress}
          // resizeMode={"cover"}
          // muted={false}
          style={{
            width: displayWidth,
            height: displayHeight - 54,
            borderRadius: 3,
            // backgroundColor: 'red',
          }}
          // paused={selectedIndex !== index || !isFocused || tabPaused === true}
          // controls={false}
          // poster={item?.thumbnail}
          // posterResizeMode={"cover"}
          // hideShutterView={true}
          // onEnd={() => setTime(false)}
          // onLoad={onVideoLoad}
        />
        {buffering ? (
          <ActivityIndicator
            size='large'
            color='#fff'
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ) : null}
        <View
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            top: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: displayHeight * 0.7,
              width: displayWidth * 0.7,
              marginBottom: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onPlayPause}
          >
            {/* {isTabPaused ? (
              <TabPlayIcon color={"#ffffff"} height={100} width={100} />
            ) : null} */}
          </TouchableOpacity>

          {/*  width={Dimensions.get("screen").width}*/}
          {/*  height={3}*/}
          {/*  borderWidth={0}*/}
          {/*  unfilledColor={"#fff"}*/}
          {/*  style={{*/}
          {/*    position: "absolute",*/}
          {/*    bottom: !isExplore ? 65 : 30,*/}
          {/*    opacity: opacity,*/}
          {/*  }}*/}
          {/*  color='#37CEEF'*/}
          {/*  indeterminate={true}*/}
        </View>

        <FeedFooter
          displayWidth={displayWidth}
          item={item}
          index={index}
          followHandler={followHandler}
          fetchOtherProfileHandler={fetchOtherProfileHandler}
          navigation={navigation}
          subscribe={true}
          isExplore={isExplore}
        />
        <CommentComponent
          itemId={item?._id}
          refRBSheetComponent={refRBSheetComponent}
          navigation={navigation}
        />
        {isExplore && (
          <TouchableOpacity
            onPress={() => {
              openSheetComment(item?._id);
            }}
            style={{
              height: 75,
              width: "100%",
              backgroundColor: "black",
              flexDirection: "row",
              paddingRight: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "90%",
                borderRadius: 10,
                textAlignVertical: "center",
                paddingHorizontal: 10,
                textAlign: "left",
                fontSize: 16,
                color: "white",
                fontWeight: "400",
              }}
            >
              Add comment
            </Text>

            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Ionicons
                name={theme?.name === "light" ? "send-outline" : "send"}
                color={"#cbc9c9"}
                size={32}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default React.memo(FeedRow);
