import Svg, { Rect, Defs, Pattern, Use, Path } from 'react-native-svg';
import React from 'react';
import { Image, View } from 'react-native';
import profileImage from './profile.png';
import Avatar from './Avatar';

const ProfileIcon = ({ color, profileImg }) => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 200,
        //borderWidth: 3,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!profileImg ? (
        <Avatar color={color} />
      ) : (
        <Image
          source={{ uri: profileImg }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            // backgroundPosition: 'center',
          }}
        />
      )}
    </View>
  );
};

export default ProfileIcon;
