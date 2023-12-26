import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  onTop,
  likeMini,
  fetchMinis,
  userFollow,
  GetCountry,
  fetchComments,
  subscribeMini,
  fetchPublicMinis,
  fetchPaginatedMinis,
  fetchPublicPaginatedMinis,
  fetchPaginatedSubscribedMinis,
} from "../Store/Actions/minis";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, View, ActivityIndicator, AppState } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { _getToken, interStitialAdsWithInAppSHOW } from "../Utils/helpers";
import MinisVideos from "../Screens/MinisVideos";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { fetchOtherProfile, fetchProfile } from "../Store/Actions/profile";

const { height, width } = Dimensions.get("window");

const MinisVideosContainer = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [tabPaused, setTabPaused] = useState(false);
  const [isTabPaused, setIsTabPaused] = useState(false);
  const [isTabFocused, setIsTabFocused] = useState(false);
  const [selectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("trending");
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentActiveCell = useRef();

  const cellsRef = useRef({});

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const isFocused = useIsFocused();

  const minisData =
    activeTab === "trending"
      ? useSelector((state) => state?.minis)
      : activeTab === "follow" &&
        useSelector((state) => state?.subscribe?.subscribeMinis);

  const { data, isBlocked } = useSelector(({ user }) => user);
  const totalPages =
    activeTab === "trending"
      ? useSelector((state) => state?.minis?.totalPages)
      : activeTab === "follow" &&
        useSelector((state) => state?.subscribe?.totalPages);

  const { guestUser } = useSelector((state) => state?.guestUser?.guestUser);
  const ownerCountry = useSelector((e) => e.profile?.ownerCountry);

  useFocusEffect(
    useCallback(() => {
      setIsTabFocused(isFocused);
      currentActiveCell.current?.setNativeProps({ paused: false });
      setIsTabPaused(false);
      return () => {
        setIsTabFocused(false);
      };
    }, [isFocused]),
  );

  useEffect(() => {
    if (guestUser) {
      dispatch(fetchPublicMinis(page));
    } else {
      dispatch(
        fetchMinis(
          { page: page, country: ownerCountry?.country },
          setRefreshing,
        ),
      );
    }
  }, [isBlocked]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabLongPress", (e) => {
      setPage(1);
      dispatch(fetchProfile());
      dispatch(subscribeMini(1));
      setActiveTab("trending");
      dispatch(onTop());
      if (guestUser) {
        dispatch(fetchPublicMinis(1));
      } else {
        dispatch(subscribeMini(1));
        dispatch(fetchMinis({ page: 1, country: ownerCountry?.country }));
      }
    });
    return unsubscribe;
  }, []);

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }
      appState.current = nextAppState;
      if (appState.current === "background") {
        currentActiveCell.current?.setNativeProps({ paused: true });
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused === false) {
      currentActiveCell.current?.setNativeProps({ paused: true });
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(GetCountry());
    if (data) {
      (async () => {
        await _getToken();
      })();
    }
  }, [data]);

  const keyExtractor = useCallback((item, index) => `$${index}`, []);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    // if (viewableItems[0].index % 10 === 0) {
    //   interStitialAdsWithInAppSHOW();
    // }

    changed.forEach((item) => {
      if (item?.index > 0 && item?.index % 20 === 0) {
        interStitialAdsWithInAppSHOW();
      }
      const cell = cellsRef.current[item.item._id];
      if (cell) {
        if (item.isViewable) {
          currentActiveCell.current = cell;
          cell.setNativeProps({ paused: false });
        } else {
          cell.setNativeProps({ paused: true });
          setIsTabPaused(false);
        }
      }
    });
  }, []);

  const [timeOut, setTimeOut] = useState(false);

  const onEndReached = () => {
    // interStitialAdsWithInAppSHOW();
    if (
      page + 1 <= totalPages &&
      timeOut === false &&
      activeTab === "trending"
    ) {
      setPage(page + 1);
      dispatch(
        fetchPaginatedMinis(
          { page: page + 1, country: ownerCountry?.country },
          minisData?.minis,
          setTimeOut,
        ),
      );
    } else if (
      page + 1 <= totalPages &&
      timeOut === false &&
      activeTab === "follow"
    ) {
      setPage(page + 1);
      dispatch(
        fetchPaginatedSubscribedMinis(
          { page: page + 1 },
          minisData,
          setTimeOut,
        ),
      );
    } else if (page + 1 <= totalPages && timeOut === false && guestUser) {
      setPage(page + 1);
      dispatch(
        fetchPublicPaginatedMinis(
          { page: page + 1 },
          minisData?.minis,
          setTimeOut,
        ),
      );
    }
  };

  const followHandler = (id) => {
    const body = {
      following_id: id,
    };
    dispatch(userFollow(body, null, false));
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

  const fetchOtherProfileHandler = (id) => {
    dispatch(fetchOtherProfile(id));
  };
  const onRefresh = () => {
    setLoadingMorePosts(true);
    dispatch(fetchMinis({ page: 1, country: ownerCountry?.country }));
    dispatch(subscribeMini());
    setLoadingMorePosts(false);
  };

  const onPressPaused = () => {
    if (currentActiveCell.current) {
      setIsTabPaused(true);

      currentActiveCell.current?.setNativeProps({
        paused: true,
      });
    }
  };
  const onPressPlay = () => {
    if (currentActiveCell.current) {
      setIsTabPaused(false);

      currentActiveCell.current?.setNativeProps({
        paused: false,
      });
    }
  };

  const onPressSearch = () => {
    if (currentActiveCell.current) {
      setIsTabPaused(!isTabPaused);
      currentActiveCell.current?.setNativeProps({
        paused: !isTabPaused,
      });
      navigation.navigate(NAVIGATION_ROUTES.SEARCH);
    }
  };

  const onPressNotification = () => {
    if (currentActiveCell.current) {
      setIsTabPaused(!isTabPaused);
      currentActiveCell.current?.setNativeProps({
        paused: !isTabPaused,
      });
      navigation.navigate(NAVIGATION_ROUTES.NOTIFICATON);
    }
  };

  return !refreshing ? (
    <MinisVideos
      onPressSearch={onPressSearch}
      onPressNotification={onPressNotification}
      ref={cellsRef}
      currentActiveCell={currentActiveCell}
      onEndReached={onEndReached}
      displayWidth={width}
      displayHeight={height}
      isTabFocused={isTabFocused}
      selectedIndex={selectedIndex}
      followHandler={followHandler}
      likeHandler={likeHandler}
      fetchCommentsHandler={fetchCommentsHandler}
      fetchOtherProfileHandler={fetchOtherProfileHandler}
      videoRef={videoRef}
      isFocused={isFocused}
      isTabPaused={isTabPaused}
      tabPaused={tabPaused}
      setTabPaused={setTabPaused}
      navigation={navigation}
      setPage={setPage}
      width={width}
      height={height}
      minisData={activeTab === "trending" ? minisData?.minis : minisData}
      keyExtractor={keyExtractor}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onRefresh={onRefresh}
      loadingMorePosts={loadingMorePosts}
      subscribe={false}
      onPressPaused={onPressPaused}
      onPressPlay={onPressPlay}
    />
  ) : (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: height - 200,
        }}
        size={"large"}
        color={"#fff"}
      />
    </View>
  );
};

export default React.memo(MinisVideosContainer);
