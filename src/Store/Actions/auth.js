import {Alert} from 'react-native';

import {API} from '../../Api';
import {setUser} from './user';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {Types} from '../Types/type';
import {statusCodes} from '@react-native-google-signin/google-signin';

export const Signupapi = body => async dispatch => {
  try {
    const {data} = await API.v1.Auth.signup(body);
    Alert.alert('Registration Success', data.message);
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }
};
export const SignInApi = (body, navigation, setLoading) => async dispatch => {
  try {
    const data = await API.v1.Auth.login(body);

    await dispatch(setUser(data.data.data));
    navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
    // setLoading(false);
  } catch (error) {
    console.log('🚀 ~ file: auth.js:24 ~ SignInApi ~ error:', error);
    setLoading(false);
    Alert.alert(
      'Login Failed',
      'Invalid username or password. Please check your credentials and try again',
    );
    // Alert.alert('Login Failed', error.response.data.message?.email?.msg);
  }
};

export const SignInGuest = (navigation, setGuestLoading) => async dispatch => {
  try {
    const data = await API.v1.Auth.loginAsGuest();
    dispatch({
      type: Types.GUEST_USER,
      payload: {
        guestUser: data?.data?.data,
      },
    });
    navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
    setGuestLoading(false);
  } catch (error) {
    console.log('🚀 ~ file: auth.js:43 ~ SignInGuest ~ error:', error);
    setGuestLoading(false);
  }
};
export const resendOtp = body => async () => {
  console.log('🚀 ~ file: auth.js:54 ~ resendOtp ~ body:', body);
  try {
    const bodyData = {email: body};
    const data = await API.v1.Profile.resendOtp(bodyData);
    console.log('🚀 ~ file: auth.js:58 ~ data:', data);
    Alert.alert('OTP sent', data?.data?.message);
  } catch (error) {
    // Alert.alert("OTP sent", "error");
    console.log('🚀 ~ file: auth.js:67 ~ error:', error);
  }
};

export const googleLogin = (body, navigation) => async dispatch => {
  try {
    const data = await API.v1.Auth.googleLogin(body);

    await dispatch(setUser(data.data.data));
    navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
  } catch (error) {
    Alert.alert(
      'Connecting with google failed',
      error?.response?.data?.message,
    );
  }
};

export const appleLogin = (body, navigation) => async dispatch => {
  try {
    const data = await API.v1.Auth.appleLogin(body);

    if (data.data.data.token) {
      await dispatch(setUser(data.data.data));
      navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
    } else {
      Alert.alert('login with apple', 'no Token found for this user ');
    }
  } catch (error) {
    console.log('🚀 ~ file: auth.js:64 ~ appleLogin ~ error:', error);

    Alert.alert('Login Failed', 'Connecting with apple failed');
  }
};
