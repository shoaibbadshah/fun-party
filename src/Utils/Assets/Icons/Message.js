import Svg, {Path} from 'react-native-svg';
import React from 'react';

const Message = ({color, height, width}) => (
  <Svg
    viewBox="0 0 122.88 113.94"
    data-name="Layer 1"
    width={height}
    height={width}
    fill={color}>
    {/*<Title>{"messenger-chat-bubble"}</Title>*/}
    <Path
      d="M3.77 0h115.34a3.79 3.79 0 0 1 3.77 3.77v77.17a3.79 3.79 0 0 1-3.77 3.78H61.44l-29.1 21.62c-9.61 9.13-16.08 11.45-15.15-1V84.72H3.77A3.79 3.79 0 0 1 0 80.94V3.77A3.79 3.79 0 0 1 3.77 0Zm59.15 34.34a7.12 7.12 0 1 1-7.12 7.11 7.11 7.11 0 0 1 7.12-7.11Zm27.19 0A7.12 7.12 0 1 1 83 41.45a7.11 7.11 0 0 1 7.11-7.11Zm-54.39 0a7.12 7.12 0 1 1-7.11 7.11 7.11 7.11 0 0 1 7.11-7.11Z"
      style={{
        fillRule: 'evenodd',
      }}
    />
  </Svg>
);

export default Message;
