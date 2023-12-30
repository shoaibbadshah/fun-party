import React, {useEffect, useState, useRef} from 'react';
import Toast, {ErrorToast} from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';
import RootNavigator from './src/Utils/Navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {
  Appearance,
  Linking,
  LogBox,
  StatusBar,
  Alert,
  AppState,
} from 'react-native';
import {DarkMode, LightMode} from './src/Store/Actions/theme';
import {isIos} from './src/Utils/helpers';
import socketServcies from './src/Utils/socketServcie';
import {Types} from './src/Store/Types/type';
import messaging from '@react-native-firebase/messaging';
import {navigate, navigationRef} from './src/Utils/Navigation/navigationRef';
import {NAVIGATION_ROUTES} from './src/Utils/Navigation/NavigationRoutes';
import {store} from './src/Store/store';
import * as Sentry from '@sentry/react-native';
import axios from 'axios';
// import Smartlook from "smartlook-react-native-wrapper";
// import {
//   IronSource,
//   IronSourceSegment,
//   IronSourceRewardedVideo,
//   IronSourceInterstitials,
//   IronSourceOfferwall,
//   IronSourceBanner,
// } from "@wowmaking/react-native-iron-source";
import {GetCountry, notificationCount} from './src/Store/Actions/minis';
import {fetchOtherProfile} from './src/Store/Actions/profile';
// import {AdEventType} from 'react-native-google-mobile-ads';
import {checkVersion} from 'react-native-check-version';
import DeviceInfo from 'react-native-device-info';
// import { Alert, Linking } from "react-native";
import {StripeProvider} from '@stripe/stripe-react-native';
import CustomAlert from './src/Components/CustomAlert';
import {
  UserTimeTrackEndAction,
  UserTimeTrackStartAction,
} from './src/Store/Actions/userActivity';
import {config} from 'yarn/lib/cli';

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

