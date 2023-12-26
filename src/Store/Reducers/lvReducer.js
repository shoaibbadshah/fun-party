import { Types } from "../Types/type";
import _ from "lodash";
const initialState = {
  minis: [],
  lvMinis: [],
  lvOtherMinis: [],
  lvOtherTotalPages: 1,
  lvTotalPages: 1,
  totalPages: 1,
  page: 1,
};

export default function lvReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_LONG_VIDEOS:
      return { ...state, ...action.payload };

    case Types.FETCH_LONG_VIDEOS_PROFILE:
      return { ...state, ...action.payload };

    case Types.FETCH_LONG_VIDEOS_PROFILE_OTHER:
      return { ...state, ...action.payload };

    case Types.FETCH_SEARCH_LONG_VIDOES:
      let searchedMinis = action.payload.minis.filter(
        (m) => m.minis_url || m.minis_url !== "",
      );

      return {
        ...state,
        minis: searchedMinis,
      };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.minis];
      const filterArr = newArr.filter((item) => item?.created_by?._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });
      const final = state.minis.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, minis: final };
    case Types.USER_FOLLOW_UPDATE:
      const follow1 = action.payload?.follow;
      const id1 = action.payload?.id;
      let newArr1 = [...state.lvMinis];
      const filterArr1 = newArr1.filter((item) => item?.created_by?._id == id1);
      const result1 = filterArr1.map((item) => {
        item.created_by.is_followed = follow1 === true ? true : false;
        return item;
      });
      const final1 = state.lvMinis.map((elem) => {
        result1.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, lvMinis: final1 };
    case Types.USER_FOLLOW_UPDATE:
      const follow2 = action.payload?.follow;
      const id2 = action.payload?.id;
      let newArr2 = [...state.lvOtherMinis];
      const filterArr2 = newArr2.filter((item) => item?.created_by?._id == id2);
      const result2 = filterArr2.map((item) => {
        item.created_by.is_followed = follow2 === true ? true : false;
        return item;
      });
      const final2 = state.lvOtherMinis.map((elem) => {
        result2.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, lvOtherMinis: final2 };

    // const tempMinis = [...state.minis, ...action.payload?.minis];
    // return {
    //   ...state,
    //   minis: tempMinis,
    //   totalPages: action.payload?.totalPages,
    //   page: action.payload?.page,
    // };
    // return { ...state, minis: [...minis, ...action.payload.minis] };

    // let filteredMinis = [];
    // if (action.payload.minis) {
    //   filteredMinis = action.payload.minis.filter(
    //     (m) => m.minis_url || m.minis_url !== ''
    //   );
    // }
    // const tempMinis = [...state.minis, ...filteredMinis];
    // return {
    //   ...state,
    //   minis: tempMinis,
    //   totalPages: action.payload.totalPages,
    // };
    //

    //
    // case Types.USER_FOLLOW_UPDATE:
    //   const { id, follow } = action.payload;
    //   let newArr = [...state.minis];
    //   const filterArr = newArr.filter((item) => item?.created_by?._id == id);
    //   const result = filterArr.map((item) => {
    //     item.created_by.is_followed = follow === true ? true : false;
    //     return item;
    //   });
    //   const final = state.minis.map((elem) => {
    //     result.map((res) => {
    //       if (elem._id === res._id) {
    //         elem = res;
    //       }
    //     });
    //     return elem;
    //   });
    //   return { ...state, minis: final };
    // case Types.FETCH_COMMENTS_COUNT:
    //   const { comment_id, comment_count } = action.payload;
    //   const prodIndex = state.minis.findIndex((item) => item._id == comment_id);
    //   if (prodIndex >= 0) {
    //     let countUpdate = [...state.minis];
    //     countUpdate[prodIndex].comment_count = comment_count;
    //     return { ...state, minis: countUpdate };
    //   }
    // case Types.LIKE_COUNT:
    //   const { like_id, like_count, is_like } = action.payload;
    //   const likeIndex = _.findIndex(state.minis, { _id: like_id });

    //   if (likeIndex >= 0) {
    //     let likeUpdate = [...state.minis];
    //     likeUpdate[likeIndex].likes_count = like_count;
    //     likeUpdate[likeIndex].is_like = is_like;
    //     return { ...state, minis: likeUpdate };
    //   }
    // case Types.VIEW_COUNT:
    //   const { mini_id, count } = action.payload;
    //   const miniIndex = state.minis.findIndex((item) => item._id == mini_id);
    //   if (miniIndex >= 0) {
    //     let miniUpdate = [...state.minis];
    //     miniUpdate[miniIndex].views_count = count;
    //     return { ...state, minis: miniUpdate };
    //   }

    // case Types.UPDATE_MINI:
    //   // const { update_miniId, mini } = action.payload;

    //   // const miniUpdatedIndex = _.findIndex(state.minis, { _id: update_miniId });

    //   // if (miniUpdatedIndex !== -1) {
    //   //   const updatedMini = Object.assign({}, state.minis[miniUpdatedIndex], {
    //   //     views_count: mini.views_count,
    //   //     comment_count: mini.comment_count,
    //   //     likes_count: mini.likes_count,
    //   //   });
    //   //   state.minis[miniUpdatedIndex] = updatedMini;
    //   //   return {
    //   //     ...state,
    //   //   };
    //   // }

    //   return state;
    // case Types.USER_FOLLOW_UPDATE:
    //   const { id, follow } = action.payload;
    //   let newArr = [...state.minis];
    //   const filterArr = newArr.filter((item) => item?.created_by?._id == id);
    //   const result = filterArr.map((item) => {
    //     item.created_by.is_followed = follow === true ? true : false;
    //     return item;
    //   });
    //   const final = state.minis.map((elem) => {
    //     result.map((res) => {
    //       if (elem._id === res._id) {
    //         elem = res;
    //       }
    //     });
    //     return elem;
    //   });
    //   return { ...state, minis: final };
    default:
      return state;
  }
}
