import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {API} from '../Api';
import {resendOtp} from '../Store/Actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from '../Store/Actions/user';

const OTPScreen = ({navigation, route}) => {
  const [emailAdress, setEmailAdress] = useState(route?.params?.email);
  const [Otpsend, setOtpsend] = useState(false);
  const dispatch = useDispatch();
  const [clicked, setIsClicked] = useState(false);
  const otpVerification = async otpVerify => {
    const body = {
      email: emailAdress,
      step: 'second',
      otp: otpVerify,
    };
    try {
      const {data} = await API.v1.Auth.signup(body);
      console.log(data.status, 'enw things');
      setIsClicked(false);

      setOtpsend(!Otpsend);
      Alert.alert('Alert', 'User created successfully');
      if (data.status === 200) {
        dispatch(setUser(data.data));
      }
    } catch (error) {
      setIsClicked(false);
      Alert.alert('Registration Error', 'error while submitting otp');
    }
  };

  const handleResend = () => {
    dispatch(resendOtp(emailAdress));
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: '800', fontSize: 18}}>
          Enter your verification code
        </Text>
        <OTPInputView
          style={{
            backgroundColor: 'black',
            color: 'white',
            height: 55,
            marginVertical: 12,
            paddingHorizontal: 35,
            left: 20,
          }}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={code => {
            otpVerification(code);
          }}
        />
        <Text style={{color: 'white', fontWeight: '800', fontSize: 14}}>
          Didn't get the code?{' '}
          <Text
            onPress={handleResend}
            style={{color: '#5E72E4', fontWeight: '800', fontSize: 14}}>
            Resend
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
export default OTPScreen;
