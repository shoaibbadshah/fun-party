import {Types} from '../Types/type';

const initialState = {
  userFollower: [],
  userFollowing: [],
  friendList: [],
  contacts: [],
  isLoading: false,
};

export default function userFollowerFollowingReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case Types.FETCH_USER_FOLLOWER_FOLLOWING:
      return {...state, ...action.payload};

    case Types.FETCH_ALL_FRIEND_LIST:
      return {...state, ...action.payload};
    case Types.FETCH_USER_CONTACTS:
      return {...state, contacts: action.payload};

    case Types.USER_FRIEND_LIST_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
