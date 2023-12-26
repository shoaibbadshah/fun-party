import React from "react";
import { Circle, Path, Svg } from "react-native-svg";

const ThreeDots = (props) => {
  return (
    <Svg
      fill={props?.color}
      height={props?.height}
      viewBox='0 0 24 24'
      width={props?.width}
    >
      <Circle cx={21.517} cy={12.066} r={2.5} />
      <Circle cx={12} cy={12} r={2.5} />
      <Circle cx={2.5} cy={12} r={2.5} />
    </Svg>
  );
};

export default ThreeDots;
