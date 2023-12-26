import { Types } from '../Types/type';
import _ from 'lodash';
import { store } from '../store';
const initialState = {
  minis: [],
  totalPages: 1,
};

export default function minisReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_MINIS:
      return { ...state, ...action.payload };
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
      const likeIndex = _.findIndex(state.minis, { _id: like_id });

      if (likeIndex >= 0) {
        let likeUpdate = [...state.minis];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, minis: likeUpdate };
      } else {
        return state;
      }
    case Types.VIEW_COUNT:
      const { mini_id, count } = action.payload;
      const miniIndex = state.minis.findIndex((item) => item._id == mini_id);
      if (miniIndex >= 0) {
        let miniUpdate = [...state.minis];
        miniUpdate[miniIndex].views_count = count;
        return { ...state, minis: miniUpdate };
      }

    case Types.UPDATE_MINI:
      const { update_miniId, mini, liked, is_saved } = action.payload;

      const miniUpdatedIndex = _.findIndex(state.minis, { _id: update_miniId });

      if (miniUpdatedIndex !== -1) {
        const updatedMini = Object.assign({}, state.minis[miniUpdatedIndex], {
          is_like: mini.is_like,
          is_saved: mini.is_saved,
          views_count: mini.views_count,
          comment_count: mini.comment_count,
          likes_count: mini.likes_count,
        });
        state.minis[miniUpdatedIndex] = updatedMini;
        return {
          ...state,
        };
      }

      return (state.minis[miniUpdatedIndex] = mini);
    case Types.EDIT_MINI:
      const { _miniId, caption, new_mini, user } = action.payload;
      console.log(
        '🚀 ~ file: minisReducer.js:78 ~ minisReducer ~ action.payload:',
        action.payload
      );
      // const user = store.getState().user?.data?.checkUser;

      const mini_Index = _.findIndex(state.minis, { _id: _miniId });

      if (mini_Index !== -1) {
        let miniUpdate = new_mini;
        miniUpdate.created_by = user;
        state.minis[mini_Index] = miniUpdate;
        console.log(
          '🚀 ~ file: minisReducer.js:91 ~ minisReducer ~ state.minis[mini_Index]:',
          state.minis[mini_Index]
        );

        return {
          ...state,
        };
      }

    default:
      return state;
  }
}
