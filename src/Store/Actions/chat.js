import { API } from "../../Api";
import { Types } from "../Types/type";
import { NAVIGATION_ROUTES } from "../../Utils/Navigation/NavigationRoutes";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../Utils/Navigation/navigationRef";
import { store } from "../store";
import axios from "axios";
import moment from "moment/moment";

export const createRoomAction =
  (body, navigation, otherUser) => async (dispatch) => {
    console.log(otherUser, "other user for chat");
    try {
      const { data } = await API.v1.Chat.createRoom(body);
      const item = {
        receiver: data?.data?.receiver,
        sender: data?.data?.sender,
        roomId: data?.data?._id,
        first_name: otherUser?.first_name,
        last_name: otherUser?.last_name,
        profile_image: otherUser?.profile_image,
      };
      await dispatch(chatHistory(data?.data?._id, navigation, item));
    } catch (error) {
      console.log(error, "error");
    }
  };

export const chatHistory = (id, navigatio, item) => async (dispatch) => {
  try {
    const { data } = await API.v1.Chat.messageHistory(id);

    dispatch({
      type: Types.FETCH_CHAT_HISTORY,
      payload: {
        chatHistory: data?.data?.get_messages,
        chatHistoryPages: data?.data?.totalPages,
      },
    });
    const body = { chat_id: id };

    navigate(NAVIGATION_ROUTES.CHAT_ROOM, { item: item });
    dispatch(chatreadedAction(body));
  } catch (error) {
    console.log(error, "message history error");
  }
};

export const chatAllRooms = () => async (dispatch) => {
  try {
    dispatch({
      type: Types.FETCH_CHAT_HISTORY,
      payload: {
        loadingChat: true,
      },
    });
    const { data } = await API.v1.Chat.getRooms();
    console.log("🚀 ~ file: chat.js:55 ~ chatAllRooms ~ data:", data);
    dispatch({
      type: Types.FETCH_CHAT_HISTORY,
      payload: {
        chatFriends: data?.data,
        loadingChat: false,
      },
    });
  } catch (error) {
    dispatch({
      type: Types.FETCH_CHAT_HISTORY,
      payload: {
        loadingChat: false,
      },
    });
  }
};

export const sendMessageAction =
  (body, messageData, item, user, mediaImg, messageText, senderId) =>
  async (dispatch) => {
    const { data } = store.getState().user;
    const formdata = new FormData();

    formdata.append(
      "message",
      body?.message.trim() === "" ? "" : body?.message,
    );
    formdata.append("sender", body?.sender);
    formdata.append("receiver", body?.receiver);
    formdata.append("chat_id", body?.chat_id);
    formdata.append(
      "media_type",
      body?.media_type?.mime?.split("/")[0]
        ? body?.media_type.mime?.split("/")[0]
        : "",
    );
    formdata.append(
      "media",
      body?.media_type.mime?.split("/")[0]
        ? {
            uri: body?.media,
            name: body?.media_type?.filename,
            type: "application/json",
            // mimetype: 'application/json',
            // originalname: body?.media_type?.filename,
          }
        : "",
    );

    try {
      console.log(JSON.stringify(formdata));
      const response = await axios({
        url: "https://apis.shareslate.fun/api/users/send_message",
        method: "POST",
        data: formdata,
        headers: {
          Accept: "/",
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(
        "🚀 ~ file: chat.js:92 ~ sendMessageAction ~ response:",
        response,
      );

      dispatch({
        type: Types.FETCH_CHAT_HISTORY,
        payload: {
          chatHistory: [
            ...messageData,
            ...[
              {
                chat_id: item?.roomId,
                message: messageText,
                // mediaLink: mediaImg ? mediaImg : '',
                createdAt: moment().format(),
                reciever: {
                  first_name: item?.first_name,
                  last_name: item?.last_name,
                  profile_image: item?.profile_image,
                  _id:
                    item?.receiver === user?.data?.checkUser?._id
                      ? item?.sender
                      : item?.receiver,
                },
                sender: {
                  first_name: user?.data?.checkUser?.first_name,
                  last_name: user?.data?.checkUser?.last_name,
                  profile_image: user?.data?.checkUser?.profile_image,
                  _id: senderId,
                },
                updatedAt: moment().format(),
                media: mediaImg ? mediaImg.path : "",
                media_type: mediaImg.mime?.split("/")[0],
                _id: response?.data?.data?._id,
              },
            ],
          ],
        },
      });
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     chat_id: item?.roomId,
      //     message: messageText,
      //     // mediaLink: mediaImg ? mediaImg : '',
      //     createdAt: moment().format(),
      //     reciever: {
      //       first_name: item?.first_name,
      //       last_name: item?.last_name,
      //       profile_image: item?.profile_image,
      //       _id:
      //         item?.receiver === user?.data?.checkUser?._id
      //           ? item?.sender
      //           : item?.receiver,
      //     },
      //     sender: {
      //       first_name: user?.data?.checkUser?.first_name,
      //       last_name: user?.data?.checkUser?.last_name,
      //       profile_image: user?.data?.checkUser?.profile_image,
      //       _id: senderId,
      //     },
      //     updatedAt: moment().format(),
      //     media: mediaImg ? mediaImg.path : '',
      //     media_type: mediaImg.mime?.split('/')[0],
      //     _id: response?.data?.data?._id,
      //   },
      // ]);
      if (response.status === 200) {
        return response.data;
      } else {
        alert("An error has occurred 90909");
        return;
      }
    } catch (error) {
      console.log("🚀 ~ file: chat.js:94 ~ sendMessageAction ~ error:", error);
      alert("An error has occurred");
      return;
    }
  };

export const deleteChatFriendAction = (id) => async (dispatch) => {
  try {
    await API.v1.Chat.deleteChatFriend(id);

    dispatch({
      type: Types.DELETE_CHAT,
      payload: {
        id: id,
      },
    });
    // setChatId('');
    // refRBSheet.current.close();
  } catch (error) {
    console.log(error, "error delete chat frnd");
  }
};
export const chatCount = (body) => async (dispatch) => {
  try {
    const data = await API.v1.Chat.chatUnreadCount();
    console.log(
      "🚀 ~ file: minis.js:491 ~ notificationCount ~ data:",
      data?.data,
    );
    dispatch({
      type: Types.CHAT_COUNT,
      payload: { count: data?.data?.count },
    });
  } catch (error) {
    console.log("🚀 ~ file: chat.js:225 ~ chatCount ~ error:", error);
  }
};
export const chatreadedAction = (body) => async (dispatch) => {
  try {
    const data = await API.v1.Chat.chatreaded(body);
    console.log(
      "🚀 ~ file: minis.js:491 ~ notificationCount ~ data:",
      data?.data,
    );
    // dispatch({
    //   type: Types.CHAT_COUNT,
    //   payload: { count: data?.data?.count },
    // });
  } catch (error) {
    console.log("🚀 ~ file: chat.js:225 ~ chatCount ~ error:", error);
  }
};
export const deleteMessagedAction =
  (id, refRBSheet, setMessageId) => async (dispatch) => {
    try {
      await API.v1.Chat.deleteChatMessage(id);

      dispatch({
        type: Types.DELETE_CHAT_MESSAGE,
        payload: {
          messageId: id,
          deleteMessage: "This message is deleted",
          isDeleted: true,
        },
      });

      setMessageId("");
      refRBSheet.current.close();
    } catch (error) {
      console.log(error, "error delete chat message");
    }
  };
