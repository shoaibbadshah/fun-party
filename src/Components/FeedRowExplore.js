import React, { useEffect, useRef, useState } from "react";
import {
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
import FeedSidebarExplore from "./FeedSidebarExplore";
import FeedFooterExplore from "./FeedFooterExplore";
import { SendNewSvg } from "../Assets/Svgs";
// import socketServcies from "../Utils/socketServcie";
// import { store } from "../Store/store";

const FeedRowExplore = ({
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
}) => {
  const snapHeight = isExplore ? 75 : isIos ? 65 : 55;
  const user = store.getState().user;
  const theme = useSelector((state) => state.theme);
  const commentsData = useSelector((state) => state?.comments);
  const [commentText, setCommentText] = useState("");

  // const user = store.getState().user;
  // socketServcies.emit("mini", {
  //   user_id: user.data?.checkUser?._id,
  //   mini_id: item._id,
  const refRBSheetComponent = useRef();
  // });
  const dispatch = useDispatch();
  const openSheetComment = (itemId) => {
    dispatch(fetchComments(itemId));
    refRBSheetComponent.current.open();
  };

  return (
    // <KeyboardAvoidingView
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <View key={index}>
      <FeedSidebarExplore
        index={index}
        item={item}
        likeHandler={likeHandler}
        setPage={setPage}
        isExplore={isExplore}
        selectedIndex={selectedIndex}
      />

      <VideoComponent
        displayWidth={displayWidth}
        displayHeight={displayHeight - snapHeight}
        item={item}
        selectedIndex={selectedIndex}
        index={index}
        videoRef={videoRef}
        isFocused={isFocused}
        tabPaused={tabPaused}
        setTabPaused={setTabPaused}
        isExplore={isExplore}
      />

      <FeedFooterExplore
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

          <TouchableOpacity style={{ bottom: 5 }}>
            {/* <Ionicons
              name={theme?.name === "light" ? "send-outline" : "send"}
              color={"#cbc9c9"}
              size={32}
            /> */}
            <SendNewSvg size={28} color={"#cbc9c9"} />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
    // {/* </KeyboardAvoidingView> */}
  );
};

export default React.memo(FeedRowExplore);
