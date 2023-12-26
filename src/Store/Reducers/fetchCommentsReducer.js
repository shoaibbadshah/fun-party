import { Types } from "../Types/type";

const initialState = {
  comments: [],
  loadingComment: false,
};

export default function fetchCommentsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_COMMENTS:
      return { ...state, ...action.payload };
    case Types.LOADING_COMMENTS:
      return { ...state, loadingComment: action.payload.loading };

    case Types.DELETE_COMMENT:
      const updatedComment = state.comments.filter(
        (c) => c._id !== action.payload.comment_id,
      );
      console.log(
        "🚀 ~ file: fetchCommentsReducer.js:16 ~ fetchCommentsReducer ~ updatedComment:",
        updatedComment,
      );

      return {
        comments: updatedComment,
      };

    case Types.DELETE_COMMENT_REPLY:
      try {
        const updatedComments = state.comments.map((comment) => {
          if (comment._id === action.payload.comment_id) {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply._id !== action.payload.reply_id,
              ),
            };
          } else {
            return comment;
          }
        });

        return {
          ...state,
          comments: updatedComments,
        };
      } catch (error) {
        console.error(error);
        return state;
      }

    default:
      return state;
  }
}
