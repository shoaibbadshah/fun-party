import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchMinis,
  subscribeMini,
  fetchPaginatedMinis,
  likeMini,
  userFollow,
  fetchPaginatedSubscribedMinis,
  removeData,
  nearMini,
} from "../Store/Actions/minis";
import { Alert, Dimensions, View } from "react-native";
import FeedRow from "../Components/FeedRow";
import MinisVideos from "../Screens/MinisVideos";
import { useIsFocused } from "@react-navigation/native";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";

const SubscribeMiniVideosContainer = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [tabPaused, setTabPaused] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

  const { height, width } = Dimensions.get("window");

  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const isFocused = useIsFocused();
  const minisData = useSelector((state) => state?.subscribe?.subscribeMinis);

  console.log(
    "🚀 ~ file: SubscribeMiniVideosContainer.js:35 ~ SubscribeMiniVideosContainer ~ minisData:",
    minisData,
  );
  const totalPages = useSelector((state) => state?.subscribe?.totalPages);

  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);

  useEffect(() => {
    dispatch(subscribeMini());
    // dispatch(nearMini());
  }, []);

  useEffect(() => {
    let secondLastIndex = minisData?.length && minisData?.length - 8;
    if (minisData?.length && selectedIndex > secondLastIndex) {
      fetchPaginatedMinisHandler();
    }
  }, [selectedIndex]);

  const fetchPaginatedMinisHandler = () => {
    setPage(page + 1);
    if (page + 1 <= totalPages) {
      dispatch(fetchPaginatedSubscribedMinis(page + 1, minisData));
    }
  };

  const keyExtractor = useCallback((item, index) => `$${index}`, []);

  const onViewableItemsChanged = useRef((viewableItems) => {
    setSelectedIndex(viewableItems.changed[0].index);
  });

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

  const fetchCommentsHandler = (id) => {
    dispatch(fetchComments(id));
  };
  const onRefresh = () => {
    setLoadingMorePosts(true);
    dispatch(fetchMinis(1));
    setLoadingMorePosts(false);
  };

  const backToLogin = () => {
    dispatch(removeData(navigation, "signup"));
  };

  const backToSignup = () => {
    dispatch(removeData(navigation, "signup"));
  };

  const guestHandle = () => {
    dispatch(removeData(navigation));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <FeedRow
          displayWidth={width}
          displayHeight={height}
          item={item}
          index={index}
          selectedIndex={selectedIndex}
          followHandler={followHandler}
          likeHandler={likeHandler}
          fetchCommentsHandler={fetchCommentsHandler}
          videoRef={videoRef}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          isFocused={isFocused}
          tabPaused={tabPaused}
          setTabPaused={setTabPaused}
          navigation={navigation}
          subscribe={true}
        />
      </View>
    );
  };
  return (
    <>
      {guestUser ? (
        guestHandle()
      ) : (
        <MinisVideos
          width={width}
          height={height}
          minisData={minisData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subscribe={true}
          onRefresh={onRefresh}
          loadingMorePosts={loadingMorePosts}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default SubscribeMiniVideosContainer;