const App = () => {
  LogBox.ignoreAllLogs();
  const [initialURL, setInitialURL] = useState();
  const dispatch = useDispatch();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [firstLoadClose, setFirstLoadClose] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLeftText, setmodalLeftText] = useState('');
  const [modalRightText, setmodalRightText] = useState('');
  const [modalCenterText, setmodalCenterText] = useState('');
  const [modaltotalbtn, setmodaltotalbtn] = useState(1);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMsg, setModalMsg] = useState('');
  function showCustomAlert({message, centerText, leftText, rightText}) {
    setModalMsg(message);
    setmodalCenterText(centerText);
    setmodalLeftText(leftText);
    setmodalRightText(rightText);
    setModalVisible(true);
  }

  function hideCustomAlert() {
    setCustomAlertVisible(false);
  }
  // const cTable = require('console.table');
  const options = {
    bundleId: DeviceInfo.getBundleId(), // Specify the bundleId here
    // Other options...
  };
  // useEffect(() => {
  //   IronSource.setConsent(true);

  //   segment.setCustomValue("VALUE").forKey("KEY");
  //   segment.setSegmentName("NAME");
  //   segment.activate();

  //   IronSource.initializeIronSource("1b1bd55cd", "FUN-ShareSlate", {
  //     validateIntegration: false,
  //   }).then(() => {});
  // }, []);

  // const showInterstitial = () => {
  //   const onClose = () => IronSourceInterstitials.removeAllListeners();

  //   IronSourceInterstitials.addEventListener("interstitialDidLoad", () => {
  //     IronSourceInterstitials.showInterstitial();
  //   });
  //   IronSourceInterstitials.addEventListener(
  //     "interstitialDidFailToLoadWithError",
  //     (err) => {
  //       console.warn("Failed to load inter", err);
  //       onClose();
  //     },
  //   );
  //   IronSourceInterstitials.addEventListener(
  //     "interstitialDidFailToShowWithError",
  //     (err) => {
  //       console.warn("Failed to show inter", err);
  //       onClose();
  //     },
  //   );
  //   IronSourceInterstitials.addEventListener("interstitialDidClose", () => {
  //     onClose();
  //   });

  //   IronSourceInterstitials.loadInterstitial();
  // };

  // const newMiniId = getMIniSocket();
  // console.log("🚀 ~ file: App.js:106 ~ App ~ newMiniId:", newMiniId);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const user = store.getState().user;
  const {data, isOnBaorded} = useSelector(({user}) => user);
  useEffect(() => {
    if (data) {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (
          appState.current === 'background' ||
          appState.current === 'inactive'
        ) {
          axios
            .post(
              'https://apis.shareslate.fun/api/users/session/end',
              {},
              {
                headers: {
                  Authorization: `Bearer ${user.data.token}`,
                },
              },
            )
            .then(response => {
              console.log('Response data in inactive:', response.data);
            })
            .catch(error => {
              console.error('Error:end', error);
            });
        }
        if (appState.current === 'active') {
          axios
            .post(
              'https://apis.shareslate.fun/api/users/session/start',
              {},
              {
                headers: {
                  Authorization: `Bearer ${user.data.token}`,
                },
              },
            )
            .then(response => {
              console.log('Response data:', response.data);
            })
            .catch(error => {
              console.error('Error:active', error);
            });
        }
        console.log('AppState', appState.current);
      });
      if (appStateVisible === 'active') {
        axios
          .post(
            'https://apis.shareslate.fun/api/users/session/start',
            {},
            {
              headers: {
                Authorization: `Bearer ${user.data.token}`,
              },
            },
          )
          .then(response => {
            console.log('Response data:', response.data);
          })
          .catch(error => {
            console.error('Errorstart:', error);
          });
      }
      console.log('appStateVisible', appStateVisible);

      return () => {
        subscription.remove();
      };
    }
  }, []);

  useEffect(() => {
    socketServcies.initializeSocket();
    // Smartlook?.setupAndStartRecording(
    //   "6d95f80aeaf20eddb4cf074342ca27d909d2d9ba",
    // );
    // showInterstitial();
  }, []);
  // useEffect(() => {
  //   dispatch(GetCountry());
  //   dispatch(notificationCount());
  // });

  Sentry.init({
    dsn: 'https://4bdd9d769bea4b2d9bcc89388529efc1@o4505099501961216.ingest.sentry.io/4505246261116928',
    enableAutoSessionTracking: true,
    // Sessions close after app is 10 seconds in the background.
    sessionTrackingIntervalMillis: 10000,
  });
  const errorHandler = (error, isFatal) => {
    console.log(error.message);

    Sentry.captureException(error);
  };

  // Set the error handler
  ErrorUtils.setGlobalHandler(errorHandler);

  // useEffect(() => {
  //   const unsubscribe = interStitial_APP_Open.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       // interStitial_APP_Open.show();
  //       setRunning(true);
  //     },
  //   );
  //   // interStitial_APP_Open.load();
  //   console.log("first time");
  //   setFirstLoadClose(true);
  //   return unsubscribe;
  // }, [!laterAdd]);
  const [laterAdd, setLaterAdd] = useState(false);
  // useEffect(() => {
  //   if (firstLoadClose) {
  //     console.log("this is the first load");
  //     const unsubscribe = interStitialAdsWithInApp.addAdEventListener(
  //       AdEventType.LOADED,
  //       () => {
  //         // interStitialAdsWithInApp.show();
  //         setRunning(true);
  //       },
  //     );
  //     // interStitialAdsWithInApp.load();
  //     setLaterAdd(false);
  //     return unsubscribe;
  //   }
  //   console.log("second time");
  // }, [laterAdd != false]);
  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (timeElapsed > 30) {
      console.log(
        '🚀 ~ file: App.js:303 ~ useEffect ~ timeElapsed:',
        timeElapsed,
      );
      setRunning(false);
      // clearInterval(interval);
      setTimeElapsed(0);
      if (timeElapsed) {
        setRunning(true);
        setLaterAdd(true);
      }
    }
  }, [timeElapsed == 30]);
  useEffect(() => {
    socketServcies.on('mini', e => {
      dispatch({
        type: Types.LIKE_COUNT,
        payload: {
          like_id: e._id,
          like_count: e?.likes_count,
          is_like: e?.is_like,
        },
      });

      dispatch({
        type: Types.UPDATE_MINI,
        payload: {
          update_miniId: e._id,
          mini: e,
        },
      });
    });
  }, []);

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       console.log(link,'new one');
  //       handleDynamicLink(link);
  //     });
  //   const linkingListener = dynamicLinks().onLink(handleDynamicLink);
  //   return () => {
  //     linkingListener();
  //   };
  // }, []);

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
    getNotifications();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        '🚀 ~ file: App.js:291 ~ unsubscribe ~ remoteMessage:',
        remoteMessage,
      );
      dispatch(notificationCount());
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
        channelId: 'share_slate_fun',
        channelName: 'Share Slate Fun',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
  };

  const getNotifications = async () => {
    messaging().onNotificationOpenedApp(({notification}) => {
      console.log(
        '🚀 ~ file: App.js:335 ~ getNotifications ~ notification:',
        notification,
      );
      dispatch(notificationCount());
    });

    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          '🚀 ~ file: App.js:344 ~ getNotifications ~ remoteMessage:',
          remoteMessage,
        );
        dispatch(notificationCount());
      });
  };

  const handleDynamicLink = async link => {
    console.log('🚀 ~ file: App.js:226 ~ handleDynamicLink ~ link:', link);
    const user = store.getState().user;
    if (link?.url) {
      let getId = link.url.split('?').pop();
      const miniID = getId.split('=').pop();

      const getRoute = link.url?.split('?')[1];
      console.log(getRoute,'bew thi');
      const from = getRoute.split('=')[0];
      navigate(NAVIGATION_ROUTES.JITSI, {
        roomId: getRoute,
      });
      // if (user.data?.checkUser?._id && from == 'mini') {
      //   navigate(NAVIGATION_ROUTES.JITSI, {
      //     mini_id: miniID,
      //     from: 'app.js',
      //   });
      // } else if (user.data?.checkUser?._id && from == 'profile') {
      //   const userProfile = await dispatch(fetchOtherProfile(miniID));
      //   miniID === user.data?.checkUser?._id
      //     ? navigate(NAVIGATION_ROUTES.JITSI)
      //     : navigate(NAVIGATION_ROUTES.JITSI, {
      //         roomId: miniID,
      //       });
      // }
    }
  };

  //

  const versionCheck = async () => {
    const version = await checkVersion(options);

    if (version.needsUpdate) {
      Alert.alert(
        'Version update',
        'A new version of the app is available. Please update to continue using the app.',
        [
          {
            text: 'Not now',
            onPress: () => {},
          },
          {
            text: 'Update',
            onPress: () => {
              Linking.openURL(version?.url);
            },
          },
        ],
        {cancelable: false},
      );
    }
  };
  useEffect(() => {
    versionCheck();
    socketServcies.initializeSocket();
  }, []);

  const theme = useSelector(e => e.theme);
  return (
    // <StripeProvider publishableKey="pk_live_51JgDigIDLkUgIvmNGwVY2btHxXaO2DYfS0M5BikH9NjjYX9yuVX2vOzKmDhWUo2dlCmHSJJzOdSFOas3H6yOFu0800Z3fEO7h3">
    <>
      <StatusBar barStyle={theme.statusbar} />
      <RootNavigator initial={initialURL} />
      <Toast config={toastConfig} />
      <CustomAlert
        modalVisible={modalVisible}
        message={modalMsg}
        // centerBtn=}
        centerBtnText={modalCenterText}
      />
    </>
    // </StripeProvider>
  );
};

export default Sentry.wrap(App);
// export default App;
export function showCustomAlert2(message, centerText, leftText, rightText) {
  App.showCustomAlert(message, centerText, leftText, rightText);
}
