import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useSelector} from 'react-redux';

export default function () {
  const theme = useSelector(s => s.theme);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.primary,
      }}>
      <View style={styles.svgWraper}>
        <Image
          source={require('../Assets/FUN.png')}
          style={{width: 125, height: 125}}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  svgWraper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
});
