import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
// import Image from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { NOTIFICATIONS } from "../Utils/notificationsTypes";
import { checkImageUrl, timeSince } from "../Utils/helpers";
import { onNotificationTap } from "../Store/Actions/notifications";

export default function Notification({ item }) {
  // console.log('🚀 ~ file: Notification.js:13 ~ Notification ~ item:', item);
  const theme = useSelector((e) => e.theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNavigation = (Clickeditem) => {
    console.log(
      "🚀 ~ file: Notification.js:19 ~ handleNavigation ~ Clickeditem:",
      Clickeditem,
    );

    if (item.type === NOTIFICATIONS.FOLLOW.type) {
      dispatch(onNotificationTap(item._id));
      navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
        item: { item: item.from, screenName: "OtherProfile" },
      });
    } else if (item.type === NOTIFICATIONS.Watch_Party_Invitation.type) {
      console.log(
        "🚀 ~ file: Notification.js:30 ~ handleNavigation ~ item:",
        item,
      );
      dispatch(onNotificationTap(item._id));
      if (!item?.is_room_expired) {
        dispatch(onNotificationTap(item._id));
        // navigation.navigate(NAVIGATION_ROUTES.JITSI, { roomId: item.room });
        navigation.reset({
          index: 0,
          routes: [{ name: NAVIGATION_ROUTES.JITSI, RoomID: item.room }],
        });
      } else {
        Alert.alert("Fun Party ", "FunParty was ended by the owner");
      }
    } else if (
      item.type === NOTIFICATIONS.MINI_LIKE.type ||
      item.type === NOTIFICATIONS.MINI_COMMENT.type ||
      item.type === NOTIFICATIONS.MINI_COMMENT_REPLY.type ||
      item.type === NOTIFICATIONS.NEW_MINI.type
    ) {
      let created_by =
        item.type === NOTIFICATIONS.NEW_MINI.type ? item.from : item.user_id;
      let tempMini = {
        ...item.mini,
        created_by,
      };
      dispatch(onNotificationTap(item._id));
      navigation.navigate(NAVIGATION_ROUTES.MINI_PLAY, {
        item: tempMini,
        notificationType: item?.type,
        from: "notification",
      });
    } else if (item.type === NOTIFICATIONS.MINI_CHALLENGE.type) {
      let mini = {
        ...item.mini,
        created_by: item.from,
      };
      dispatch(onNotificationTap(item._id));
      navigation.navigate(NAVIGATION_ROUTES.TRENDING_MINI, {
        mini,
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigation(item)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        backgroundColor: item.is_read ? theme.notiRead : theme.notiUnread,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Image
            source={{
              uri: checkImageUrl(
                item?.created_by?.profile_image,
                `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
              ),
            }}
            style={{
              borderRadius: 40,
              width: 55,
              height: 55,
              marginRight: 5,
            }}
            resizeMode='cover'
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginRight: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              color: theme.text,
              fontSize: 16,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 16,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              {item?.from?.first_name} {item?.from?.last_name}{" "}
            </Text>

            {item?.body}
          </Text>
        </View>
        <View>
          {item.type === NOTIFICATIONS.Watch_Party_Invitation.type ? (
            <TouchableOpacity
              disabled={item?.is_room_expired}
              style={{
                width: 75,
                height: 35,
                // paddingHorizontal: screenName === "OtherProfile" ? 15 : 45,
                padding: 0,
                borderRadius: 52,
                justifyContent: "center",
                alignItems: "center",
                elevation: 0,
                backgroundColor: "#5E72E4",
                // display:
                //   item.type === NOTIFICATIONS.Watch_Party_Invitation.type &&
                //   new Date() - item.createdAt < 3600000
                //     ? "flex"
                //     : "none",
              }}
              onPress={() => handleNavigation(item)}
              // onPress={() =>
              //   screenName === "OtherProfile"
              //     ? handleFollow()
              //     : navigation.navigate(NAVIGATION_ROUTES.EDIT_PROFILE, {
              //         profileData: data,
              //       })
              // }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {item?.is_room_expired ? "Expired" : "Join now"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: theme.textDarkGrey, fontSize: 12 }}>
              {timeSince(new Date(item.createdAt))}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
