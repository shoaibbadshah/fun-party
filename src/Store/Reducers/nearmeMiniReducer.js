import { Types } from '../Types/type';
import _ from 'lodash';
const initialState = {
  nearMeMinis: [],
  totalPages: 1,
};

export default function nearMeMiniReducer(state = initialState, action) {
  switch (action.type) {
    case Types.NEAR_ME_MINI:
      // console.log(
      //   '🚀 ~ file: nearmeMiniReducer.js:13 ~ nearMeMiniReducer ~ action.payload:',
      //   action.payload,
      // );

      return { ...state, ...action.payload };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.nearMeMinis];
      const filterArr = newArr.filter((item) => item.created_by._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });
      const final = state.nearMeMinis.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, nearMeMinis: final };
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;
      const prodIndex = state.nearMeMinis.findIndex(
        (item) => item._id == comment_id
      );
      if (prodIndex >= 0) {
        let countUpdate = [...state.nearMeMinis];
        countUpdate[prodIndex].comment_count = comment_count;
        return { ...state, nearMeMinis: countUpdate };
      } else {
        return state;
      }

    case Types.UPDATE_MINI:
      const { update_miniId, mini, liked, is_saved } = action.payload;

      const miniUpdatedIndex = _.findIndex(state.nearMeMinis, {
        _id: update_miniId,
      });

      if (miniUpdatedIndex !== -1) {
        const updatedMini = Object.assign(
          {},
          state.nearMeMinis[miniUpdatedIndex],
          {
            is_like: mini.is_like,
            is_saved: mini.is_saved,
            views_count: mini.views_count,
            comment_count: mini.comment_count,
            likes_count: mini.likes_count,
          }
        );
        // console.log("🚀 ~ file: minisReducer.js:88 ~ minisReducer ~ updatedMini:", updatedMini)
        state.nearMeMinis[miniUpdatedIndex] = updatedMini;

        return {
          ...state,
        };
      }

      return state;
    default:
      return state;
  }
}
