import Svg, {Path} from 'react-native-svg';
import React from 'react';

const CaretArrowBottomIcon = ({color, height, width }) => (
  <Svg viewBox="0 0 24 24" width={height} height={width} fill={color}>
      <Path d="M6.41 9h11.18a1 1 0 0 1 .7 1.71l-5.58 5.58a1 1 0 0 1-1.42 0l-5.58-5.58A1 1 0 0 1 6.41 9Z" />

  </Svg>
);

export default CaretArrowBottomIcon;
