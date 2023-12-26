import { API } from "../../Api";
import { Types } from "../Types/type";
import { notificationCount } from "./minis";

export const fetchNotificationsList =
  (page, notifications) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await API.v1.Notifications.fetchNotificationsList(page);

      dispatch(setIsLoading(false));

      dispatch({
        type: Types.FETCH_NOTIFICATIONS,
        payload: {
          notifications: [...notifications, ...data.notifications],
          totalPages: data?.totalPages,
          page: data?.page,
        },
      });

      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
export const fetchPaginatedNotificationsList =
  (page, notifications) => async (dispatch) => {
    try {
      const { data } = await API.v1.Notifications.fetchNotificationsList(page);

      if (page <= data?.page) {
        dispatch({
          type: Types.FETCH_NOTIFICATIONS,
          payload: {
            notifications: [...notifications, ...data.notifications],
            totalPages: data?.totalPages,
            page: data?.page,
          },
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: notifications.js:47 ~ error:", error);
    }
  };

export const applyNotificationsFilter = (payload) => {
  return {
    type: Types.APPLY_NOTIFICATIONS_FILTER,
    payload,
  };
};

export const setIsLoading = (payload) => {
  return {
    type: Types.NOTIFICATIONS_LOADING,
    payload,
  };
};

export const onNotificationTap = (payload) => async (dispatch) => {
  try {
    await API.v1.Notifications.changeNotificationStatus({
      notification_id: payload,
    });

    dispatch(notificationCount());
    dispatch({
      type: Types.ON_NOTIFICATION_TAP,
      payload,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: notifications.js:55 ~ onNotificationTap ~ error:",
      error,
    );
  }
};
