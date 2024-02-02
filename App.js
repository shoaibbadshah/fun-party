import React, {useEffect, useState, useRef} from 'react';
import Toast, {ErrorToast} from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';
import RootNavigator from './src/Utils/Navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {LogBox, StatusBar} from 'react-native';

import {isIos} from './src/Utils/helpers';

import messaging from '@react-native-firebase/messaging';
import {navigate, navigationRef} from './src/Utils/Navigation/navigationRef';
import {NAVIGATION_ROUTES} from './src/Utils/Navigation/NavigationRoutes';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  AdEventType,
  AppOpenAd,
  InterstitialAd,
  MobileAds,
  TestIds,
} from 'react-native-google-mobile-ads';

const toastConfig = {
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        color: 'white',
        fontSize: 16,
      }}
      text2Style={{}}
      style={{backgroundColor: '#e60808', borderRadius: 8}}
    />
  ),
};

// const segment = new IronSourceSegment();
const adUnitIdINtersial = 'ca-app-pub-3686012001393355/1140463298';

export const interstitial = InterstitialAd.createForAdRequest(
  adUnitIdINtersial,
  {
    keywords: ['fashion', 'clothing'],
  },
);
const adUnitIdOPENAPP = 'ca-app-pub-3686012001393355/2221433064';

export const appOpenAd = AppOpenAd.createForAdRequest(adUnitIdOPENAPP, {
  keywords: ['fashion', 'clothing'],
});
const App = () => {
  LogBox.ignoreAllLogs();
  const [initialURL, setInitialURL] = useState();

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log(
          '🚀 ~ file: FunPartyInvite.js:104 ~ useEffect ~ link:',
          link,
        );
        if (link.url) {
          handleDynamicLink(link);
          // navigate(NAVIGATION_ROUTES.JITSI, {
          //   roomId:link
          // });
          // ...set initial route as offers screen
        }
      });
  }, []);

  useEffect(() => {
    _createChannel();
    requestPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      isIos &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          data: remoteMessage.data,
        });
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  appOpenAd.load();
  appOpenAd.loaded ? appOpenAd.show() : appOpenAd.load();
  // console.log('🚀 ~ App ~ appOpenAd.loaded:', appOpenAd.loaded);
  // appOpenAd.show();
  // }, [appOpenAd.loaded]);
  console.log('🚀 ~ App ~ appOpenAd.loaded:', appOpenAd.loaded);

  const requestPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
    }
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'share_slate_funParty',
        channelName: 'Share Slate Fun Party',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
  };

  const handleDynamicLink = async link => {
    if (link?.url) {
      let getId = link.url.split('?').pop();
      const miniID = getId.split('=').pop();

      const getRoute = link.url?.split('?')[1];

      const from = getRoute.split('=')[0];
      navigate(NAVIGATION_ROUTES.JITSI, {
        roomId: getRoute,
      });
    }
  };

  //

  const theme = useSelector(e => e.theme);
  return (
    <>
      <StatusBar barStyle={theme.statusbar} />
      <RootNavigator initial={initialURL} />
      <Toast config={toastConfig} />
    </>
  );
};

export default App;

export function showCustomAlert2(message, centerText, leftText, rightText) {
  App.showCustomAlert(message, centerText, leftText, rightText);
}
