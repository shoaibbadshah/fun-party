import Svg, {Path} from 'react-native-svg';
import React from 'react';

const CommentUp = ({width, height, color}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 507.506 507.506"
    style={{
      enableBackground: 'new 0 0 507.506 507.506',
    }}
    xmlSpace="preserve"
    fill={color}>
    <Path d="M163.865 436.934a54.228 54.228 0 0 1-38.4-15.915L9.369 304.966c-12.492-12.496-12.492-32.752 0-45.248 12.496-12.492 32.752-12.492 45.248 0l109.248 109.248L452.889 79.942c12.496-12.492 32.752-12.492 45.248 0 12.492 12.496 12.492 32.752 0 45.248L202.265 421.019a54.228 54.228 0 0 1-38.4 15.915z" />
  </Svg>
);

export default CommentUp;
