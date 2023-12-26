import { Types } from '../Types/type';

const initialstate = {
  data: null,
  isOnBaorded: false,
  profileImage: null,
  guestUser: null,
  isBlocked: false,
  isUserAllow: false,
};
export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        data: action.payload,
        profileImage: action.payload.checkUser.profile_image,
      };
    case Types.SIGN_OUT:
      return {
        // ...state,
        data: null,
        isUserAllow: false,
      };
    case Types.SET_ON_BOARDED:
      return {
        ...state,
        isOnBaorded: true,
      };
    case Types.IS_USER_ALLOW_FOR_CONTACT:
      return {
        ...state,
        isUserAllow: action.payload,
      };
    case Types.GUEST_USER:
      return {
        ...state,
        guestUser: action.payload,
      };
    case Types.UPDATE_USER:
      return {
        ...state,
        profileImage: action.payload,
      };

    case Types.UPDATE_USER_PRIVACY:
      let tempUser = { ...state.data.checkUser };
      let tempUserData = { ...state.data };
      tempUser = {
        ...tempUser,
        ...action.payload,
      };

      tempUserData = {
        ...tempUserData,
        checkUser: tempUser,
      };

      return {
        ...state,
        data: tempUserData,
      };

    case Types.UPDATE_USER_NOTIFICATION_SETTINGS:
      let tempNotify = { ...state.data.checkUser };
      let tempUserDataNotify = { ...state.data };

      tempNotify = {
        ...tempNotify,
        ...action.payload,
      };

      tempUserDataNotify = {
        ...tempUserDataNotify,
        checkUser: tempNotify,
      };

      return {
        ...state,
        data: tempUserDataNotify,
      };
    case Types.IS_BLOCKED_SUCCESS:
      return { ...state, isBlocked: !state.isBlocked };
    default:
      return state;
  }
}
