import { Alert } from "react-native";

// import Contacts from "react-native-contacts";

import { API } from "../../Api";
import { Types } from "../Types/type";
import { NAVIGATION_ROUTES } from "../../Utils/Navigation/NavigationRoutes";
import {
  updateNoficationSetting,
  updatePrivacyAction,
  updateUser,
} from "./user";
import { navigate } from "../../Utils/Navigation/navigationRef";
import { store } from "../store";
import axios from "axios";

const setProfile = (data) => {
  return {
    type: Types.FETCH_PROFILE,
    payload: { profile: data },
  };
};

const setWallet = (data) => {
  return {
    type: Types.FETCH_WALLET,
    payload: data,
  };
};

export const fetchProfile = () => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.fetchProfile();
    await dispatch(setProfile(data?.data));
  } catch (error) {}
};

export const fetchOtherProfile = (id) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.fetchOtherProfile(id);

    await dispatch({
      type: Types.FETCH_OTHER_PROFILE,
      payload: {
        otherProfile: data?.data,
      },
    });

    return data?.data;
  } catch (error) {
    return error;
  }
};

export const fetchUserMinis =
  (page, setLoading, setMinisLoading) => async (dispatch) => {
    try {
      setLoading(true);
      setMinisLoading && setMinisLoading(true);
      const { data } = await API.v1.Profile.fetchUserMini(page);

      dispatch({
        type: Types.FETCH_USER_MINIS,
        payload: {
          userMinis: data?.data?.get_minis,
          totalPages: data?.data?.totalPages,
        },
      });
      setLoading(false);
      setMinisLoading && setMinisLoading(false);
    } catch (error) {
      setLoading(false);
      setMinisLoading && setMinisLoading(false);
      console.log("🚀 ~ file: profile.js:54 ~ fetchUserMinis ~ error:", error);
    }
  };
export const fetchUserLv = (page, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await API.v1.Profile.fetchUserLv(page);
    setLoading(false);

    dispatch({
      type: Types.FETCH_LONG_VIDEOS_PROFILE,
      payload: {
        lvMinis: data?.data?.get_minis,
        lvTotalPages: data?.data?.totalPages,
      },
    });

    // dispatch({
    //   type: Types.FETCH_USER_MINIS,
    //   payload: {
    //     userMinis: data?.data?.get_minis,
    //     totalPages: data?.data?.totalPages,
    //   },
    // });
  } catch (error) {
    setLoading(false);
    console.log("🚀 ~ file: profile.js:54 ~ fetchUserMinis ~ error:", error);
  }
};

export const fetchPaginatedUserMinis =
  (page, userMinis) => async (dispatch) => {
    try {
      const { data } = await API.v1.Profile.fetchUserMini(page);
      dispatch({
        type: Types.FETCH_USER_MINIS,
        payload: {
          userMinis: [...userMinis, ...data?.data?.get_minis],
          totalPages: data?.data?.totalPages,
        },
      });
    } catch (error) {}
  };

export const fetchOtherUserMinis =
  (page, body, setLoading, setMinisLoading) => async (dispatch) => {
    dispatch({
      type: Types.FETCH_OTHER_USER_MINIS,
      payload: {
        otherUserMinis: [],
        totalPages: 1,
      },
    });
    try {
      setLoading(true);
      setMinisLoading && setMinisLoading(true);
      const { data } = await API.v1.Profile.fetchOtherUserMini(page, body);

      dispatch({
        type: Types.FETCH_OTHER_USER_MINIS,
        payload: {
          otherUserMinis: data?.data?.get_minis,
          totalPages: data?.data?.totalPages,
        },
      });

      setLoading(false);
      setMinisLoading && setMinisLoading(false);
    } catch (error) {
      setLoading(false);
      setMinisLoading && setMinisLoading(false);
    }
  };
export const fetchOtherUserLv =
  (page, body, setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      const { data } = await API.v1.Profile.fetchOtherUserLv(page, body);

      setLoading(false);

      dispatch({
        type: Types.FETCH_LONG_VIDEOS_PROFILE_OTHER,
        payload: {
          lvOtherMinis: data?.data?.get_minis,
          lvOtherTotalPages: data?.data?.totalPages,
        },
      });
    } catch (error) {
      setLoading(false);
    }
  };

export const fetchPaginatedOtherUserMinis =
  (page, userMinis) => async (dispatch) => {
    try {
      const { data } = await API.v1.Profile.fetchOtherUserMini(page);

      dispatch({
        type: Types.FETCH_OTHER_USER_MINIS,
        payload: {
          otherUserMinis: [...userMinis, ...data?.data?.get_minis],
          totalPages: data?.data?.totalPages,
        },
      });
    } catch (error) {
      console.log("🚀 ~ file: profile.js:180 ~ error:", error);
    }
  };

