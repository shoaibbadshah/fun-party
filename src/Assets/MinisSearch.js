import React from 'react';
import {Path, Svg} from 'react-native-svg';

const MinisSearch = (props) => {
  return (
    <Svg fill={props?.color} height={props?.height} viewBox="0 0 24 24" width={props?.width}>
        <Path d="m23.707 22.293-5.969-5.969a10.016 10.016 0 1 0-1.414 1.414l5.969 5.969a1 1 0 0 0 1.414-1.414ZM10 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
    </Svg>
  );
};

export default MinisSearch;
