import React from 'react';
import { Path, Svg } from 'react-native-svg';

const Play = (props) => {
  return (
    <Svg
      width={props?.width ? props?.width : 25}
      height={props?.height ? props?.height : 25}
      viewBox='0 0 512 512'
    >
      <Path
        d='M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z'
        fill='transparent'
        stroke='white'
        strokeMiterlimit='10'
        strokeWidth='32'
      />
    </Svg>
  );
};

export default Play;
