import {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {checkImageUrl} from '../Utils/helpers';
import {userFollow, userFollowing} from '../Store/Actions/minis';

export default function UserListItem({item}) {
  const dataProfile = useSelector(e => e.profile?.profile?.following);
  const [is_followed, setis_followed] = useState(
    _.some(dataProfile, object => _.isEqual(object, item?._id)),
  );

  const ref = useRef({
    ClickedID: '',
  });

  const [loadingFollow, setLoadingFollow] = useState(false);
  const dispatch = useDispatch();
  const unFollowMe = id => {
    const body = {
      following_id: id?._id,
    };

    ref.current.ClickedID = id?._id;
    dispatch(userFollowing(body, null, setLoadingFollow, setis_followed));
  };

  const followMe = id => {
    const body = {
      following_id: id?._id,
    };
    ref.current.ClickedID = id?._id;
    dispatch(userFollow(body, null, setLoadingFollow, setis_followed));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        width: '90%',
        height: 45,
        marginHorizontal: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: checkImageUrl(
              item.profile_image,
              `https://ui-avatars.com/api/?background=random&name=${item?.first_name}+${item?.last_name}`,
            ),
          }}
          style={{
            borderColor: 'grey',
            borderRadius: 40,
            borderWidth: 1,
            width: 40,
            height: 40,
          }}
          resizeMode="cover"
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{color: 'white', fontWeight: 'bold',alignSelf:'flex-start'}}>
            {item?.first_name
              ? item?.first_name + ' ' + item?.last_name
              : item?.user_name}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 65,
          height: 30,
          padding: 0,
          borderRadius: 5,
          elevation: 0,
          backgroundColor: '#5E72E4',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={async () => {
          is_followed ? unFollowMe(item) : followMe(item);
        }}>
        {loadingFollow && ref.current.ClickedID === item?._id ? (
          <ActivityIndicator color={'white'} size={15} />
        ) : (
          <Text
            style={{
              fontSize: is_followed ? 12 : 14,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {is_followed ? 'Following' : 'Follow'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
