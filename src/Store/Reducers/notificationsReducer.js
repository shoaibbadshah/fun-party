import {
  handleChangeNotificationElement,
  handleFilteredReadUnread,
} from "../../Utils/helpers";
import { Types } from "../Types/type";

const initialState = {
  notifications: [],
  read: [],
  unread: [],
  filteredNotifications: [],
  isLoading: false,
  count: 0,
  totalPages: 1,
  page: 1,
  isLoadingMore: false,
};

export default function minisReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
        filteredNotifications: action.payload.notifications,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        isLoadingMore: action.payload.isLoadingMore,
      };
    case Types.FETCH_NOTIFICATIONS_COUNT:
      return {
        ...state,
        count: action.payload.count,
      };
    case Types.APPLY_NOTIFICATIONS_FILTER:
      let tempNotifications = [...state.notifications];

      if (action.payload !== "all") {
        tempNotifications = tempNotifications.filter((notify) =>
          notify.type.includes(action.payload),
        );
      }

      return {
        ...state,
        filteredNotifications:
          tempNotifications.length > 0 ? tempNotifications : [],
      };
    case Types.NOTIFICATIONS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case Types.ON_NOTIFICATION_TAP:
      let tempNoti = [...state.notifications];
      let tempRead = [...state.read];
      let tempUnread = [...state.unread];
      let tempFiltered = [...state.filteredNotifications];
      tempNoti = handleChangeNotificationElement(tempNoti, action.payload);
      tempRead = handleChangeNotificationElement(tempRead, action.payload);
      tempUnread = handleChangeNotificationElement(tempUnread, action.payload);
      tempFiltered = handleChangeNotificationElement(
        tempFiltered,
        action.payload,
      );

      let tempFilteredRead = handleFilteredReadUnread(tempNoti, true, "_id");
      tempRead = tempRead.concat(tempFilteredRead);
      tempRead = handleFilteredReadUnread(tempNoti, true, "_id");
      tempUnread = handleFilteredReadUnread(tempNoti, false, "_id");

      return {
        ...state,
        notifications: tempNoti,
        read: tempRead,
        unread: tempUnread,
        filteredNotifications: tempFiltered,
      };

    default:
      return state;
  }
}
