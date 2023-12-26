import Svg, { Path } from "react-native-svg";
import React from "react";

const LeftArrow = ({ color, height, width, onPress }) => (
  <Svg
    onPress={onPress}
    viewBox='0 0 24 24'
    width={height + 15}
    height={width + 15}
    fill={color}
  >
    <Path d='M19,10.5H10.207l2.439-2.439a1.5,1.5,0,0,0-2.121-2.122L6.939,9.525a3.505,3.505,0,0,0,0,4.95l3.586,3.586a1.5,1.5,0,0,0,2.121-2.122L10.207,13.5H19a1.5,1.5,0,0,0,0-3Z' />
  </Svg>
);

export default LeftArrow;
