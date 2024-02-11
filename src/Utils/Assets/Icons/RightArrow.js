import Svg, {Path} from 'react-native-svg';
import React from 'react';

const RightArrow = ({color, height, width, onPress}) => (
  <Svg
    onPress={onPress}
    viewBox="0 0 12 10"
    width={height + 10}
    height={width + 12}
    fill={color}>
    <Path d="M1.234 6.154H8.47L6.462 8.03c-.231.216-.361.51-.361.816 0 .306.13.6.36.816.232.216.546.338.874.338.327 0 .641-.121.873-.338l2.95-2.758A2.61 2.61 0 0012 5a2.61 2.61 0 00-.842-1.904L8.208.338A1.28 1.28 0 007.335 0a1.28 1.28 0 00-.873.338c-.231.217-.361.51-.361.816 0 .306.13.6.361.816L8.47 3.846H1.234a1.28 1.28 0 00-.873.338C.13 4.401 0 4.694 0 5c0 .306.13.6.361.816.232.216.546.338.873.338z" />
  </Svg>
);

export default RightArrow;
