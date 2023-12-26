import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const renderThirdLayer = (percent) => {
  const theme = useSelector((e) => e.theme);

  const styles = useStyles(theme);
  if (percent > 50) {
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CircularProgress = ({ percent }) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  const theme = useSelector((e) => e.theme);

  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
    </View>
  );
};

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: 140,
      height: 140,
      borderWidth: 25,
      borderRadius: 70,
      borderColor: '#5E72E4',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E5F6EC',

      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 7.84,
      elevation: 5,
    },
    firstProgressLayer: {
      width: 140,
      height: 140,
      borderWidth: 25,
      borderRadius: 70,
      position: 'absolute',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: '#F29C1B',
      borderTopColor: '#F29C1B',
      transform: [{ rotateZ: '-135deg' }],

      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 7.84,
      elevation: 5,
    },
    secondProgressLayer: {
      width: 140,
      height: 140,
      position: 'absolute',
      borderWidth: 25,
      borderRadius: 70,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: '#F29C1B',
      borderTopColor: '#F29C1B',
      transform: [{ rotateZ: '45deg' }],
    },
    offsetLayer: {
      width: 140,
      height: 140,
      position: 'absolute',
      borderWidth: 25,
      borderRadius: 70,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: '#5E72E4',
      borderTopColor: '#5E72E4',
      transform: [{ rotateZ: '-135deg' }],
    },
  });

export default CircularProgress;
