import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { store } from "../Store/store";

import { navigate } from "./Navigation/navigationRef";
import { NAVIGATION_ROUTES } from "./Navigation/NavigationRoutes";
import { NOTIFICATIONS } from "./notificationsTypes";
import { chatHistory } from "../Store/Actions/chat";

const PushNotificationConfig = {
  configrations: () => {
    PushNotification.configure({
      onNotification: function (notification) {
        const clicked = notification.userInteraction;

        const dispatch = store.dispatch;

        if (clicked) {
          const { data } = notification;

          if (data.type === NOTIFICATIONS.FOLLOW.type) {
            const user = JSON.parse(data.user);
            navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
              item: { item: user, screenName: "OtherProfile" },
            });
          } else if (data.type === NOTIFICATIONS.Watch_Party_Invitation.type) {
            navigate(NAVIGATION_ROUTES.JITSI, { roomId: data?.room });
          } else if (
            data.type === NOTIFICATIONS.MINI_LIKE.type ||
            data.type === NOTIFICATIONS.MINI_COMMENT.type ||
            data.type === NOTIFICATIONS.MINI_COMMENT_REPLY.type ||
            data.type === NOTIFICATIONS.NEW_MINI.type
          ) {
            const newMini = JSON.parse(data.mini);

            const user = store.getState().user;

            let tempMini = {
              ...newMini,
              created_by: user.data.checkUser,
            };
            navigate(NAVIGATION_ROUTES.MINI_PLAY, {
              item: tempMini,
              notificationType: data.type,
            });
          } else if (data.type === NOTIFICATIONS.MINI_CHALLENGE.type) {
            const newMini = JSON.parse(data.mini);

            const user = JSON.parse(data.user);

            let tempMini = {
              ...newMini,
              created_by: user,
            };
            navigate(NAVIGATION_ROUTES.TRENDING_MINI, {
              mini: tempMini,
              notificationType: data.type,
            });
          } else if (data.type === NOTIFICATIONS.NEW_MESSAGE.type) {
            const reciever = JSON.parse(data?.reciever);

            const sender = JSON.parse(data?.sender);

            const item = {
              receiver: reciever?._id,
              sender: sender?._id,
              roomId: data?.chat_id,
              first_name: sender?.first_name,
              last_name: sender?.last_name,
              profile_image: sender?.profile_image,
            };
            dispatch(chatHistory(data?.chat_id, "", item));
          } else {
            navigate(NAVIGATION_ROUTES.NOTIFICATON);
          }
        } else {
          PushNotification.localNotification({
            channelId: "share_slate_fun", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: notification.title, // (optional)
            message: notification.message, // (required)
            largeIcon: "bootsplash_logo",
            smallIcon: "bootsplash_logo",
            data: notification.data,
          });
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {},

      onRegistrationError: function (err) {},

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  },
};

export default PushNotificationConfig;
