import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Email } from '../Assets/Svgs';
import TextInput from '../Components/TextInput';
import TouchableOpacity from '../Components/TouchableOpacity';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

const RecoverAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSendOtp = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const isValid = emailRegex.test(email);

    if (!isValid) {
      setIsValidEmail(isValid);
      return;
    }

    Alert.alert(
      'Thank you for submission!',
      'Your account recovery request has been received. A member of our team will be in touch with you shortly to assist with your issue. Thank you for your patience.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: 'black' }]}
      contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
    >
      <TextInput
        style={{ backgroundColor: '#293145', color: 'white' }}
        icon={<Email />}
        inputMode="email"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={(e) => {
          setEmail(e);
        }}
      />
      {!isValidEmail && (
        <Text style={{ color: 'red', marginTop: 5, marginLeft: 5 }}>
          Invalid email
        </Text>
      )}

      <TouchableOpacity onPress={handleSendOtp} style={{ marginTop: 15 }}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default RecoverAccount;
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
    borderRadius: 7,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 9,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },

  //====otp

  underlineStyleBase: {
    borderWidth: 0,
    backgroundColor: '#293145',
    color: 'white',
    borderWidth: 1,
    borderColor: 'grey',
  },
});
