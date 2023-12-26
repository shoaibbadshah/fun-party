import { Types } from "../Types/type";

const initialState = {
  chatFriends: [],
  chatHistory: [],
  chatHistoryPages: 1,
  loadingChat: false,
  count: 0,
};

export default function chatFriendsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_CHAT_HISTORY:
      return { ...state, ...action.payload };
    case Types.CHAT_COUNT:
      return { ...state, count: action.payload?.count };
    case Types.DELETE_CHAT:
      const { id } = action.payload;
      let newArr = [...state.chatFriends];
      const filterArr = newArr.filter((item) => item?._id !== id);
      return { ...state, chatFriends: filterArr };
    case Types.DELETE_CHAT_MESSAGE:
      const { messageId, deleteMessage, isDeleted } = action.payload;
      const deleteIndex = state.chatHistory.findIndex(
        (item) => item?._id === messageId,
      );
      if (deleteIndex >= 0) {
        let deleteUpdate = [...state.chatHistory];
        deleteUpdate[deleteIndex].message = deleteMessage;
        deleteUpdate[deleteIndex].is_deleted = isDeleted;
        return { ...state, chatHistory: deleteUpdate };
      }
    default:
      return state;
  }
}
