import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { Defs } from 'react-native-svg';

const Notification = ({ stroke = 'white', color, width = 30, height = 30 }) => (
  <Svg
    // viewBox='0 0 24 24'
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 512 512"
  >
    {/* <Defs></Defs> */}
    {/* <Path
      stroke={color ? 'transparent' : 'white'}
      strokeWidth={20}
      fill={color ? color : 'transparent'}
      d='M235.53,443.61c-7.72-2.6-15.91-4.29-23.08-8-16.69-8.58-26.91-22.73-31.71-40.82a15.47,15.47,0,0,1-.2-1.88H304.93a56.13,56.13,0,0,1-8.58,21.14c-10.63,16.16-25.47,25.9-44.67,28.86a8.83,8.83,0,0,0-1.81.68Z'
    /> */}
    <Path
      fill={color ? color : 'transparent'}
      stroke={color ? 'transparent' : stroke}
      strokeWidth={20}
      d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118 0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 01-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 01-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14 0 75.36-13.29 91.42-35.31 118-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 00-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 00-4.61-37.66zM256 480a80.06 80.06 0 0070.44-42.13 4 4 0 00-3.54-5.87H189.12a4 4 0 00-3.55 5.87A80.06 80.06 0 00256 480z"
    />
  </Svg>
);

export default Notification;
