import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Alert,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity as ITouchableOpacity,
} from "react-native";
import Share from "react-native-share";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  fetchUserLv,
  fetchProfile,
  fetchUserMinis,
  blockUserAccount,
  fetchOtherUserLv,
  fetchUserSavedMinis,
  fetchOtherUserMinis,
  fetchUserMentionMinis,
  fetchUserFollowersAndFollowing,
  fetchOtherUserFollowersAndFollowing,
  fetchUserSavedLongVideoAction,
  fetchUserContacts,
  fetchPaginatedUserMinis,
  fetchPaginatedOtherUserMinis,
} from "../Store/Actions/profile";
import { userFollow, userFollowing } from "../Store/Actions/minis";
import Play from "../Assets/Play";
import Text from "../Components/Text";
import { store } from "../Store/store";
import Menu from "../Components/Profile/Menu";
import { createRoomAction } from "../Store/Actions/chat";
import LeftArrow from "../Utils/Assets/Icons/LeftArrow";
import ShareComponent, { generateLink } from "../Components/ShareComponent";
import TouchableOpacity from "../Components/TouchableOpacity";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";

import fetchInsights from "../Store/Reducers/insightReducer";

import {
  calculateAge,
  checkImageUrl,
  convertMentionsToPlainText,
  countFormatter,
  onShareLink,
} from "../Utils/helpers";
import SvgMessage, {
  CakeSvg,
  EditProfileSvg,
  GenderSvg,
  GiftSvg,
  InviteUSerSvg,
  LocationNewSvg,
  MobileNotchSvg,
  SaveNewSvg,
  SvgMessageFill,
  TvSvg,
} from "../Assets/Svgs";
import { navigate } from "../Utils/Navigation/navigationRef";
import moment from "moment/moment";
import MoreVideos from "../Components/LongVideosComp/MoreVideos";
import { API } from "../Api";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
export const handleQR = async (id) => {
  const from = "profile";
  const getLink = await generateLink({ from, id });
  console.log("🚀 ~ file: Profile.js:83 ~ handleQR ~ getLink:", getLink);

  navigate(NAVIGATION_ROUTES.QR_CODE, {
    image: getLink,
  });
};
const { width } = Dimensions.get("screen");
const Profile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const screenName = route?.params?.item?.screenName;

  // const [page] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minisloading, setMinisLoading] = useState(true);
  const [miniArrauy, setMiniArrauy] = useState([]);
  const [longSavedVideos, setLongSavedVideos] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [selectedTab, setselectedTab] = useState("minis");
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(route?.params?.item?.item);

  const user = store.getState().user;
  const theme = useSelector((e) => e.theme);
  const lvVideos = useSelector((e) => e.longVideos);
  const dataProfile = useSelector((e) => e.profile?.profile);
  const userMinisSelfData = useSelector((state) => state.userMinis);
  const userSavedMinis = useSelector((state) => state?.userSavedMinis);
  const userSavedLongVideos = useSelector((state) => state?.userSavedMinis);

  const otherUserMinisData = useSelector((state) => state.otherUserMinis);
  // const { data } = await API.v1.Profile.fetchOtherProfile(userID);
  // let data = null;
  // useEffect(async () => {
  //   const otherUser =
  //     screenName === "OtherProfile" &&
  //     (await API.v1.Profile.fetchOtherProfile(route?.params?.item?.item?._id));
  //   data = screenName === "OtherProfile" ? otherUser?.data?.data : dataProfile;

  //   console.log(
  //     "🚀 ~ file: Profile.js:109 ~ useEffect ~ otherUser:",
  //     otherUser,
  //   );
  // }, [data]);
  // const data =
  // screenName === "OtherProfile"
  //   ? API.v1.Profile.fetchOtherProfile(route?.params?.item?.item?._id)
  //   : dataProfile;

  const data =
    screenName === "OtherProfile" ? route?.params?.item?.item : dataProfile;

  const refRBSheetFarward = useRef(null);
  const refRBSheet = useRef(null);
  const refRBSheetOptions = useRef(null);
  const userMinisData =
    screenName === "OtherProfile"
      ? otherUserMinisData?.otherUserMinis
      : userMinisSelfData?.userMinis;
  const userFollowerFollowingData = useSelector(
    (state) => state.userFollowerFollowing,
  );
  const onEndReachedHandle = () => {
    if (otherUserMinisData?.totalPages > page) {
      setPage(page + 1);
      dispatch(
        fetchPaginatedOtherUserMinis(
          page + 1,
          otherUserMinisData?.otherUserMinis,
        ),
      );

      // dispatch(fetch(page + 1, minis));
    }
  };

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ",
      s: "Just now",
      ss: "%d s  ",
      m: "1m ago",
      mm: "%dm ago",
      h: "1hr ago",
      hh: "%dhr ago ",
      d: "1d ago",
      dd: "%dd ago",
      M: "1M ago",
      MM: "%dM ago ",
      y: "1y ago",
      yy: "%dy ago ",
    },
  });

  useEffect(() => {
    setProfileData(
      route?.params?.item?.item?.is_followed ? "following" : "Follow",
    );
    setMiniArrauy(userMinisData);
    if (screenName !== "OtherProfile") {
      dispatch(fetchUserLv(page, setLoading)); //long videos instead of mentions
      dispatch(fetchProfile());
      dispatch(fetchUserMinis(page, setLoading, setMinisLoading));
      dispatch(fetchUserMentionMinis());
      dispatch(fetchUserSavedMinis(setLoading, setMinisLoading));
      dispatch(fetchUserSavedLongVideoAction(setMinisLoading));
      dispatch(fetchUserFollowersAndFollowing());
      dispatch(fetchUserContacts());
    } else {
      dispatch(
        fetchOtherUserMinis(
          page,
          { user_id: data?._id },
          setLoading,
          setMinisLoading,
        ),
      );
      dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
      dispatch(fetchOtherUserLv(page, { user_id: data?._id }, setLoading)); //long videos instead of mentions
    }
  }, [data?._id]);

  useEffect(() => {
    setMiniArrauy(userMinisData);
    setselectedTab("minis");
  }, [userMinisData]);
  // }, [isFocused]);

  const tagPress = async (text) => {
    const regex = /\((.*?)\)/;
    const match = text.match(regex);
    if (match !== null) {
      const userID = match[1];
      try {
        const { data } = await API.v1.Profile.fetchOtherProfile(userID);
        navigate(
          userID === user.data?.checkUser?._id
            ? navigate(NAVIGATION_ROUTES.PROFILE)
            : navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
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
  const keyExtractor = useCallback((item, index) => `$${index}`, []);
  const keyExtractorLong = useCallback((item, index) => `$${index}`, []);

  const handleFollow = async () => {
    if (profileData === "following") {
      const body = {
        following_id: data?._id,
      };
      dispatch(userFollowing(body, setProfileData, setLoadingFollow));
      data.follower_count = data.follower_count > 0 && data.follower_count - 1;
    } else {
      const body = {
        following_id: data?._id,
      };
      dispatch(userFollow(body, setProfileData, setLoadingFollow, false));
      data.follower_count = data.follower_count + 1;
    }
    dispatch(fetchOtherUserFollowersAndFollowing(data?._id));
  };

  const handleProfileShare = () => {
    refRBSheet.current.open();
  };

  const handleShareCLose = async () => {
    refRBSheet.current.close();
  };

  const createRoomHandler = () => {
    const body = {
      sender: user?.data?.checkUser?._id,
      receiver: data?._id,
    };
    dispatch(createRoomAction(body, navigation, data));
  };

  const playHandle = (item) => {
    item?.is_long
      ? navigate(NAVIGATION_ROUTES.LONG_VIDEOS_DETAIL, {
          item: item,
          screenName:
            item?.created_by?._id !== user.data?.checkUser?._id
              ? "OtherProfile"
              : null,
        })
      : navigation.navigate(NAVIGATION_ROUTES.EXPLORE, {
          miniArrauy: miniArrauy,
          mini: item,
        });

    // navigate(NAVIGATION_ROUTES.MINI_PLAY, {
    //     item: item,
    //     screenName: screenName,
    //     from: selectedTab,
    //   });
  };
  const renderItem = (props) => {
    const playItem = props?.item;
    return (
      <>
        <ITouchableOpacity
          style={{
            position: "relative",
            width: width / 3.1,
            height: 180,
            // display: playItem?.is_long ? 'none' : 'flex',
            backgroundColor: "#121215",
            margin: 2,
            borderRadius: 9,
          }}
          onPress={() => playHandle(playItem)}
        >
          <Image
            source={
              playItem?.thumbnail
                ? { uri: playItem?.thumbnail }
                : require("../Assets/story.png")
            }
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 9,
            }}
            resizeMode='cover'
          />
          <View style={{ position: "absolute", bottom: 5, left: 5 }}>
            <Play />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 5,
              }}
            >
              {playItem?.views_count} view
            </Text>
          </View>
        </ITouchableOpacity>
      </>
    );
  };

  const renderItemLongVideo = ({ item }) => {
    const caption = item?.caption ? item?.caption : "#Shareslate";

    const words = caption.split(" ");
    return (
      <ITouchableOpacity
        style={{
          marginLeft: 5,
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          width: "90%",
        }}
        onPress={() => {
          playHandle(item);
        }}
      >
        <Image
          source={
            item?.thumbnail
              ? { uri: item?.thumbnail }
              : require("../Assets/story.png")
          }
          style={{
            width: "40%",
            height: 105,
            borderRadius: 9,
          }}
          resizeMode='cover'
        />
        <View style={{ width: "70%" }}>
          {/* <Text style={{ marginRight: 30, margin: 5, color: theme.text1 }}>
            {item?.caption}
          </Text> */}
          <Text style={{ marginRight: 30, margin: 5, color: theme.text }}>
            {words.map((word, index) => {
              if (word.startsWith("#")) {
                return (
                  <Text
                    onPress={() => {
                      navigate(NAVIGATION_ROUTES.SEARCH, {
                        hashTag: convertMentionsToPlainText(word),
                      });
                    }}
                    key={index}
                    style={styles.hashtagText}
                  >
                    {" "}
                    {convertMentionsToPlainText(word)}{" "}
                  </Text>
                );
              }
              if (word.startsWith("@")) {
                return (
                  <Text
                    onPress={() => {
                      tagPress(word);
                    }}
                    key={index}
                    style={styles.hashtagText}
                  >
                    {convertMentionsToPlainText(word)}{" "}
                  </Text>
                );
              } else {
                return (
                  <Text
                    key={index}
                    style={[
                      styles.footerDescriptionText,
                      { color: theme.text },
                    ]}
                  >
                    {convertMentionsToPlainText(word)}
                  </Text>
                );
              }
            })}
            {/* {'\n'} */}
          </Text>
          <Text
            style={{ fontWeight: "bold", color: theme.text, marginLeft: 5 }}
          >
            {item?.created_by?.first_name + " " + item?.created_by?.last_name}
          </Text>
          <Text style={{ margin: 5, color: theme.text1 }}>
            {countFormatter(item?.views_count)} Views{" "}
            {moment(new Date(item?.createdAt)).fromNow()}
          </Text>
        </View>
      </ITouchableOpacity>
    );
  };

  const otherMenu = () => {
    refRBSheetOptions.current.open();
  };

  const handleMenu = () => {
    refRBSheetFarward.current.handleMenu();
  };
  const renderHeader = () => {
    return (
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                // source={{ uri: checkImageUrl(data?.profile_image) }}
                source={{
                  uri: checkImageUrl(
                    data?.profile_image,
                    `https://ui-avatars.com/api/?background=random&name=${data?.first_name}+${data?.last_name}`,
                  ),
                }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  resizeMode: "contain",
                }}
              />
              <View style={{ paddingHorizontal: 12 }}>
                <Text style={{ color: theme.text }}>
                  @{data?.user_name?.toLowerCase()}
                </Text>

                <ITouchableOpacity
                  style={[
                    styles.angleRight,
                    { transform: [{ rotate: open ? "90deg" : "0deg" }] },
                  ]}
                  onPress={() => setOpen(!open)}
                >
                  <FontAwesome name='angle-right' size={20} color='white' />
                </ITouchableOpacity>
              </View>
              <MaterialCommunityIcons
                onPress={() => handleQR(data?._id)}
                name='qrcode-scan'
                size={20}
                color={theme.text}
              />
            </View>
            <Entypo
              name='dots-three-horizontal'
              size={22}
              color={theme.text}
              style={{ paddingRight: 12 }}
              onPress={screenName === "OtherProfile" ? otherMenu : handleMenu}
            />
          </View>

          <Menu ref={refRBSheetFarward} />

          {open && (
            <View style={{ marginLeft: 22, marginTop: 25 }}>
              <Text
                style={[
                  styles.bioCard,
                  {
                    display: data?.date_of_birth ? "flex" : "none",
                    paddingBottom: 10,
                  },
                ]}
              >
                {/* <FontAwesome name='birthday-cake' size={18} />  */}
                <CakeSvg size={18} color={"white"} /> Age:{" "}
                {data?.date_of_birth
                  ? calculateAge(data?.date_of_birth)
                  : "Not specified"}
              </Text>

              <View style={{ marginTop: 5 }}>
                <Text
                  style={{
                    display: data?.gender ? "flex" : "none",
                    // paddingTop: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <FontAwesome name='transgender' size={18} />  */}
                  <GenderSvg size={18} color={"white"} />
                  Gender: {data?.gender ? data?.gender : "Not specified"}
                </Text>
              </View>
              <Text
                style={{
                  // display: !data?.address?.city === 'undefined' ? 'flex' : 'none',
                  top: 5,
                }}
              >
                {/* <Entypo name='location' size={18} /> Location:{" "} */}
                <LocationNewSvg size={17} color={"white"} /> Location:{" "}
                {/* {data?.address?.city + ', ' + data?.address?.country} */}
                {data?.address?.city !== "undefined" &&
                data?.address?.city !== undefined
                  ? data?.address?.city +
                    `${data?.address?.city && ", "}` +
                    data?.address?.country
                  : "Not specified"}
                {/* {!data?.address?.city === 'undefined'
                ? data?.address?.city + ', ' + data?.address?.country
                : data?.address} */}
              </Text>
            </View>
          )}

          <View
            style={{
              width: "78%",
              marginTop: 35,
              display: data?.user_bio ? "flex" : "none",
            }}
          >
            <Text numberOfLines={0} style={{ fontSize: 12 }}>
              {data?.user_bio}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: screenName === "OtherProfile" ? "40%" : "55%",
                height: 35,
                // paddingHorizontal: screenName === "OtherProfile" ? 15 : 45,
                padding: 0,
                borderRadius: 52,
                elevation: 0,
                backgroundColor: "#5E72E4",
              }}
              onPress={() =>
                screenName === "OtherProfile"
                  ? handleFollow()
                  : navigation.navigate(NAVIGATION_ROUTES.EDIT_PROFILE, {
                      profileData: data,
                    })
              }
            >
              {loadingFollow ? (
                <ActivityIndicator color={"white"} size={15} />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {screenName === "OtherProfile" ? (
                    <Feather
                      name='user-plus'
                      size={22}
                      color='white'
                      style={{ marginRight: 12 }}
                    />
                  ) : (
                    // <Feather
                    //   name='edit'
                    //   size={18}
                    //   color={"white"}
                    //   style={{ marginRight: 5 }}
                    // />
                    <View style={{ marginRight: 5 }}>
                      <EditProfileSvg size={18} color={"white"} />
                    </View>
                  )}
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {screenName === "OtherProfile"
                      ? profileData === "following"
                        ? "Following"
                        : data?.following?.includes(dataProfile?._id)
                        ? "Follow back"
                        : "Follow"
                      : "Edit"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {screenName === "OtherProfile" && (
              <>
                <TouchableOpacity noBg>
                  <Fontisto
                    name='share-a'
                    size={30}
                    color='white'
                    onPress={handleProfileShare}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={createRoomHandler} noBg>
                  {/* <Feather
                    name='message-circle'
                    color='grey'
                    size={30}
                    onPress={createRoomHandler}
                  /> */}
                  <SvgMessageFill color={"white"} height={30} width={30} />
                  {/* <SvgMessage color={"white"} height={30} width={30} /> */}
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
              }}
              noBg
              style={{
                flexDirection: "row",
                alignItems: "center",
                // display: "none",
              }}
            >
              <GiftSvg height={38} width={38} />
              {/* <Feather
              onPress={() => {
                navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
              }}
              name='gift'
              size={26}
              color="grey"
              style={{ marginRight: 10 }}
            /> */}
              {/* {screenName !== 'OtherProfile' && (
              <Text style={{ fontSize: 17 }}>80</Text>
            )} */}
            </TouchableOpacity>
            {screenName !== "OtherProfile" && (
              <TouchableOpacity
                onPress={async () => {
                  // InviteUser();
                  await onShareLink();
                }}
                noBg
              >
                {/* <Feather
                  name='user-plus'
                  size={25}
                  color={theme.text}
                  onPress={async () => {
                    // InviteUser();
                    await onShareLink();
                  }}
                /> */}
                <InviteUSerSvg size={24} color={"white"} />
              </TouchableOpacity>
            )}

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
                mini_id={data?._id}
                onSubmit={handleShareCLose}
                getRef={(c) => setProductQRref(c)}
                from={"profile"}
              />
            </RBSheet>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              noBg
              style={{
                borderRadius: 30,
              }}
              onPress={() =>
                navigation.navigate(NAVIGATION_ROUTES.FOLLOWING, {
                  followerScreen: {
                    followData: {
                      Following: userFollowerFollowingData?.userFollowing,
                      Follower: userFollowerFollowingData?.userFollower,
                    },
                    ProfileDataParam: data,
                    ScreenName: "Following",
                  },
                })
              }
            >
              <Text
                style={{
                  fontSize: 18,
                  marginVertical: 10,
                  fontWeight: "800",
                }}
              >
                {Math.abs(data?.following_count)}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: theme.textGrey,
                }}
              >
                Following{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              noBg
              style={{
                borderRadius: 30,
              }}
              onPress={() =>
                navigation.navigate(NAVIGATION_ROUTES.FOLLOWER, {
                  followerScreen: {
                    followData: {
                      Following: userFollowerFollowingData?.userFollowing,
                      Follower: userFollowerFollowingData?.userFollower,
                    },
                    ProfileDataParam: data,
                    ScreenName: "Follower",
                  },
                })
              }
            >
              <Text
                style={{
                  fontSize: 18,
                  marginVertical: 10,
                  fontWeight: "800",
                }}
              >
                {Math.abs(data?.follower_count)}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: theme.textGrey,
                }}
              >
                Followers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              noBg
              disable
              style={{
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginVertical: 10,
                  fontWeight: "800",
                }}
              >
                {userMinisData?.length}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: theme.textGrey,
                }}
              >
                Minis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              noBg
              disable
              style={{
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginVertical: 10,
                  fontWeight: "800",
                }}
              >
                {/* {userMinisData?.length} */}
                {lvVideos?.lvMinis?.length}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: theme.textGrey,
                }}
              >
                Videos
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================= tabs ============================= */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginTop: 33,
            justifyContent: "space-around",
            // borderBottomWidth: 1,
            // borderBottomColor: "lightgrey",
          }}
        >
          <ITouchableOpacity
            noBg
            onPress={() => {
              setMiniArrauy(userMinisData);
              setselectedTab("minis");
            }}
            style={[styles.tabs]}
          >
            {/* <Octicons
              name='device-mobile'
              size={22}
              color={selectedTab === "minis" ? theme.secondary : "#E0E0E0"}
            /> */}
            <MobileNotchSvg size={22} color={"white"} />
          </ITouchableOpacity>

          {screenName !== "OtherProfile" && (
            <>
              {/* <ITouchableOpacity
              noBg
              onPress={() => {
                setMiniArrauy(userMinisData);
                setselectedTab('minis');
              }}
              style={[
                styles.tabs,
                {
                  borderBottomWidth: selectedTab === 'like' ? 2 : 0,
                  borderBottomColor: theme.secondary,
                },
              ]}
            >
              <EvilIcons name="like" size={35} />
            </ITouchableOpacity> */}
              <ITouchableOpacity
                noBg
                onPress={() => {
                  setMiniArrauy(userSavedMinis?.userSavedMinis.slice(0, 3));
                  setLongSavedVideos(
                    userSavedLongVideos?.userSavedLongVideos.slice(0, 2),
                  );
                  setselectedTab("saved");
                }}
                style={[styles.tabs]}
              >
                {/* <Ionicons name='bookmark-outline' size={25} color={"#E0E0E0"} /> */}
                <SaveNewSvg
                  size={25}
                  color={selectedTab === "saved" ? theme.secondary : "#E0E0E0"}
                />
              </ITouchableOpacity>
            </>
          )}

          <ITouchableOpacity
            noBg
            onPress={() => {
              if (screenName !== "OtherProfile") {
                setMiniArrauy(lvVideos?.lvMinis);
              } else {
                setMiniArrauy(lvVideos?.lvOtherMinis);
              }
              setselectedTab("mentioned");
              setNumColumns(1);
            }}
            style={[styles.tabs]}
          >
            {/* <MaterialIcons
              name='video-collection'
              size={25}
              color={"#E0E0E0"}
            /> */}
            <TvSvg
              height={30}
              width={30}
              color={selectedTab === "mentioned" ? theme.secondary : "#E0E0E0"}
            />
          </ITouchableOpacity>
        </View>
      </View>
    );
  };

  const handleBlock = async () => {
    refRBSheetOptions.current.close();
    Alert.alert("Block User", "Are you sure you want to block this user?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          dispatch(blockUserAccount({ block_user: data?._id })), setPage(1);
        },
      },
    ]);
  };

  const footerRender = () => {
    return (
      <>
        {selectedTab === "saved" &&
        userSavedMinis?.userSavedMinis?.length > 3 ? (
          <TouchableOpacity
            noBg
            style={{
              width: "90%",
              borderWidth: 2,
              borderColor: theme.text1,
              borderRadius: 20,
              alignSelf: "center",
              marginVertical: 12,
            }}
            onPress={() =>
              miniArrauy?.length == userSavedMinis?.userSavedMinis?.length
                ? setMiniArrauy(userSavedMinis?.userSavedMinis.slice(0, 3))
                : setMiniArrauy(userSavedMinis?.userSavedMinis)
            }
          >
            <Text style={{ fontWeight: "600", color: theme.text1 }}>
              {miniArrauy?.length == userSavedMinis?.userSavedMinis?.length
                ? "Hide"
                : "See All"}
            </Text>
          </TouchableOpacity>
        ) : null}
        {selectedTab === "saved" && longSavedVideos ? (
          <FlatList data={longSavedVideos} renderItem={renderItemLongVideo} />
        ) : null}
        {selectedTab === "saved" &&
        userSavedLongVideos?.userSavedLongVideos?.length > 3 ? (
          <TouchableOpacity
            noBg
            style={{
              width: "90%",
              borderWidth: 2,
              borderColor: theme.text1,
              borderRadius: 20,
              alignSelf: "center",
              marginVertical: 12,
            }}
            onPress={() =>
              longSavedVideos?.length ==
              userSavedLongVideos?.userSavedLongVideos?.length
                ? setLongSavedVideos(
                    userSavedLongVideos?.userSavedLongVideos?.slice(0, 2),
                  )
                : setLongSavedVideos(userSavedLongVideos?.userSavedLongVideos)
            }
          >
            <Text style={{ fontWeight: "600", color: theme.text1 }}>
              {longSavedVideos?.length ==
              userSavedLongVideos?.userSavedLongVideos?.length
                ? "Hide"
                : "See All"}
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const styles = useStyles(theme);
  const [numColumns, setNumColumns] = useState(3);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
      }}
    >
      {!data || loading ? (
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={theme.secondary}
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        />
      ) : (
        <View>
          <StatusBar barStyle={theme.statusbar} />

          {screenName === "OtherProfile" ? (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ITouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LeftArrow color={theme.text} width={16} height={16} />
                </ITouchableOpacity>
                <Text
                  onPress={() => navigation.goBack()}
                  style={{
                    color: theme.text1,
                    fontSize: 18,
                    //fontWeight: '900',
                  }}
                >
                  {data?.first_name} {data?.last_name}
                </Text>
                <View style={{ width: 30 }} />
              </View>

              {screenName !== "OtherProfile" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "flex-end",
                    alignContent: "center",
                  }}
                >
                  <TouchableOpacity
                    noBg
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      navigation.navigate(NAVIGATION_ROUTES.SEARCH);
                    }}
                  >
                    <Ionicons
                      name={"search-outline"}
                      size={26}
                      color={theme.text}
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                  noBg
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    handleProfileShare();
                  }}
                >
                  <Ionicons
                    name={'share-social-outline'}
                    size={26}
                    color={theme.text}
                  />
                </TouchableOpacity> */}
                  {/* <TouchableOpacity
                  noBg
                  onPress={() => refRBSheetOptions.current.open()}
                >
                  <Ionicons
                    name={'options-outline'}
                    size={26}
                    color={theme.text}
                  />
                </TouchableOpacity> */}
                </View>
              )}
            </View>
          ) : null}

          <RBSheet
            ref={refRBSheetOptions}
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
            <TouchableOpacity
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
              noBg
              onPress={handleBlock}
            >
              <AntDesign
                name={"deleteuser"}
                size={22}
                color={theme.textColor}
              />
              <Text style={{ paddingLeft: 15, color: theme.text }}>
                Block User
              </Text>
            </TouchableOpacity>
          </RBSheet>

          {screenName === "OtherProfile" &&
          data?.privacy_setting?.private_account ? (
            <View
              style={{
                margin: 30,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: "10%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.button,
              }}
            >
              <Text style={{ color: theme.text1, fontWeight: "600" }}>
                This is a Private Profile
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginVertical: 4,
                  fontWeight: "500",
                }}
              >
                Follow this profile to see there content and iformation. Admin
                approval required.
              </Text>
              <Text
                style={{
                  display: "none",
                  fontSize: 14,
                  fontWeight: "600",
                  color: theme.secondary,
                }}
              >
                Learn more
              </Text>
            </View>
          ) : selectedTab === "mentioned" ? (
            <>
              {/* {loading ? (
                <ActivityIndicator
                  animating={true}
                  size={"large"}
                  color={theme.secondary}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : ( */}
              <FlatList
                key={numColumns.toString()}
                data={miniArrauy}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 12,
                }}
                ListEmptyComponent={
                  <>
                    {loading ? (
                      <View
                        style={{
                          flex: 1,
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginHorizontal: 4,
                        }}
                      >
                        {Array.from({ length: 12 }, (_, index) => (
                          <SkeletonPlaceholder
                            borderRadius={4}
                            backgroundColor='#303d5b'
                            highlightColor='#303d5b'
                          >
                            <SkeletonPlaceholder.Item
                              width={width / 3.1}
                              height={170}
                              marginVertical={2}
                              backgroundColor='#303d5b'
                              highlightColor='#303d5b'
                            />
                          </SkeletonPlaceholder>
                        ))}
                      </View>
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 75,
                          alignSelf: "center",
                        }}
                      >
                        {selectedTab === "mentioned" ? (
                          // <Ionicons name='at-outline' size={35} color={theme.text} />
                          <MaterialIcons
                            name='video-collection'
                            size={25}
                            color={theme.text}
                          />
                        ) : selectedTab === "minis" ? (
                          <Octicons
                            name='device-mobile'
                            size={35}
                            color={theme.text1}
                          />
                        ) : (
                          <Ionicons
                            name='bookmark-outline'
                            size={35}
                            color={theme.text}
                          />
                        )}
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          No content found
                        </Text>
                      </View>
                    )}
                  </>
                }
                renderItem={(props) => (
                  <MoreVideos
                    item={props?.item}
                    setItem={playHandle}
                    CurentVideo={item}
                    // moveToTop={mo}
                  />
                )}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={footerRender}
                ListFooterComponentStyle={{ width: "100%" }}
              />
              {/* // )} */}
            </>
          ) : (
            <>
              {/* {loading  ? (
                <ActivityIndicator
                  animating={true}
                  size={"large"}
                  color={theme.secondary}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : ( */}
              {/* {selectedTab === "saved" &&
                (userSavedMinis?.userSavedMinis?.length > 0 ||
                  (longSavedVideos.length > 0 && ( */}
              <FlatList
                data={miniArrauy}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 12,
                  // marginLeft: miniArrauy?.length > 2 ? 0 : 15,
                  //alignItems: miniArrauy?.length > 2 ? 'center' : 'flex-start',
                }}
                onEndReached={onEndReachedHandle}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                  <>
                    {minisloading && miniArrauy?.length == 0 ? (
                      <View
                        style={{
                          flex: 1,
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginHorizontal: 4,
                        }}
                      >
                        {Array.from({ length: 12 }, (_, index) => (
                          <SkeletonPlaceholder
                            borderRadius={4}
                            backgroundColor='#303d5b'
                            highlightColor='#303d5b'
                          >
                            <SkeletonPlaceholder.Item
                              width={width / 3.1}
                              height={170}
                              marginVertical={2}
                              backgroundColor='#303d5b'
                              highlightColor='#303d5b'
                            />
                          </SkeletonPlaceholder>
                        ))}
                      </View>
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 75,
                          alignSelf: "center",
                        }}
                      >
                        {selectedTab === "mentioned" ? (
                          // <Ionicons name='at-outline' size={35} color={theme.text} />
                          <MaterialIcons
                            name='video-collection'
                            size={25}
                            color={theme.text}
                          />
                        ) : selectedTab === "minis" ? (
                          <Octicons
                            name='device-mobile'
                            size={35}
                            color={theme.text1}
                          />
                        ) : (
                          selectedTab == "saved" &&
                          userSavedMinis?.userSavedMinis.length <= 0 &&
                          longSavedVideos.length <= 0 && (
                            <Ionicons
                              name='bookmark-outline'
                              size={35}
                              color={theme.text}
                            />
                          )
                        )}
                        {selectedTab == "saved" ? (
                          userSavedMinis?.userSavedMinis.length <= 0 &&
                          longSavedVideos.length <= 0 && (
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                              No content found
                            </Text>
                          )
                        ) : (
                          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            No content found
                          </Text>
                        )}
                      </View>
                    )}
                  </>
                }
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={footerRender}
                ListFooterComponentStyle={{ width: "100%" }}
              />

              {/* )} */}
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const useStyles = (theme) =>
  StyleSheet.create({
    tabs: {
      borderRadius: 0,
      padding: 5,
      height: 35,
      marginBottom: 5,
    },

    angleRight: {
      backgroundColor: "lightgrey",
      width: 25,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      marginTop: 5,
    },
    bioCard: {},
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
  });
