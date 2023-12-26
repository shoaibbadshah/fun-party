import React from 'react';
import {Path, Svg} from 'react-native-svg';

const MinisLoop = props => {
  return (
    <Svg
      fill={props?.color}
      height={props?.height}
      viewBox="0 0 24 24"
      width={props?.width}>
      <Path d="M3 11H0c0-4.411 3.589-8 8-8h12V0l3.707 3.793a1 1 0 0 1 0 1.414L20 9V6H8c-2.757 0-5 2.243-5 5Zm13 7H4v-3L.293 18.793a1 1 0 0 0 0 1.414L4 24v-3h12c4.411 0 8-3.589 8-8h-3c0 2.757-2.243 5-5 5Z" />
    </Svg>
  );
};

export default MinisLoop;
