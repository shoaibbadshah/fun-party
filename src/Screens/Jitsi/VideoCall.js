import React, {useEffect, useRef, useState} from 'react';
import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {useDispatch} from 'react-redux';
import {meetExpire_room} from '../../Store/Actions/minis';
import {
  decodeMeetID,
  generateRandomMeetId,
  interStitialAdsWithInAppSHOW,
  isIos,
} from '../../Utils/helpers';
import {Text, View, StatusBar} from 'react-native';
import {interstitial} from '../../../App';
import {AdEventType} from 'react-native-google-mobile-ads';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const VideoCall = ({route, navigation}) => {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
  const roomId = route?.params?.roomId; //roomId
  console.log('🚀 ~ VideoCall ~ roomId:', roomId);

  // const rndm = decodeMeetID(roomId);
  const [loaded, setLoaded] = useState(false);
  const [adLoaded, setAdLoaded] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     },
  //   );

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(
  //     interstitial.loaded ? interstitial.show() : interstitial.load(),
  //     1 * 60 * 1000,
  //   ); // 10 minutes in milliseconds

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  const jitsiMeeting = useRef();
  const dispatch = useDispatch();

  const onCallEnd = async () => {
    // await interStitialAdsWithInAppSHOW();
    const body = {room: roomId};
    interstitial.loaded ? interstitial.show() : interstitial.load();
    await dispatch(meetExpire_room(body));
    navigation.replace(NAVIGATION_ROUTES.PROFILE);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 25,
        // paddingTop: Platform.OS === 'ios' ? '12%' : '8%',
      }}>
      <View
        style={{
          // borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          marginBottom: 5,
          overflow: 'hidden',
          display: adLoaded ? 'flex' : 'none',
        }}>
        <BannerAd
          // unitId={adUnitId}
          unitId={
            !isIos
              ? 'ca-app-pub-3686012001393355/3621783252'
              : 'ca-app-pub-3686012001393355/1358033256'
          }
          size={BannerAdSize.BANNER}
          onAdFailedToLoad={() => {
            setAdLoaded(false);
          }}
          onAdLoaded={() => {
            setAdLoaded(true);
          }}
          requestOptions={{
            networkExtras: {
              collapsible: 'top',
            },
          }}
        />
      </View>
      <JitsiMeeting
        flags={{
          'fullscreen.enabled': true,
          'add-people.enabled': false,
          'chat.enabled': false,
          'invite.enabled': false,
          'security-options.enabled': false,
          'car-mode.enabled': false,
          'settings.enabled': false,
          'live-streaming.enabled': true,
          'tile-view.enabled': true,
        }}
        eventListeners={{
          onConferenceJoined: e => {
            //interStitialAdsWithInAppSHOW();
            interstitial.loaded ? interstitial.show() : interstitial.load();
          },
          onReadyToClose: async e => {
            onCallEnd();
          },
          onParticipantJoined: e => console.log(e, 'onParticipantJoined'),
          onConferenceFocused: e => console.log(e, 'onConferenceFocused'),
          onConferenceLeft: e => {
            onCallEnd();
          },
          onEnterPictureInPicture: e =>
            console.log(e, 'onEnterPictureInPicture'),
        }}
        ref={jitsiMeeting}
        style={{flex: 1}}
        token={
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4QjIzQTRCQTg1REU4NUQyOTIyNzAzRjMxOTQ5NjkzNCIsImlzcyI6IjhCMjNBNEJBODVERTg1RDI5MjI3MDNGMzE5NDk2OTM0Iiwic3ViIjoiKiIsInJvb20iOiIqIiwiaWF0IjoxNzAxMTA4ODA3LCJuYmYiOjE3MDEwOTk3MjAsImV4cCI6MTc0MTgwODUyMH0.VuPKduPs0droOLlH05w9QeL9ZNdEDyWmeSnTFzaXcJQ'
        }
        room={roomId}
        serverURL={'https://meet.shareslate.fun/'}
      />
    </View>
  );
};

export default VideoCall;
