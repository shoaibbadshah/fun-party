import axios from 'axios';

import Auth from './Auth';
import Chat from './Chat';
import Minis from './Minis';
import Support from './Support';
import Profile from './Profile';
import {store} from '../Store/store';
import Notifications from './Notifications';

export const PATHS = '';

export const api = axios.create({
  baseURL: 'https://apis.shareslate.fun/api',
  // baseURL: 'https://da21-37-111-154-252.ngrok-free.app/api',
});

api.interceptors.request.use(
  async config => {
    const user = store.getState().user;

    if (user && user.data && user.data.token) {
      config.headers = {Authorization: `Bearer ${user.data.token}`};
      // config.headers = {
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwYWM5NTgyOTQyZGYxNTY1YjgyOTMiLCJwaG9uZV9ubyI6InNob2FpYi5yZWFjdG5hdGl2ZUBnbWFpbC5jb20iLCJpYXQiOjE2OTA5MTQ3ODN9.HzXqreqF4jRma1Yb__t0tnOwG1ucRngGDnXrFmkJxEM`,
      // };
      // config.headers = {
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4M2M4OTlhMDY5N2JiNDBmYmY4ZTUiLCJwaG9uZV9ubyI6InhvbWF0Mjk2MDRAbHVrYWF0LmNvbSIsImlhdCI6MTY4ODc2MjU1NX0.TbGkD3qhdCOGGs4NG7Q5Lj7RzIiKzPvgA53zeYmXk4k`,
      // };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export const API = {
  v1: {
    Chat,
    Auth,
    Minis,
    Support,
    Profile,
    Notifications,
  },
};