export const fetchUserFollowersAndFollowing =
  (setLoading) => async (dispatch) => {
    try {
      setLoading && setLoading(true);
      const { data } = await API.v1.Profile.userFollowersAndFollowings();

      dispatch({
        type: Types.FETCH_USER_FOLLOWER_FOLLOWING,
        payload: {
          userFollower: data?.get_follower_user,
          userFollowing: data?.get_following_user,
        },
      });
      setLoading && setLoading(false);
    } catch (error) {
      setLoading && setLoading(false);
    }
  };
export const fetchUserContacts = () => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.userContacts();

    dispatch({
      type: Types.FETCH_USER_CONTACTS,
      payload: data?.data,
    });
  } catch (error) {}
};

export const fetchOtherUserFollowersAndFollowing =
  (id, setLoading) => async (dispatch) => {
    try {
      setLoading && setLoading(true);
      const { data } = await API.v1.Profile.otherFollowersAndFollowings(id);

      dispatch({
        type: Types.FETCH_USER_FOLLOWER_FOLLOWING,
        payload: {
          userFollower: data?.get_follower_user,
          userFollowing: data?.get_following_user,
        },
      });
      setLoading && setLoading(false);
    } catch (error) {
      setLoading && setLoading(false);
    }
  };

export const updateProfile =
  (body, navigation, setEditLoading, token) => async (dispatch) => {
    console.log("🚀 ~ file: profile.js:234 ~ body:", body);
    try {
      setEditLoading(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await API.v1.Profile.updateProfile(body, config);
      console.log("🚀 ~ file: profile.js:237 ~ data:", data);

      setEditLoading(false);
      // await dispatch(setProfile(data?.data));
      await dispatch(fetchProfile());

      await dispatch(updateUser(data.data?.profile_image));

      navigation.goBack();
    } catch (error) {
      console.log("🚀 ~ file: profile.js:137 ~ error:", error);
      setEditLoading(false);
    }
  };
export const updatePrivacy = (body) => async (dispatch) => {
  try {
    const data = await API.v1.Profile.updatePrivacy(body);

    dispatch(
      updatePrivacyAction({ privacy_setting: data.data.data.privacy_setting }),
    );
  } catch (error) {
    console.error("error Profie_action", error.response.data);
  }
};

export const update_notification_setting = (body) => async (dispatch) => {
  try {
    const data = await API.v1.Profile.updateNoficationSetting(body);

    dispatch(
      updateNoficationSetting({
        // ...data.data.data,
        notification_setting: data.data.data.notification_setting,
      }),
    );
  } catch (error) {
    console.error("error Profie_action", error.response.data);
  }
};

export const fetchUserInvitables = () => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: true });
    const { data } = await API.v1.Profile.fetchUserInvitables();

    if (data && data.status === 200) {
      let tempData = data.data.map((u) => ({ ...u, isSelected: false }));
      dispatch({
        type: Types.FETCH_USER_INVITABLES,
        payload: tempData,
      });
    }

    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: false });
  }
};

export const onInvitableUserTap = (payload) => {
  return {
    type: Types.ON_INVITABLE_USER_TAP,
    payload,
  };
};

export const onSelectInvitableUsers = (payload) => {
  return {
    type: Types.ON_SELECT_INVITABLE_USERS,
    payload,
  };
};

export const blockUserAccount = (body) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.blockUserAccount(body);
    if (data && data.status === 200) {
      Alert.alert("Block Account", "Account has been blocked", [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: Types.IS_BLOCKED_SUCCESS,
            });
          },
        },
      ]);
    }
  } catch (error) {}
};

export const unblockUserAccount = (body) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.unblockUserAccount(body);
    if (data && data.status === 200) {
      dispatch(fetchBlockedAccounts());
      Alert.alert("Account Unblocked", "Account has been unblocked", [
        {
          text: "OK",
          onPress: () => {
            dispatch({
              type: Types.UNBLOCKED_ACCOUNT,
              payload: body.unblock_user,
            });
          },
        },
      ]);
    }
  } catch (error) {}
};

export const fetchBlockedAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: true });
    const { data } = await API.v1.Profile.fetchBlockedAccounts();
    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: false });

    if (data && data.status === 200) {
      dispatch({ type: Types.FETCH_BLOCKED_ACCOUNTS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: Types.USER_INVITABLES_LOADING, payload: false });
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_FRIEND_LIST_LOADING, payload: true });
    const { data } = await API.v1.Profile.fetchAllUsers();

    dispatch({ type: Types.USER_FRIEND_LIST_LOADING, payload: false });

    dispatch({
      type: Types.FETCH_ALL_FRIEND_LIST,
      payload: {
        friendList: data?.data?.friendLists,
      },
    });
    if (data && data.status === 200) {
      return data;
    }
  } catch (error) {
    dispatch({ type: Types.USER_FRIEND_LIST_LOADING, payload: false });
    return error;
  }
};

