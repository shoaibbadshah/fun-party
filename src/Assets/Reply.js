import React from 'react';
import Svg, { G, Path, Defs, Pattern, Use, Image } from 'react-native-svg';

const Reply = (props) => {
  return (
    <Svg
      width={33}
      height={33}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <G filter='url(#a)'>
        <Path fill='url(#b)' shapeRendering='crispEdges' d='M4 0h25v25H4z' />
      </G>
      <Defs>
        <Pattern
          id='b'
          patternContentUnits='objectBoundingBox'
          width={1}
          height={1}
        >
          <Use xlinkHref='#c' transform='scale(.00781)' />
        </Pattern>
      </Defs>
    </Svg>
  );
};

export default Reply;
