import {api} from './index';

export default {
  fetchNotificationsList: page =>
    api.get(`/notifications/watch_party_notification?limit=10&page=${page}`),
  changeNotificationStatus: body => api.patch(`/notifications`, body),
};
