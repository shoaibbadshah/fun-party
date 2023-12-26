import { api } from "./index";

export default {
  // createMini: (body) => api.post('/minis/create_long', body),
  createMini: (body) => api.post("/minis/create_minis", body),
  deleteMini: (id) => api.delete(`/minis/delete_mini/${id}`),
  editMini: (id, body) => api.put(`/minis/edit_mini/${id}`, body),

  savedMini: (body) => api.post("/minis/saved_mini_byId", body),
  fetchMinis: (page) =>
    api.get(
      `/minis/trending_minis?limit=30&page=${page?.page}&country=${page?.country}`,
      // `/minis/trending_minis?limit=10&page=${page?.page}&country=India`,
    ),
  fetchPublicMinis: (page) =>
    api.get(`/minis/trending_minis_public?limit=10&page=${page}`),

  // Long Videos
  fetchLongVideos: (page) => api.get(`minis/long_public?limit=5&page=${page}`),
  searchLongVideos: (caption) =>
    api.get(`/minis/search_long/?caption=${caption}`),

  loadMoreLongVideos: (caption) =>
    api.get(`/minis/long_suggestion/${caption}?limit=20&page=1`),
  //END

  //watch party
  inviteToFunParty: (body) => api.post(`/minis/watch_party_invitation`, body),
  expire_room: (body) => api.post(`/minis/expire_room`, body),

  subscribeMini: (page) =>
    api.get(`/minis/following_minis?limit=10&page=${page}`),
  nearMeMinis: (page) => api.get(`/users/near_me_minis?limit=4&page=${page}`),

  searchMini: (caption) => api.get(`/minis/search_minis/?caption=${caption}`),
  searchTags: (caption) => api.post("/minis/hashtag_search", caption),
  searchLocations: (caption) => api.post("/minis/location_search", caption),
  searchPreview: (page) =>
    api.get(`/minis/search_previews?limit=12&page=${page}`),

  fetchComments: (id) => api.get(`/minis/get_comments/${id}`),
  postComment: (body) => api.post("/minis/create_comment", body),
  replyComment: (body) => api.post("/minis/create_comment_reply", body),

  deleteComment: (body) => api.delete("/comments/delete_mini_comment", body),
  deleteCommentReply: (body) => api.delete("/minis/delete_comment_reply", body),
  editComment: (body, id) =>
    api.put(`/comments/edit_mini_comments/${id}`, body),
  editCommentReply: (body) => api.put(`/minis/edit_comment_reply`, body),

  userFollow: (body) => api.post("/users/follow_user", body),
  miniViewCount: (body) => api.get("/minis/get_minis_viewcount/" + `${body}`),

  userFollowing: (body) => api.post("/users/unfollow_user", body), // Written By @Shoaib, I think this should be in the user file separate @Zubair

  miniLike: (body) => api.post("/minis/create_like_dislike", body),
  miniReport: (body) => api.post("/report", body),
  notifyCount: () => api.get("/notifications/unread_count"),
  getTrendingMiniReplies: (body, pagination) =>
    api.post(
      `/minis/get_reply_minis?limit=${pagination.limit}&page=${pagination.page}`,
      body,
    ),
  sendMiniChallengeInvite: (body) => api.post("/minis/send_challange", body),

  fetchHashtTags: () => api.get("/minis/get_all_hashtags"),

  fetchInsights: (id) => api.get(`/minis/get_miniStatistics/${id}`),
  fetchAllAnalytics: (id) => api.get(`/minis/get_user_mini_statistics`),
};
