import React from 'react';
import {TextInput, Text, View, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const InputFieldComponent = ({
  secureTextEntry,
  keyboardType,
  placeholder,
  label,
  value,
  handleChange,
  name,
}) => {
  return (
    <View style={styles.labelTextFieldContainer}>
      <Text style={styles.inputlabel}>{label}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={styles.textInput}
          value={value}
          onChangeText={e => handleChange(name, e)}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: '6@s',
    height: '45@s',
    paddingBottom: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    paddingLeft: '15@s',
    fontSize: '14@s',
    color: '#000',
    width: '90%',
    paddingTop: '12@s',
  },
  inputlabel: {
    color: 'black',
    fontWeight: '400',
    lineHeight: '20@s',
    fontSize: '14@s',
  },
  labelTextFieldContainer: {
    marginTop: '10@s',
  },
  pencilIcon: {
    marginRight: '15@s',
  },
});

export default InputFieldComponent;