export const fetchUserMentionMinis = (id) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.fetchUserMentionMini(id);

    dispatch({
      type: Types.FETCH_USER_MENTION_MINIS,
      payload: {
        userMentionMinis: data?.data?.minis,
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
};

export const fetchOtherUserMentionMinis = (id) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.fetchOtherUserMentionMini(id);

    dispatch({
      type: Types.FETCH_OTHER_USER_MENTION_MINIS,
      payload: {
        otherUserMentionMinis: data?.data,
      },
    });
  } catch (error) {
    console.log(error, "other metion minis error");
  }
};

export const fetchUserSavedMinis =
  (setLoading, setMinisLoading) => async (dispatch) => {
    setLoading(true);
    setMinisLoading && setMinisLoading(true);
    try {
      const { data } = await API.v1.Profile.fetchUserSavedMini();

      dispatch({
        type: Types.FETCH_USER_SAVED_MINIS,
        payload: {
          userSavedMinis: data?.data,
        },
      });
      setLoading(false);
      setMinisLoading && setMinisLoading(false);
    } catch (error) {
      setLoading(false);
      setMinisLoading && setMinisLoading(false);
      console.log(error, "error");
    }
  };

export const fetchUserSavedLongVideoAction =
  (setMinisLoading) => async (dispatch) => {
    try {
      setMinisLoading && setMinisLoading(true);
      const { data } = await API.v1.Profile.fetchUserSavedLongVideo();
      dispatch({
        type: Types.FETCH_USER_SAVED_LONG_VIDEOS,
        payload: {
          userSavedLongVideos: data?.data,
        },
      });

      setMinisLoading && setMinisLoading(false);
    } catch (error) {
      setMinisLoading && setMinisLoading(false);
      console.log(error, "error, saved Long videos");
    }
  };

export const fetchUserWallet = (setLoading) => async (dispatch) => {
  try {
    setLoading && setLoading(true);
    const { data } = await API.v1.Profile.getUserWallet();

    await dispatch(setWallet(data?.data));
    setLoading && setLoading(false);
  } catch (error) {
    setLoading && setLoading(false);
  }
};

//authorize.net wallet
export const chargeCridetCard =
  (body, setLoading, navigation) => async (dispatch) => {
    try {
      setLoading(true);
      const data = await API.v1.Profile.chargeCridetCard(body);

      dispatch(fetchUserWallet());
      navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: profile.js:360 ~ chargeCreditCard ~ error:",
        error,
      );
      Alert.alert("Transaction Failed", error?.response?.data?.message);
      setLoading(false);
    }
  };
export const inAppPurchaseAction =
  (body, setLoading, navigation) => async (dispatch) => {
    try {
      setLoading(true);
      const data = await API.v1.Profile.capture_InAppPurchase(body);

      dispatch(fetchUserWallet());
      navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
      setLoading(false);
    } catch (error) {
      Alert.alert("Transaction Failed", error?.response?.data?.message);
      setLoading(false);
    }
  };

export const fetchUserMonthlyTransaction = (body) => async (dispatch) => {
  try {
    const { data } = await API.v1.Profile.getMonthlyTransaction(body);

    dispatch({
      type: Types.FETCH_USER_MONTHLY_TRANSACTION,
      payload: {
        monthlyTransaction: data?.data,
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: profile.js:54 ~ fetchUserMinis ~ error:", error);
  }
};
export const connectLongtoMiniAction =
  (body, setLoading, navigation, created_by) => async (dispatch) => {
    try {
      setLoading(true);
      const { data } = await API.v1.Profile.connectionMiniLong(body);

      setLoading(false);

      dispatch({
        type: Types.EDIT_MINI,
        payload: {
          _miniId: data?.data?._id,
          caption: "",
          new_mini: data?.data,
          user: created_by,
        },
      });
      navigation.navigate(NAVIGATION_ROUTES.PROFILE);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ file: profile.js:54 ~ fetchUserMinis ~ error:", error);
    }
  };

// export const SaveContactAction = () => async (dispatch) => {
//   try {
//     Contacts.getAll()
//       .then((contacts) => {
//         const phoneNumbers = contacts.map((contact) => contact.phoneNumbers);

//         const body = {
//           phone_book: phoneNumbers,
//         };
//         API.v1.Profile.contactsSave(body)
//           .then((res) =>
//             dispatch({
//               type: Types.IS_USER_ALLOW_FOR_CONTACT,
//               payload: {
//                 isUserAllow: true,
//               },
//             }),
//           )
//           .catch((error) =>
//             Alert.alert(
//               "Save Contacts Failed",
//               "your contacts did not sync yet. we ask your again",
//             ),
//           );
//       })
//       .catch((error) => {
//         console.log(error, "error contacts from phone");
//       });
//   } catch (error) {
//     console.log("🚀 ~ file: auth.js:24 ~ Save Contact ~ error:", error);
//   }
// };
