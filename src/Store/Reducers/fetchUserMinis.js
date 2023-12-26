import { Types } from '../Types/type';
import _ from 'lodash';
const initialState = {
  userMinis: [],
  totalPages: 1,
};

export default function userMinisReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_USER_MINIS:
      return { ...state, ...action.payload };

    case Types.DELETE_MINI:
      const updatedMinis = state.userMinis.filter(
        (video) => video._id !== action.payload
      );
      return {
        ...state,
        userMinis: updatedMinis,
      };
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;
      const prodIndex = state.userMinis.findIndex(
        (item) => item._id == comment_id
      );

      if (prodIndex >= 0) {
        let countUpdate = [...state.userMinis];
        countUpdate[prodIndex].comment_count = comment_count;

        return { ...state, userMinis: countUpdate };
      } else {
        return state;
      }
    case Types.LIKE_COUNT:
      const { like_id, like_count, is_like } = action.payload;
      const likeIndex = state.userMinis.findIndex(
        (item) => item._id == like_id
      );
      if (likeIndex >= 0) {
        let likeUpdate = [...state.userMinis];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, userMinis: likeUpdate };
      } else {
        return state;
      }

    case Types.UPDATE_MINI:
      const { update_miniId, mini, liked, is_saved } = action.payload;

      const miniUpdatedIndex = _.findIndex(state.userMinis, {
        _id: update_miniId,
      });

      if (miniUpdatedIndex !== -1) {
        const updatedMini = Object.assign(
          {},
          state.userMinis[miniUpdatedIndex],
          {
            is_like: mini.is_like,
            is_saved: mini.is_saved,
            views_count: mini.views_count,
            comment_count: mini.comment_count,
            likes_count: mini.likes_count,
          }
        );

        state.userMinis[miniUpdatedIndex] = updatedMini;

        return {
          ...state,
        };
      }

    case Types.EDIT_MINI:
      let tempMinis = [...state.userMinis];
      const foundMini = tempMinis.find(
        (mini) => mini._id === action.payload.id
      );
      const foundMiniIndex = tempMinis.findIndex(
        (mini) => mini._id === action.payload.id
      );
      if (foundMini) {
        tempMinis[foundMiniIndex] = {
          ...foundMini,
          caption: action.payload.caption,
        };
      }
      return {
        ...state,
        userMinis: tempMinis,
      };
    default:
      return state;
  }
}
