import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';

const FlashIcon = ({ color }) => (
  // <MaterialCommunityIcons name='google-circles-extended' size={20} />
  <Svg
    width={30}
    height={30}
    viewBox='0 0 320 512'
    fill={color}
    style={{ marginRight: 15 }}
  >
    <Path
      stroke={!color && '#fff'}
      fill={!color && 'transparent'}
      strokeWidth={!color && 27}
      d='M 194.82 496 a 18.36 18.36 0 0 1 -18.1 -21.53 v -0.11 L 204.83 320 H 96 a 16 16 0 0 1 -12.44 -26.06 L 302.73 23 a 18.45 18.45 0 0 1 32.8 13.71 c 0 0.3 -0.08 0.59 -0.13 0.89 L 307.19 192 H 416 a 16 16 0 0 1 12.44 26.06 L 209.24 489 a 18.45 18.45 0 0 1 -14.42 7 Z'
    />
  </Svg>
);

export default FlashIcon;
