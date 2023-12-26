import { Types } from '../Types/type';

const initialState = {
  miniReplies: [],
  totalPages: 1,
  isLoading: false,
};

export default function trendingMiniRepliesReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case Types.FETCH_TRENDING_MINI_REPLIES:
      return {
        ...state,
        miniReplies: action.payload,
      };
    case Types.TRENDING_MINI_REPLIES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.miniReplies];
      const filterArr = newArr.filter((item) => item.created_by._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });
      const final = state.miniReplies.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, miniReplies: final };
    case Types.FETCH_COMMENTS_COUNT:
      const { comment_id, comment_count } = action.payload;

      const prodIndex = state.miniReplies.findIndex(
        (item) => item._id == comment_id
      );

      if (prodIndex >= 0) {
        let countUpdate = [...state.miniReplies];
        countUpdate[prodIndex].comment_count = comment_count;

        return { ...state, miniReplies: countUpdate };
      } else {
        return state;
      }
    case Types.LIKE_COUNT:
      const { like_id, like_count, is_like } = action.payload;
      const likeIndex = state.miniReplies.findIndex(
        (item) => item._id == like_id
      );
      if (likeIndex >= 0) {
        let likeUpdate = [...state.miniReplies];
        likeUpdate[likeIndex].likes_count = like_count;
        likeUpdate[likeIndex].is_like = is_like;
        return { ...state, miniReplies: likeUpdate };
      } else {
        return state;
      }
    default:
      return state;
  }
}
