import { api } from "./index";

export default {
  fetchProfile: () => api.get("/users/profile"),
  updateProfile: (body, config) => api.put("/users/edit_profile", body, config),
  fetchUserMini: (page) =>
    api.get(`/minis/self_minis_list?limit=100&page=${page}`),

  //long videos profile
  fetchUserLv: (page) =>
    api.get(`/minis/self_longs_list?limit=10&page=${page}`),
  fetchOtherUserLv: (page, body) =>
    api.post(`/minis/other_user_longs?limit=10&page=${page}`, body),
  //end

  fetchOtherUserMini: (page, body) =>
    api.post(`/minis/other_user_minis?limit=100&page=${page}`, body),
  fetchUserMentionMini: () => api.get("/minis/get_mentioned_minis"),
  fetchUserSavedMini: () => api.get("/minis/saved_minis"),
  fetchUserSavedLongVideo: () => api.get("/minis/saved_longs"),
  fetchOtherUserMentionMini: (id) =>
    api.get(`/minis/get_mentioned_minis?userId=${id}`),
  userFollowersAndFollowings: () =>
    api.get("/users/get_self_follower_folloing_list"),
  userContacts: () => api.get("/users/friend_suggestions"),
  fetchOtherProfile: (id) => api.get(`/users/get_profile/${id}`),
  otherFollowersAndFollowings: (id) =>
    api.get(`/users/get_other_follower_folloing_list/${id}`),

  updatePrivacy: (body) => api.put("/users/update_privacy_setting", body),
  updateNoficationSetting: (body) =>
    api.put("/users/update_notification_setting", body),
  fetchUserInvitables: () => api.get("/users/get_inviteable"),
  blockUserAccount: (body) => api.post("/users/block_user", body),
  unblockUserAccount: (body) => api.post("/users/unblock_user", body),
  fetchBlockedAccounts: () => api.get("/users/block_users_list"),

  fetchAllUsers: () => api.get("/users/get_users"),
  getUserWallet: () => api.get("/users/get_wallet"),

  resendOtp: (body) => api.post("/users/resend_otp", body),

  //authorize.net
  chargeCridetCard: (body) => api.post("/payment/process_payment", body),
  capture_InAppPurchase: (body) =>
    api.post("/payment/capture_InAppPurchase", body),

  getMonthlyTransaction: (body) => api.post("/users/closing_banlance", body),
  connectionMiniLong: (body) => api.post("/minis/mini_related_long", body),
  sendCointoUser: (body) => api.post("/users/send_credit", body),
  contactsSave: (body) => {
    return api.post("/users/update_phone_book", body);
  },
};
