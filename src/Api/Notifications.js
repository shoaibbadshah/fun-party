import { api } from "./index";

export default {
  fetchNotificationsList: (page) =>
    api.get(`/notifications?limit=10&page=${page}`),
  changeNotificationStatus: (body) => api.patch(`/notifications`, body),
};
