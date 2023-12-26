import { Types } from '../Types/type';

const initialState = {
  userMentionMinis: [],
};

export default function userMinisMentionReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_USER_MENTION_MINIS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
