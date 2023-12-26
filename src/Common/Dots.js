import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Dots = () => {
  return <View style={styles.Dots}></View>;
};

export default Dots;

const styles = StyleSheet.create({
  Dots: {
    width: 7,
    height: 7,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    marginHorizontal: 7,
  },
});
