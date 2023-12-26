import { api } from "./index";

export default {
  createRoom: (body) => api.post("/users/create_room", body),
  messageHistory: (id) => api.get(`/users/message_list/${id}`),
  sendMessage: (body) => api.post("/users/send_message", body),
  getRooms: () => api.get("/users/get_room"),
  deleteChatFriend: (id) => api.delete(`/users/chat/${id}`),
  deleteChatMessage: (id) => api.delete(`/users/message/${id}`),
  chatUnreadCount: (id) => api.get(`/notifications/unread_message_count`),
  chatreaded: (body) =>
    api.patch(`/notifications/mark_message_as_read_notification`, body),
};
