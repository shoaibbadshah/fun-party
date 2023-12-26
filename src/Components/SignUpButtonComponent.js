import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const SignUpButtonComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    width: '100%',
    padding: '12@s',
    borderRadius: '24@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnText: {
    color: '#fff',
    fontSize: '14@s',
    fontWeight: '500',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  contentContainer: {
    paddingTop: '10@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
  },
  getStarted: {
    color: 'white',
    fontSize: '22@s',
    fontWeight: '300',
    paddingTop: '20@s',
  },
  connectingDropsHeading: {
    color: '#000',
    fontSize: '43@s',
    fontWeight: '700',
    marginVertical: '5@s',
  },
});

export default SignUpButtonComponent;
