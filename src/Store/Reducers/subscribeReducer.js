import { Types } from '../Types/type';
import _ from 'lodash';
const initialState = {
  subscribeMinis: [],
  totalPages: 1,
};

export default function subscribeMiniReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SUBSCRIBE_MINI:
      return { ...state, ...action.payload };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.subscribeMinis];
      const filterArr = newArr.filter((item) => item.created_by._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });
      const final = state.subscribeMinis.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, subscribeMinis: final };
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;
      const prodIndex = state.subscribeMinis.findIndex(
        (item) => item._id == comment_id
      );
      if (prodIndex >= 0) {
        let countUpdate = [...state.subscribeMinis];
        countUpdate[prodIndex].comment_count = comment_count;
        return { ...state, subscribeMinis: countUpdate };
      } else {
        return state;
      }
    case Types.LIKE_COUNT:
      const { like_id, like_count, is_like } = action.payload;
      const likeIndex = state.subscribeMinis.findIndex(
        (item) => item._id == like_id
      );
      if (likeIndex >= 0) {
        let likeUpdate = [...state.subscribeMinis];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, subscribeMinis: likeUpdate };
      } else {
        return state;
      }
    // case Types.UPDATE_MINI:
    //   const { update_miniId, mini, liked, is_saved } = action.payload;
    //   //console.log("🚀 ~ file: minisReducer.js:92 ~ updatedMinis ~ m:", mini.is_saved)
    //   const updatedMinis = state.subscribeMinis.map((m) => {

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
    //     subscribeMinis: updatedMinis,
    //   };
    case Types.UPDATE_MINI:
      const { update_miniId, mini, liked, is_saved } = action.payload;

      const miniUpdatedIndex = _.findIndex(state.subscribeMinis, {
        _id: update_miniId,
      });

      if (miniUpdatedIndex !== -1) {
        const updatedMini = Object.assign(
          {},
          state.subscribeMinis[miniUpdatedIndex],
          {
            is_like: mini.is_like,
            is_saved: mini.is_saved,
            views_count: mini.views_count,
            comment_count: mini.comment_count,
            likes_count: mini.likes_count,
          }
        );
        // console.log("🚀 ~ file: minisReducer.js:88 ~ minisReducer ~ updatedMini:", updatedMini)
        state.subscribeMinis[miniUpdatedIndex] = updatedMini;

        return {
          ...state,
        };
      }

      return state;
    default:
      return state;
  }
}
