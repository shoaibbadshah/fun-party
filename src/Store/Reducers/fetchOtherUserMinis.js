import { Types } from '../Types/type';

const initialState = {
  otherUserMinis: [],
  totalPages: 1,
};

export default function otherUserMinisReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_OTHER_USER_MINIS:
      return { ...state, ...action.payload };
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;
      const prodIndex = state.otherUserMinis.findIndex(
        (item) => item._id == comment_id
      );
      if (prodIndex >= 0) {
        let countUpdate = [...state.otherUserMinis];
        countUpdate[prodIndex].comment_count = comment_count;
        return { ...state, otherUserMinis: countUpdate };
      } else {
        return state;
      }
    // case Types.UPDATE_MINI:
    //   const {update_miniId, mini, liked } = action.payload;
    //   // console.log("🚀 ~ file: minisReducer.js:56 ~ minisReducer ~ liked:", liked)
    //   // console.log("🚀 ~ file: minisReducer.js:56 ~ minisReducer ~ action.payload:", update_miniId)
    //   const mini_Index = state.otherUserMinis.findIndex((item) => item._id == update_miniId);
    //   // console.log("🚀 ~ file: minisReducer.js:58 ~ minisReducer ~ mini_Index:", mini_Index)
    //   if (mini_Index >= 0) {
    //     let miniUpdate = [...state.otherUserMinis];

    //     // console.log("🚀 ~ file: minisReducer.js:59 ~ minisReducer ~ OLD MINI:", mini  )
    //     miniUpdate[mini_Index].views_count = mini.views_count;
    //     miniUpdate[mini_Index].likes_count = mini.likes_count;
    //     // miniUpdate[mini_Index].is_like = mini.is_like;

    //     liked? (
    //       miniUpdate[mini_Index].is_like = liked ):  (miniUpdate[mini_Index].is_like = is_like)
    //     miniUpdate[mini_Index].is_saved = mini.is_saved;
    //     miniUpdate[mini_Index].replies_count = mini.replies_count;
    //     miniUpdate[mini_Index].comment_count = mini.comment_count;
    //     // console.log("🚀 ~ file: minisReducer.js:59 ~ minisReducer ~ miniUpdate:", miniUpdate[mini_Index].is_saved  )
    //     return { ...state, otherUserMinis: miniUpdate };
    //   }
    case Types.LIKE_COUNT:
      const { like_id, like_count, is_like } = action.payload;
      const likeIndex = state.otherUserMinis.findIndex(
        (item) => item._id == like_id
      );
      if (likeIndex >= 0) {
        let likeUpdate = [...state.otherUserMinis];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, otherUserMinis: likeUpdate };
      } else {
        return state;
      }
    default:
      return state;
  }
}
