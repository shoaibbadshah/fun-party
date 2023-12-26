import { Types } from '../Types/type';

const initialState = {
  otherUserMentionMinis: [],
};

export default function otherUserMinisMentionReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case Types.FETCH_OTHER_USER_MENTION_MINIS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
