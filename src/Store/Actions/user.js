import { Types } from "../Types/type";
import { API } from "../../Api";
import { NAVIGATION_ROUTES } from "../../Utils/Navigation/NavigationRoutes";

export const setUser = (payload) => {
  return {
    type: Types.SET_USER,
    payload,
  };
};
export const updateUser = (payload) => {
  return {
    type: Types.UPDATE_USER,
    payload,
  };
};
export const updatePrivacyAction = (payload) => {
  return {
    type: Types.UPDATE_USER_PRIVACY,
    payload,
  };
};
export const updateNoficationSetting = (payload) => {
  return {
    type: Types.UPDATE_USER_NOTIFICATION_SETTINGS,
    payload,
  };
};

export const userSignOut = (payload) => async (dispatch) => {
  try {
    const resp = await API.v1.Auth.logout({ payload });
    console.log("🚀 ~ file: user.js:33 ~ userSignOut ~ resp:", resp);
    dispatch({ type: Types.SIGN_OUT });
  } catch (error) {
    dispatch({ type: Types.SIGN_OUT });
    // navigation.navigate(NAVIGATION_ROUTES.LOGIN);

    console.log("🚀 ~ file: user.js:34 ~ userSignOut ~ error:", error);
  }
};

export const setOnBaorded = () => {
  return {
    type: Types.SET_ON_BOARDED,
  };
};
