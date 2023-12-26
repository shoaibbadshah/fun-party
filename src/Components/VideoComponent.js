import React, { forwardRef, useMemo, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";
import ProgressBar from "react-native-progress/Bar";
import { useDispatch, useSelector } from "react-redux";

import { miniView } from "../Store/Actions/minis";
import TabPlayIcon from "../Utils/Assets/Icons/TabPlayIcon";
import Play from "../Assets/Play";

const VideoComponent = ({
  displayWidth,
  displayHeight,
  item,
  index,
  selectedIndex,
  videoRef,
  isFocused,
  // tabPaused,
  // setTabPaused,
  isExplore,
}) => {
  const filename = item?.minis_url;
  const dispatch = useDispatch();
  const type = filename?.split(".").pop();
  const [time, setTime] = useState(true);
  const [tabPaused, setTabPaused] = useState(false);

  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  useMemo(() => {
    setTabPaused(false);
  }, [selectedIndex]);

  const [opacity, setopacity] = useState(0);
  const onLoadStart = () => {
    setopacity(1);
  };
  const onLoad = () => {
    setopacity(0);
    const body = item._id;
    console.log(
      "🚀 ~ file: VideoComponent.js:49 ~ handleProgress ~ body:",
      body,
    );
    dispatch(miniView(body));
  };
  const onBuffer = ({ isBuffering }) => {
    setopacity(isBuffering ? 1 : 0);
  };
  const handleProgress = (data) => {
    const { currentTime } = data;
    if (currentTime <= 2.2 && currentTime >= 0.9 && time && !guestUser) {
    }
  };

  return (
    <>
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
        // bufferConfig={{
        //   minBufferMs: 2500,
        //   maxBufferMs: 2500,
        //   bufferForPlaybackMs: 2500,
        //   bufferForPlaybackAfterRebufferMs: 5000,
        // }}
        // onError={(e) => videoError(e)}
        onProgress={!guestUser && handleProgress}
        resizeMode={"cover"}
        muted={false}
        style={{
          width: displayWidth,
          height: displayHeight,
          borderRadius: 3,
        }}
        playInBackground={false}
        paused={selectedIndex !== index || !isFocused || tabPaused === true}
        controls={false}
        poster={item?.thumbnail}
        posterResizeMode={"cover"}
        hideShutterView={true}
        onEnd={() => setTime(false)}
      />
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
          onPress={() => {
            setTabPaused(!tabPaused);
          }}
        >
          {tabPaused == true ? (
            <Play color={"#ffffff"} height={100} width={100} />
          ) : null}
        </TouchableOpacity>
        <ProgressBar
          width={Dimensions.get("screen").width}
          height={3}
          borderWidth={0}
          unfilledColor={"#fff"}
          style={{
            position: "absolute",
            bottom: !isExplore ? 65 : 30,
            opacity: opacity,
          }}
          color='#37CEEF'
          indeterminate={true}
        />
      </View>
    </>
  );
};

export default React.memo(VideoComponent);
