import React, { useRef, useState } from "react";
import Video from "react-native-video";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
  LogBox,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import TabPlayIcon from "../Utils/Assets/Icons/TabPlayIcon";
import ProgressBar from "react-native-progress/Bar";
import { useSelector } from "react-redux";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import Play from "../Assets/Play";

const MediaForChat = ({ route, navigation }) => {
  const item = route?.params?.item;

  const isFocused = useIsFocused();
  const videoRef = useRef(null);

  const [tabPaused, setTabPaused] = useState(false);
  const [opacity, setopacity] = useState(0);

  const theme = useSelector((state) => state.theme);

  const onLoadStart = () => {
    setopacity(true);
  };
  const onLoad = () => {
    setopacity(false);
  };
  const onBuffer = ({ isBuffering }) => {
    // setopacity(isBuffering ? 1 : 0);
    setopacity(isBuffering ? true : false);
  };

  return (
    <View style={{ backgroundColor: theme.primary }}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          zIndex: 1,
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LeftArrow color={theme.text} width={14} height={14} />
        </TouchableOpacity>
      </View>
      {item?.media_type === "video" ? (
        <>
          <Video
            ref={videoRef}
            onBuffer={onBuffer}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            source={{
              uri: item?.media,
            }}
            autoPlay={true}
            repeat={true}
            resizeMode={"contain"}
            muted={false}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              borderRadius: 3,
            }}
            playInBackground={false}
            paused={!isFocused || tabPaused === true}
            controls={false}
            poster={item?.thumbnail}
            posterResizeMode={"contain"}
            hideShutterView={true}
            // onEnd={() => navigation.navigate()}
          />
          <View
            style={{
              position: "absolute",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              top: 0,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {opacity ? (
              <ActivityIndicator animating={opacity} size={"large"} />
            ) : (
              <TouchableOpacity
                style={{
                  height: 200,
                  width: 200,
                  // marginBottom: 100,
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
            )}
            {/* <ProgressBar
              width={Dimensions.get("screen").width}
              height={3}
              borderWidth={0}
              unfilledColor={"#fff"}
              //indeterminateAnimationDuration={1000}88888888
              style={{
                position: "absolute",
                bottom: 30,
                opacity: opacity,
              }}
              color='#5E72E4'
              indeterminate={true}
            /> */}
          </View>
        </>
      ) : (
        <FastImage
          source={
            // require('../Assets/avatar.jpg')
            {
              uri: item?.media,
            }
          }
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          resizeMode={"contain"}
        />
      )}
    </View>
  );
};

export default MediaForChat;
