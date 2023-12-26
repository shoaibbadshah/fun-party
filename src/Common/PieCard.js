import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CircularProgress from './CircularProgress';
import { useSelector } from 'react-redux';

const PieCard = (props) => {
  const incomes = props.incomes;
  const expenses = props.expenses;

  const theme = useSelector((e) => e.theme);

  const payoutPercent =
    incomes == 0 && expenses == 0
      ? 0
      : incomes == 0
      ? 100
      : ((expenses / incomes) * 100).toFixed(2);
  const savedPercent =
    incomes == 0 && expenses == 0 ? 0 : (100 - payoutPercent).toFixed(2);

  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.pieContainer}>
        <CircularProgress percent={payoutPercent} />
      </View>
      <View style={styles.numbersContainer}>
        <View style={styles.rowContainer}>
          <Icon name="circle" size={15} color={'#F29C1B'} />
          <Text style={[{ marginLeft: 5, color: '#F29C1B' }]}>
            Payout({payoutPercent}%)
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Icon name="circle" size={15} color={'#5E72E4'} />
          <Text style={[{ marginLeft: 5, color: '#5E72E4' }]}>
            Balance ({savedPercent}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      flexDirection: 'row',
      backgroundColor: '#E5F6EC',
      margin: 12,
    },
    pieContainer: {
      padding: 15,
    },
    numbersContainer: {
      flex: 1,
      padding: 10,
      paddingLeft: 0,
      justifyContent: 'center',
    },
    rowContainer: {
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default PieCard;
