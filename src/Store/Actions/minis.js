import {Alert} from 'react-native';
import {API} from '../../Api';
import {store} from '../store';
import {Types} from '../Types/type';
import socketServcies from '../../Utils/socketServcie';
import {navigate} from '../../Utils/Navigation/navigationRef';
import {fetchOtherUserFollowersAndFollowing, fetchProfile, fetchUserFollowersAndFollowing} from './profile';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {chatCount} from './chat';

export const fetchMinis = (page, setRefreshing) => async dispatch => {
  try {
    setRefreshing && setRefreshing(true);
    const {data} = await API.v1.Minis.fetchMinis(page);
    dispatch({
      type: Types.FETCH_MINIS,
      payload: {
        minis: data?.data?.get_minis,
        totalPages: data?.data?.totalPages,
      },
    });
    setRefreshing && setRefreshing(false);
  } catch (error) {
    setRefreshing && setRefreshing(false);
  }
};

export const fetchPublicMinis = page => async dispatch => {
  try {
    const {data} = await API.v1.Minis.fetchPublicMinis(page);

    dispatch({
      type: Types.FETCH_MINIS,
      payload: {
        minis: data?.data?.get_minis,
        totalPages: data?.data?.totalPages,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:34 ~ fetchPublicMinis ~ error:', error);
  }
};
export const fetchLongVideos = (page, setLoader) => async dispatch => {
  try {
    setLoader && setLoader(true);
    const {data} = await API.v1.Minis.fetchLongVideos(page);

    dispatch({
      type: Types.FETCH_LONG_VIDEOS,
      payload: {
        minis: data?.data?.get_minis,
        totalPages: data?.data?.totalPages,
      },
    });
    setLoader && setLoader(false);
  } catch (error) {
    setLoader && setLoader(false);
    console.log('🚀 ~ file: minis.js:50 ~ fetchLongVideos ~ error:', error);
  }
};

export const fetchSearchLongVideos = caption => async dispatch => {
  console.log(
    '🚀 ~ file: minis.js:56 ~ fetchSearchLongVideos ~ caption:',
    caption,
  );

  try {
    const {data} = await API.v1.Minis.searchLongVideos(caption);
    console.log('🚀 ~ file: minis.js:58 ~ fetchSearchLongVideos ~ data:', data);

    dispatch({
      type: Types.FETCH_SEARCH_LONG_VIDOES,
      payload: {
        minis: data?.data?.minis,
      },
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: minis.js:80 ~ fetchSearchLongVideos ~ error:',
      error,
    );
  }
};
export const fetchPaginatedLongVideos = (page, minis) => async dispatch => {
  try {
    const {data} = await API.v1.Minis.fetchLongVideos(page);

    dispatch({
      type: Types.FETCH_LONG_VIDEOS,
      payload: {
        minis: [...minis, ...data?.data?.get_minis],
        totalPages: data?.data?.totalPages,
      },
    });
  } catch (error) {}
};

export const createMini = body => async dispatch => {
  try {
    const {data} = await API.v1.Minis.createMini(body);
    console.log('🚀 ~ file: minis.js:57 ~ createMini ~ data:', data);

    // dispatch({
    //   type: Types.FETCH_MINIS,
    //   payload: {
    //     minis: data?.data?.get_minis,
    //     totalPages: data?.data?.totalPages,
    //   },
    // });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:68 ~ createMini ~ error:', error);
  }
};

export const subscribeMini = page => async dispatch => {
  try {
    const {data} = await API.v1.Minis.subscribeMini(page);
    console.log('🚀 ~ file: minis.js:110 ~ subscribeMini ~ data:', data);
    dispatch({
      type: Types.SUBSCRIBE_MINI,
      payload: {
        subscribeMinis: data?.data?.get_minis,
        totalPages: data?.data?.totalPages,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:119 ~ subscribeMini ~ error:', error);
  }
};
// export const nearMini = (page) => async (dispatch) => {
//   try {
//     const { data } = await API.v1.Minis.nearMeMinis(1);

//     dispatch({
//       type: Types.NEAR_ME_MINI,
//       payload: {
//         nearMeMinis: data?.data?.minis,
//         totalPages: data?.data?.totalPages,
//       },
//     });
//   } catch (error) {
//     console.log('🚀 ~ file: minis.js:60 ~ nearMini ~ error:', error);
//   }
// };

export const SearchMinis = caption => async dispatch => {
  try {
    const {data} = await API.v1.Minis.searchMini(caption);
  } catch (error) {}
};

export const fetchPaginatedMinis =
  (page, minis, setTimeOut) => async dispatch => {
    try {
      setTimeOut(true);
      const {data} = await API.v1.Minis.fetchMinis(page);

      dispatch({
        type: Types.FETCH_MINIS,
        payload: {
          minis: [...minis, ...data?.data?.get_minis],
          totalPages: data?.data?.totalPages,
        },
      });
      setTimeOut(false);
    } catch (error) {
      setTimeOut(false);
    }
  };

export const fetchPublicPaginatedMinis =
  (page, minis, setTimeOut) => async dispatch => {
    try {
      setTimeOut(true);
      const {data} = await API.v1.Minis.fetchPublicMinis(page);
      dispatch({
        type: Types.FETCH_MINIS,
        payload: {
          minis: [...minis, ...data?.data?.get_minis],
          totalPages: data?.data?.totalPages,
        },
      });
      setTimeOut(false);
    } catch (error) {
      setTimeOut(false);
    }
  };

export const fetchPaginatedSubscribedMinis =
  (page, minis, setTimeOut) => async dispatch => {
    try {
      setTimeOut(true);
      const {data} = await API.v1.Minis.subscribeMini(page);

      dispatch({
        type: Types.SUBSCRIBE_MINI,
        payload: {
          subscribeMinis: [...minis, ...data?.data?.get_minis],
          totalPages: data?.data?.totalPages,
        },
      });
      setTimeOut(false);
    } catch (error) {
      setTimeOut(false);
    }
  };
export const GetCountry = () => async dispatch => {
  try {
    let userCountry = '';

    await fetch('http://ip-api.com/json/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: Types.OWNER_COUNTRY,
          responseJson,
        });

        return responseJson;
      })
      .catch(error => {
        console.log('🚀 ~ file: minis.js:214 ~ GetCountry ~ error:', error);
      });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:222 ~ GetCountry ~ error:', error);
  }
};
export const fetchPaginatedNearMeMinis = (page, minis) => async dispatch => {
  try {
    const {data} = await API.v1.Minis.nearMeMinis(page);

    dispatch({
      type: Types.NEAR_ME_MINI,
      payload: {
        nearMeMinis: [...minis, ...data?.data?.minis],
        totalPages: data?.data?.totalPages,
      },
    });
  } catch (error) {}
};

export const postMini = () => async dispatch => {
  try {
    await API.v1.Minis.postMini();
  } catch (error) {}
};

export const deleteMini = id => async dispatch => {
  try {
    const {data} = await API.v1.Minis.deleteMini(id);

    dispatch({
      type: Types.DELETE_MINI,
      payload: id,
    });
  } catch (error) {}
};

export const editMini = (id, body, user) => async dispatch => {
  try {
    const {data} = await API.v1.Minis.editMini(id, body);

    dispatch({
      type: Types.EDIT_MINI,
      // payload: { id, caption: data.data.caption },
      payload: {
        _miniId: data?.data?._id,
        caption: '',
        new_mini: data?.data,
        user: user,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:123 ~ vloadingeditMini ~ error:', error);
  }
};

export const fetchComments = id => async dispatch => {
  try {
    dispatch({
      type: Types.LOADING_COMMENTS,
      payload: {
        loading: true,
      },
    });
    const {data} = await API.v1.Minis.fetchComments(id);

    dispatch({
      type: Types.FETCH_COMMENTS,
      payload: {
        comments: data?.data.reverse(),
        loadingComment: false,
      },
    });
  } catch (error) {
    dispatch({
      type: Types.LOADING_COMMENTS,
      payload: {
        loading: false,
      },
    });
    console.log('🚀 ~ file: minis.js:137 ~ fetchComments ~ error:', error);
  }
};

export const deleteComment = (id, itemId) => async dispatch => {
  try {
    const {data} = await API.v1.Minis.deleteComment(id);

    // dispatch({
    //   type: Types.DELETE_COMMENT,
    //   payload: {
    //     comment_id: id.data.comment_id,
    //   },
    // });
    dispatch(fetchComments(itemId));
    dispatch({
      type: Types.FETCH_COMMENTS_COUNT,
      payload: {
        comment_id: itemId,
        comment_count: data?.data?.coment_count,
      },
    });
    //
    // socketServcies.emit('mini', itemId);
  } catch (error) {}
};

export const deleteCommentReplyAction = id => async dispatch => {
  try {
    const {data} = await API.v1.Minis.deleteCommentReply(id);

    if (data.status == 200) {
      dispatch({
        type: Types.DELETE_COMMENT_REPLY,
        payload: id.data,
      });
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: minis.js:168 ~ deleteCommentReplyAction ~ error:',
      error,
    );
  }
};

export const postComment = (body, id, setComment_count) => async dispatch => {
  try {
    const data = await API.v1.Minis.postComment(body);
    dispatch(fetchComments(id));
    setComment_count && setComment_count(data?.data?.data?.comment_count);
    dispatch({
      type: Types.FETCH_COMMENTS_COUNT,
      payload: {
        comment_id: id,
        comment_count: data?.data?.data?.comment_count,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:197 ~ postComment ~ error:', error);
  }
};
export const editCommentAction = (body, id, comment_id) => async dispatch => {
  try {
    const data = await API.v1.Minis.editComment(body, comment_id);

    dispatch(fetchComments(id));
  } catch (error) {
    console.log('🚀 ~ file: minis.js:215 ~ editCommentAction ~ error:', error);
  }
};
export const editCommentReplyAction = (body, id) => async dispatch => {
  try {
    const data = await API.v1.Minis.editCommentReply(body);

    dispatch(fetchComments(id));
  } catch (error) {
    console.log('🚀 ~ file: minis.js:215 ~ editCommentAction ~ error:', error);
  }
};
export const replyCommentAction =
  (body, id, setComment_count) => async dispatch => {
    try {
      const data = await API.v1.Minis.replyComment(body);
      setComment_count && setComment_count(data?.data?.data?.comment_count);
      dispatch(fetchComments(id));
      socketServcies.emit('mini', id);
      // socketServcies.on('mini', (e) => {
      //   dispatch({
      //     type: Types.UPDATE_MINI,
      //     payload: {
      //       update_miniId: id,
      //       mini: e,
      //     },
      //   });
      // });
    } catch (error) {}
  };

export const userFollow =
  (body, setProfileData, setLoadingFollow, setis_followed) =>
  async dispatch => {
    setis_followed && setis_followed(true);
    setLoadingFollow && setLoadingFollow(true);

    try {
      const data = await API.v1.Minis.userFollow(body);
      console.log('🚀 ~ file: minis.js:350 ~ data:', data);
      setis_followed && setis_followed(true);
      if (data?.status == 200) {
        if (setProfileData) {
          setProfileData('following');
        }
        setis_followed && setis_followed(true);
        setLoadingFollow && setLoadingFollow(false);
      }
      dispatch(fetchProfile());
      dispatch(fetchUserFollowersAndFollowing());

      dispatch({
        type: Types.USER_FOLLOW_UPDATE,
        payload: {
          id: body?.following_id,
          follow: true,
        },
      });
    } catch (error) {
      console.log('🚀 ~ file: minis.js:280 ~ error:', error);
      setis_followed && setis_followed(false);
      setLoadingFollow && setLoadingFollow(false);
      Alert.alert('Error', error.response.data.message);
    }
  };

export const miniView = (body, setViews_count) => async dispatch => {
  const user = store.getState().user;
  try {
    const {data} = await API.v1.Minis.miniViewCount(body);

    setViews_count && setViews_count(data?.data?.views_count);
    // dispatch({
    //   type: Types.UPDATE_MINI,
    //   payload: {
    //     update_miniId: body,
    //     mini: data?.data,
    //   },
    // });

    socketServcies.emit('mini', {
      user_id: user.data?.checkUser?._id,
      mini_id: body,
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:204 ~ error:', error);
    // Alert.alert('Error2', error.response.data.message);
  }
};

export const userFollowing =
  (body, setProfileData, setLoadingFollow, setis_followed) =>
  async dispatch => {
    try {
      setLoadingFollow(true);
      // setis_followed && setis_followed(false);

      const data = await API.v1.Minis.userFollowing(body);
      console.log('🚀 ~ data:', data);
      dispatch(fetchUserFollowersAndFollowing());
      // setis_followed && setis_followed(false);
      if (data?.status == 200) {
        setis_followed && setis_followed(false);
      } else {
        setis_followed && setis_followed(true);
      }

      setLoadingFollow(false);
    } catch (error) {
      console.log('🚀 ~ error:', error);

      setLoadingFollow(false);
      setis_followed && setis_followed(true);
    }
  };

export const likeMini = (body, count) => async dispatch => {
  const user = store.getState().user;

  socketServcies.emit('mini_likes_dislikes', {
    mini_id: body.mini,
    user_id: user.data?.checkUser?._id,
  });
  socketServcies.on('mini_likes_dislikes', e => {
    // dispatch({
    //   type: Types.LIKE_COUNT,
    //   payload: {
    //     like_id: body?.mini,
    //     like_count: e?.likes_count,
    //     is_like: e?.is_like,
    //   },
    // });
    dispatch({
      type: Types.LIKE_COUNT,
      payload: {
        like_id: body?.mini,
        like_count: e?.likes_count,
        is_like: e?.is_like,
      },
    });
  });

  // socketServcies.emit('mini_likes_dislikes', {
  //   mini_id: body.mini,
  //   user_id: user.data?.checkUser?._id,
  // });
};
export const reportMini = body => async dispatch => {
  try {
    const data = await API.v1.Minis.miniReport(body);

    Alert.alert(
      'Report Content',
      'Thank you for reporting and playing your role in keeping Share Slate a safe place for our users. We will reach out to you in case any additional information is needed.',
      [{text: 'OK', onPress: () => {}}],
    );
  } catch (error) {}
};
export const fetch_suggestions_list = setLoading => async dispatch => {
  try {
    setLoading && setLoading(true);
    const {data} = await API.v1.Minis.friend_suggestions_list();
    // console.log('===============> DAta ====:::::', data?.data[0]);

    dispatch({
      type: Types.FETCH_SUGGESTIONS_LIST,
      payload: {suggested_List: data?.data},
    });
    setLoading && setLoading(false);
  } catch (error) {
    setLoading && setLoading(false);
  }
};

export const fetchPreviewMinis = page => async dispatch => {
  try {
    dispatch({
      type: Types.IS_LOADING,
      payload: page === 1 ? true : false,
    });
    const {data} = await API.v1.Minis.searchPreview(page);
    dispatch({
      type: Types.IS_LOADING,
      payload: false,
    });
    let minis = [];
    let totalPages = 1;
    if (data && data.data && data.data.get_minis) {
      minis = data.data.get_minis;
      totalPages = data.data.totalPages;
    }

    dispatch({
      type: Types.FETCH_PREVIEW_MINIS,
      payload: {
        minis,
        totalPages,
      },
    });
  } catch (error) {
    dispatch({
      type: Types.IS_LOADING,
      payload: false,
    });
  }
};

export const previewMiniTap = mini => dispatch => {
  dispatch({
    type: Types.ON_MINI_TAP,
    payload: mini,
  });
};

export const fetchSearchMinisAndUsers = caption => async dispatch => {
  try {
    const {data} = await API.v1.Minis.searchMini(caption);
    let minis = [];
    let users = [];

    const user = store.getState().user;

    if (data && data.data) {
      minis = data.data.minis;
      users = data.data.users.filter(u => u._id !== user?.data?.checkUser?._id);
    }

    dispatch({
      type: Types.FETCH_SEARCH_MINIS_USERS,
      payload: {
        minis,
        users,
      },
    });
  } catch (error) {}
};

export const fetchSearchtags = caption => async dispatch => {
  try {
    const {data} = await API.v1.Minis.searchTags({tag: caption});

    let minis = [];

    const user = store.getState().user;

    if (data && data.data) {
      minis = data.data;
    }

    dispatch({
      type: Types.FETCH_SEARCH_MINIS_TAGS,
      payload: {
        minis,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:315 ~ fetchSearchtags ~ error:', error);
  }
};
export const fetchSearchLocation = caption => async dispatch => {
  try {
    const {data} = await API.v1.Minis.searchLocations({keyword: caption});

    let minis = [];

    const user = store.getState().user;

    if (data && data.data) {
      minis = data.data;
    }

    dispatch({
      type: Types.FETCH_SEARCH_MINIS_LOCATION,
      payload: {
        minis,
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: minis.js:315 ~ fetchSearchtags ~ error:', error);
  }
};

export const getTrendingMiniReplies = (body, pagination) => async dispatch => {
  try {
    dispatch({type: Types.TRENDING_MINI_REPLIES_LOADING, payload: true});

    const {data} = await API.v1.Minis.getTrendingMiniReplies(body, pagination);

    dispatch({
      type: Types.FETCH_TRENDING_MINI_REPLIES,
      payload: data.data.get_minis,
    });
    dispatch({type: Types.TRENDING_MINI_REPLIES_LOADING, payload: false});
  } catch (error) {
    dispatch({type: Types.TRENDING_MINI_REPLIES_LOADING, payload: false});
  }
};

export const sendMiniChallengeInvite = (body, navigation) => async dispatch => {
  try {
    dispatch({type: Types.USER_INVITABLES_LOADING, payload: true});
    await API.v1.Minis.sendMiniChallengeInvite(body);
    dispatch({type: Types.USER_INVITABLES_LOADING, payload: false});
    Alert.alert('Challenge', 'Challange has been sent', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  } catch (error) {
    dispatch({type: Types.USER_INVITABLES_LOADING, payload: false});
  }
};

export const removeData = (navigation, screen) => async dispatch => {
  try {
    // await dispatch({
    //   type: Types.FETCH_MINIS,
    //   payload: {
    //     minis: [],
    //     totalPages: 1,
    //   },
    // });
    await dispatch({
      type: Types.GUEST_USER,
      payload: {
        guestUser: null,
      },
    });
    // screen === "signup"
    //   ?
    navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
    // : navigation.navigate(NAVIGATION_ROUTES.LOGIN);
  } catch (error) {}
};

export const onTop = () => async dispatch => {
  try {
    await dispatch({
      type: Types.FETCH_MINIS,
      payload: {
        minis: [],
        totalPages: 1,
      },
    });
  } catch (error) {}
};

export const fetchHashtTags = page => async dispatch => {
  try {
    const {data} = await API.v1.Minis.fetchHashtTags(page);
  } catch (error) {}
};

export const savedMini =
  ({body, setSaved}) =>
  async dispatch => {
    const user = store.getState().user;
    try {
      // console.log("🚀 ~ file: minis.js:635 ~ body:", body);
      const data = await API.v1.Minis.savedMini(body);
      console.log('🚀 ~ file: minis.js:723 ~ data:', data);
      if (data.data?.message === 'Saved minis') {
        setSaved(true);
        // Alert.alert("Mini saved successfully!");
      } else {
        // Alert.alert("Mini unsaved successfully!");
        setSaved(false);
      }

      socketServcies.emit('mini', {
        user_id: user.data?.checkUser?._id,
        mini_id: body.mini_id,
      });
    } catch (error) {
      console.log(error, 'error saved mimi post');
    }
  };

export const fetchInsights = id => async dispatch => {
  try {
    const data = await API.v1.Minis.fetchInsights(id);

    dispatch({
      type: Types.MINIS_INSIGHTS,
      payload: data?.data?.data,
    });
  } catch (error) {
    console.log(error, 'error saved mimi post');
  }
};

export const fetchAllAnalytics = id => async dispatch => {
  try {
    const data = await API.v1.Minis.fetchAllAnalytics(id);

    // const counts = data?.data?.data?.reduce(
    //   (acc, obj) => {
    //     acc.female_comments += obj.female_comments;
    //     acc.female_is_saved += obj.female_is_saved;
    //     acc.female_likes += obj.female_likes;
    //     acc.female_view += obj.female_view;
    //     acc.male_comments += obj.male_comments;
    //     acc.male_is_saved += obj.male_is_saved;
    //     acc.male_likes += obj.male_likes;
    //     acc.male_view += obj.male_view;
    //     acc.others_comments += obj.others_comments;
    //     acc.others_is_saved += obj.others_is_saved;
    //     acc.others_likes += obj.others_likes;
    //     acc.others_view += obj.others_view;
    //     acc.total_views += obj.total_views;
    //     acc.unique_users += obj.unique_users;

    //     // Accumulate the counts for each unique city name
    //     obj.cities.forEach((city) => {
    //       if (acc.cities[city.name]) {
    //         acc.cities[city.name].value += city.value;
    //       } else {
    //         acc.cities[city.name] = {
    //           name: city.name,
    //           value: city.value,
    //           _id: city._id,
    //         };
    //       }
    //     });

    //     // Accumulate the counts for each unique country name
    //     obj.countries.forEach((country) => {
    //       if (acc.countries[country.name]) {
    //         acc.countries[country.name].value += country.value;
    //       } else {
    //         acc.countries[country.name] = {
    //           name: country.name,
    //           value: country.value,
    //           _id: country._id,
    //         };
    //       }
    //     });

    //     // Return the accumulated object for the next iteration
    //     return acc;
    //   },
    //   {
    //     female_comments: 0,
    //     female_is_saved: 0,
    //     female_likes: 0,
    //     female_view: 0,
    //     male_comments: 0,
    //     male_is_saved: 0,
    //     male_likes: 0,
    //     male_view: 0,
    //     others_comments: 0,
    //     others_is_saved: 0,
    //     others_likes: 0,
    //     others_view: 0,
    //     total_views: 0,
    //     unique_users: 0,
    //     cities: {},
    //     countries: {},
    //   }
    // );

    const counts = data?.data?.data?.reduce(
      (acc, obj) => {
        acc.female_comments += obj.female_comments;
        acc.female_is_saved += obj.female_is_saved;
        acc.female_likes += obj.female_likes;
        acc.female_view += obj.female_view;
        acc.male_comments += obj.male_comments;
        acc.male_is_saved += obj.male_is_saved;
        acc.male_likes += obj.male_likes;
        acc.male_view += obj.male_view;
        acc.others_comments += obj.others_comments;
        acc.others_is_saved += obj.others_is_saved;
        acc.others_likes += obj.others_likes;
        acc.others_view += obj.others_view;
        acc.total_views += obj.total_views;
        acc.unique_users += obj.unique_users;

        obj.cities.forEach(city => {
          if (acc.cities.some(c => c.name === city.name)) {
            const index = acc.cities.findIndex(c => c.name === city.name);
            acc.cities[index].value += city.value;
          } else {
            acc.cities.push({
              name: city.name,
              value: city.value,
              _id: city._id,
            });
          }
        });

        obj.countries.forEach(country => {
          if (acc.countries.some(c => c.name === country.name)) {
            const index = acc.countries.findIndex(c => c.name === country.name);
            acc.countries[index].value += country.value;
          } else {
            acc.countries.push({
              name: country.name,
              value: country.value,
              _id: country._id,
            });
          }
        });

        return acc;
      },
      {
        female_comments: 0,
        female_is_saved: 0,
        female_likes: 0,
        female_view: 0,
        male_comments: 0,
        male_is_saved: 0,
        male_likes: 0,
        male_view: 0,
        others_comments: 0,
        others_is_saved: 0,
        others_likes: 0,
        others_view: 0,
        total_views: 0,
        unique_users: 0,
        cities: [],
        countries: [],
      },
    );

    dispatch({
      type: Types.ALL_ANALYTICS,
      payload: counts,
    });
  } catch (error) {
    console.log(error, 'error saved mimi post');
  }
};

export const SendCoinAction = (body, refRBSheetCoin) => async dispatch => {
  try {
    const data = await API.v1.Profile.sendCointoUser(body);

    refRBSheetCoin?.current?.close();

    // Alert.alert('Coin sent successfully');

    // dispatch({
    //   type: Types.MINIS_INSIGHTS,
    //   payload: data?.data?.data,
    // });
  } catch (error) {
    console.log(error, 'error sending Coin ');
    const navigateHandle = () => {
      // navigate(NAVIGATION_ROUTES.WALLET_HOME);
      refRBSheetCoin?.current?.close();
    };
    if (
      error?.response?.data?.message ==
      'User is not allowed to receive the coin'
    ) {
      Alert.alert(error?.response?.data?.message);
    } else if (
      error?.response?.data?.message ==
      'You have insufficient balance in your account. Please recharge.'
    ) {
      Alert.alert(
        'Choose an option',
        'You do not have sufficient funds. Load coins to wallet?',
        [
          {
            text: 'May be later',
            onPress: () => console.log('May be later option selected'),
          },
          {
            text: 'No',
            onPress: () => console.log('Cancel option selected'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: navigateHandle,
          },
        ],
        {cancelable: false},
      );
    }
  }
};

export const loadMoreLongVideos = caption => async dispatch => {
  try {
    const {data} = await API.v1.Minis.loadMoreLongVideos(caption);

    dispatch({
      type: Types.FETCH_MORE_LONG_VIDEOS,
      payload: {
        minis: data?.data?.recomended,
        totalPages: data?.data?.totalPages,
        page: data?.data?.page,
      },
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: lvActions.js:83 ~ loadMoreLongVideos ~ error:',
      error,
    );
  }
};
export const inviteToFunParty = body => async dispatch => {
  console.log(
    '🚀 ~ file: minis.js:975 ~ inviteToFunParty ~ body:',
    JSON.stringify(body.users),
  );
  try {
    const data = await API.v1.Minis.inviteToFunParty(body);
    // console.log('🚀 ~ file: minis.js:896 ~ inviteToFunParty ~ data:', data);
  } catch (error) {
    console.log('🚀 ~ file: minis.js:900 ~ inviteToFunParty ~ error:', error);
  }
};
export const meetExpire_room = body => async dispatch => {
  try {
    const data = await API.v1.Minis.expire_room(body);
    console.log('🚀 ~ file: minis.js:896 ~ meetExpire_room ~ data:', data);
  } catch (error) {
    console.log('🚀 ~ file: minis.js:900 ~ meetExpire_room ~ error:', error);
  }
};
