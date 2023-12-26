import React from 'react';
import {Text as IText} from 'react-native';
import {useSelector} from 'react-redux';

const Text = props => {
  const theme = useSelector(e => e.theme);
  return (
    <IText
      {...props}
      style={{
        color: theme.text,
        shadowColor:'transparent',
        ...props.style,
      }}>
      {props.children}
    </IText>
  );
};

export default Text;
