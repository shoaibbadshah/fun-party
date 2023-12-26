import Svg, { Path } from "react-native-svg";
import React from "react";
import { G } from "react-native-svg";

const AddIcon = ({ color, onPress, width = 38, height = 38 }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    id='Capa_1'
    enableBackground='new 0 0 24 24'
    height={27}
    viewBox='0 0 24 24'
    width={27}
    color={color}
  >
    <G id='_x33_'>
      <Path
        fill={color ? color : "#fff"}
        d='m18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4h-12c-2.206 0-4-1.794-4-4v-12c0-2.206 1.794-4 4-4zm0-2h-12c-3.314 0-6 2.686-6 6v12c0 3.314 2.686 6 6 6h12c3.314 0 6-2.686 6-6v-12c0-3.314-2.686-6-6-6z'
      />
    </G>
    <G id='_x32_'>
      <Path
        fill={color ? color : "#fff"}
        d='m12 18c-.552 0-1-.447-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10c0 .553-.448 1-1 1z'
      />
    </G>
    <G id='_x31_'>
      <Path
        fill={color ? color : "#fff"}
        d='m6 12c0-.552.447-1 1-1h10c.552 0 1 .448 1 1s-.448 1-1 1h-10c-.553 0-1-.448-1-1z'
      />
    </G>
  </Svg>
);

export default AddIcon;
