import { api } from './index';

export default {
  login: (body) => api.post('users/login', body),
  googleLogin: (body) => api.post('/users/google_login', body),
  appleLogin: (body) => api.post('/users/apple_login', body),
  appleLoginVerify: (body) => api.post('/users/verifyUser_apple_id', body),
  signup: (body) => {
    return api.post('/users/signup', body);
  },

  forgetPassword: (body) => {
    return api.put('/users/forget_password', body);
  },
  changePassword: (body) => {
    return api.post('/users/change_password', body);
  },
  logout: (body) => api.post('users/logout', body),
  loginAsGuest: () => api.post('/users/guest_login'),
  deleteProfile: () => api.put('/users/deactive_profile'),
};
