import { Types } from '../Types/type';

const initialState = {
  minis: [],
  users: [],
  tags: [],
  location: [],
  totalPages: 1,
  isLoading: false,
  searchedLV: [],
};

export default function previewReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_PREVIEW_MINIS:
      let filteredMinis = [];
      if (action.payload.minis) {
        filteredMinis = action.payload.minis.filter(
          (m) => m.minis_url || m.minis_url !== ''
        );
      }
      const tempMinis = [...state.minis, ...filteredMinis];
      return {
        ...state,
        minis: tempMinis,
        totalPages: action.payload.totalPages,
      };
    // case Types.FETCH_PREVIEW_MINIS:
    //   let filteredMinis = action.payload.minis.filter(
    //     (m) => m.minis_url || m.minis_url !== ''
    //   );
    //   const tempMinis = [...state.minis, ...filteredMinis];
    //   return {
    //     ...state,
    //     minis: tempMinis,
    //     totalPages: action.payload.totalPages,
    //   };

    case Types.FETCH_SEARCH_MINIS_USERS:
      let searchedMinis = action.payload.minis.filter(
        (m) => m.minis_url || m.minis_url !== ''
      );

      return {
        ...state,
        minis: searchedMinis,
        users: action.payload.users,
      };
    case Types.FETCH_SEARCH_MINIS_TAGS:
      let searchedTags = [];
      if (action.payload.minis) {
        searchedTags = action.payload.minis.filter(
          (m) => m.minis_url || m.minis_url !== ''
        );
      }
      return {
        ...state,
        tags: searchedTags,
      };
    case Types.FETCH_SEARCH_LONG_VIDOES:
      let searchedLV = action.payload.minis.filter(
        (m) => m.minis_url || m.minis_url !== ''
      );

      return {
        ...state,
        searchedLV: searchedLV,
      };
    // case Types.UPDATE_MINI:
    //   const { update_miniId, mini, liked, is_saved } = action.payload;
    //   //console.log("🚀 ~ file: minisReducer.js:92 ~ updatedMinis ~ m:", mini.is_saved)
    //   const updatedMinis = state.minis.map((m) => {

    //     // console.log("🚀 ~ file: minisReducer.js:77 ~ updatedMinis ~  Math.abs(liked) > Math.a÷bs(m.likes_count):",  Math.abs(liked) > Math.abs(m.likes_count))
    //     if (m._id === update_miniId) {
    //       return {

    //         ...m,
    //         ...mini,
    //         is_like: mini.is_like,
    //         like_count: mini.like_count,
    //         views_count: mini.views_count,
    //         is_saved: is_saved

    //       };
    //     }
    //     return m;
    //   });
    //   return {
    //     ...state,
    //     minis: updatedMinis,
    //   };
    case Types.FETCH_SEARCH_MINIS_LOCATION:
      let searchedLocation = action.payload.minis.filter(
        (m) => m.minis_url || m.minis_url !== ''
      );
      return {
        ...state,
        location: searchedLocation,
      };

    case Types.ON_MINI_TAP:
      let tempPreMinis = [...state.minis];
      tempPreMinis = tempPreMinis.filter(
        (min) => min._id !== action.payload._id
      );
      tempPreMinis.unshift(action.payload);
      return {
        ...state,
        minis: tempPreMinis,
      };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.minis];
      const filterArr = newArr.filter((item) => item.created_by._id == id);

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
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;
      const prodIndex = state.minis.findIndex((item) => item._id == comment_id);
      if (prodIndex >= 0) {
        let countUpdate = [...state.minis];
        countUpdate[prodIndex].comment_count = comment_count;
        return { ...state, minis: countUpdate };
      } else {
        return state;
      }

    case Types.LIKE_COUNT:
      const { like_id, like_count, is_like } = action.payload;
      const likeIndex = state.minis.findIndex((item) => item._id == like_id);
      if (likeIndex >= 0) {
        let likeUpdate = [...state.minis];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, minis: likeUpdate };
      } else {
        return state;
      }
    case Types.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
