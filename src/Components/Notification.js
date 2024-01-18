import {View, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import React from 'react';
import Image from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {NOTIFICATIONS} from '../Utils/notificationsTypes';
import {WatchPartyAppUrl, checkImageUrl, timeSince} from '../Utils/helpers';
import {onNotificationTap} from '../Store/Actions/notifications';

export default function Notification({item}) {
  // console.log('🚀 ~ file: Notification.js:13 ~ Notification ~ item:', item);
  const theme = useSelector(e => e.theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function extractMeetParameter(url) {
    const match = url.match(/[?&]meet=([^&]+)/);
    return match && match[1];
  }
  const handleNavigation = Clickeditem => {
    const getRoom = item?.web_link;

    const url = getRoom;
    const meetParameter = extractMeetParameter(url);

    // Output the parameter
    console.log('Your parameter:', meetParameter);
    // console.log(idJitsi, 'newe one ');
    if (item.type === NOTIFICATIONS.Watch_Party_Invitation.type) {
      // console.log(
      //   '🚀 ~ file: Notification.js:30 ~ handleNavigation ~ item:',
      //   item,
      // );
      dispatch(onNotificationTap(item._id));
      if (!item?.is_room_expired) {
        // dispatch(onNotificationTap(item._id));
        navigation.navigate(NAVIGATION_ROUTES.JITSI, {roomId: meetParameter});
      } else {
        Alert.alert('Fun Party ', 'FunParty was ended by the owner');
      }
    }
  };

  return item.type === NOTIFICATIONS.Watch_Party_Invitation.type ? (
    <TouchableOpacity
      onPress={() => handleNavigation(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: item.is_read ? theme.notiRead : theme.notiUnread,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}>
        <View>
          <Image
            source={{
              uri: checkImageUrl(
                item?.created_by?.profile_image,
                `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
              ),
            }}
            style={{
              borderRadius: 40,
              width: 55,
              height: 55,
              marginRight: 5,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginRight: 8,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              flexWrap: 'wrap',
              color: theme.text,
              fontSize: 16,
            }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 16,
                fontWeight: '800',
                textTransform: 'capitalize',
              }}>
              {item?.from?.first_name} {item?.from?.last_name}{' '}
            </Text>

            {item?.body}
          </Text>
        </View>
        <View>
          {item.type === NOTIFICATIONS.Watch_Party_Invitation.type ? (
            <TouchableOpacity
              disabled={item?.is_room_expired}
              style={{
                width: 75,
                height: 35,
                padding: 0,
                borderRadius: 52,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 0,
                backgroundColor: '#5E72E4',
              }}
              onPress={() => handleNavigation(item)}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {item?.is_room_expired ? 'Expired' : 'Join now'}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{color: theme.textDarkGrey, fontSize: 12}}>
              {timeSince(new Date(item.createdAt))}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <Text>New text</Text>
    </View>
  );
}
