import React, {useEffect, useRef} from 'react';
import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';
import {useDispatch} from 'react-redux';
import {meetExpire_room} from '../../Store/Actions/minis';
import {
  decodeMeetID,
  generateRandomMeetId,
  interStitialAdsWithInAppSHOW,
} from '../../Utils/helpers';
import {Text, View} from 'react-native';

const VideoCall = ({route, navigation}) => {
  const roomId = route?.params?.RoomID;

  // const rndm = decodeMeetID(roomId);

  const rndm = generateRandomMeetId();
  useEffect(() => {
    const interval = setInterval(interStitialAdsWithInAppSHOW, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, []);
  const jitsiMeeting = useRef();
  const dispatch = useDispatch();

  const onCallEnd = async () => {
    // await interStitialAdsWithInAppSHOW();
    // const body = { room: roomId };
    // await dispatch(meetExpire_room(body));
    navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
  };

  return rndm ? (
    <JitsiMeeting
      flags={{
        'call-integration.enabled': true,
        'fullscreen.enabled': true,
        'add-people.enabled': false,
        'chat.enabled': false,
        'invite.enabled': false,
        'security-options.enabled': false,
        'car-mode.enabled': false,
        'settings.enabled': false,
        'live-streaming.enabled': false,
        'tile-view.enabled': false,
      }}
      eventListeners={{
        onConferenceJoined: e => {
          interStitialAdsWithInAppSHOW();
        },
        onReadyToClose: async e => {
          onCallEnd();
        },
        onParticipantJoined: e => console.log(e, 'onParticipantJoined'),
        onConferenceFocused: e => console.log(e, 'onConferenceFocused'),
        onConferenceLeft: e => {
          onCallEnd();
        },
        onEnterPictureInPicture: e => console.log(e, 'onEnterPictureInPicture'),
      }}
      ref={jitsiMeeting}
      style={{flex: 1}}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4QjIzQTRCQTg1REU4NUQyOTIyNzAzRjMxOTQ5NjkzNCIsImlzcyI6IjhCMjNBNEJBODVERTg1RDI5MjI3MDNGMzE5NDk2OTM0Iiwic3ViIjoiKiIsInJvb20iOiIqIiwiaWF0IjoxNzAxMTA4ODA3LCJuYmYiOjE3MDEwOTk3MjAsImV4cCI6MTc0MTgwODUyMH0.VuPKduPs0droOLlH05w9QeL9ZNdEDyWmeSnTFzaXcJQ"
      room={'searchnew'}
      serverURL={'https://meet.shareslate.fun/'}
    />
  ) : (
    <View style={{backgroundColor: 'red'}}>
      <Text>It does not exist. Room Id check kr lo</Text>
      <Text>It does not exist. Room Id check kr lo</Text>
      <Text>It does not exist. Room Id check kr lo</Text>
    </View>
  );
};

export default VideoCall;
