import { combineReducers } from 'redux';
import { themeReducer } from './theme';
import userReducer from './user';
import minisReducer from './minisReducer';
import profileReducer from './profileReducer';
import userMinisReducer from './fetchUserMinis';
import userFollowerFollowingReducer from './fetchFollowerFollowing';
import fetchCommentsReducer from './fetchCommentsReducer';
import subscribeMiniReducer from './subscribeReducer';
import previewMinisReducer from './previewMinisReducer';
import otherUserMinisReducer from './fetchOtherUserMinis';
import notificationsReducer from './notificationsReducer';
import trendingMiniRepliesReducer from './trendingMiniRepliesReducer';
import guestUserReducer from './guestUserReducer';
import suportReducer from './suportReducer';
import userMinisMentionReducer from './fetchUserMentionMinis';
import otherUserMinisMentionReducer from './fetchOtherUserMentionMinis';
import userMinisSavedReducer from './fetchUserSavedMinis';

import insightsReducer from './insightReducer';
import fetchWalletReducer from './fetchWalletReducer';
import userMonthlyHistory from './fetchMonthlyTransaction';
import nearMeMiniReducer from './nearmeMiniReducer';
import chatFriendsReducer from './fetchChatFriends';
import lvReducer from './lvReducer';
import lvMoreVideosReducer from './lvMoreVideosReducer';
import friendSuggestionsReducer from './friendSuggestionsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  minis: minisReducer,
  longVideos: lvReducer,
  lvMoreVideos: lvMoreVideosReducer,
  subscribe: subscribeMiniReducer,
  // nearMeMinis: nearMeMiniReducer,
  userMinis: userMinisReducer,
  userMentionMinis: userMinisMentionReducer,
  userSavedMinis: userMinisSavedReducer,
  otherUserMentionMinis: otherUserMinisMentionReducer,
  profile: profileReducer,
  userFollowerFollowing: userFollowerFollowingReducer,
  comments: fetchCommentsReducer,
  previewMinis: previewMinisReducer,
  otherUserMinis: otherUserMinisReducer,
  notifications: notificationsReducer,
  trendingMiniReplies: trendingMiniRepliesReducer,
  guestUser: guestUserReducer,
  suport: suportReducer,
  insights: insightsReducer,
  wallet: fetchWalletReducer,
  monthlyTransaction: userMonthlyHistory,
  chatFriends: chatFriendsReducer,
  friendSuggestionsReducer: friendSuggestionsReducer
});
export default rootReducer;
