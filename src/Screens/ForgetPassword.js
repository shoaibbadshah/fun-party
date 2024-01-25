import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Alert} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {API} from '../Api';
import TextInput from '../Components/TextInput';
import {Email, Password} from '../Assets/Svgs';
import TouchableOpacity from '../Components/TouchableOpacity';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';

const ForgetPassword = () => {
  const [opt, setOpt] = useState(false);
  const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [isResetPass, setisResetPass] = useState(true);

  const navigation = useNavigation();
  const theme = useSelector(e => e.theme);

  const handleUpdatePass = async () => {
    if (!newPass) {
      Alert.alert('Error', 'Enter valid New password ');
      return;
    } else if (!confirmPass) {
      Alert.alert('Error', 'Enter valid confirm password');
      return;
    } else if (confirmPass !== newPass) {
      Alert.alert('Error', 'Password does not match ');
      return;
    }

    const body = {
      step: 'third',
      email: email,
      password: confirmPass,
    };

    try {
      const {data} = await API.v1.Auth.forgetPassword(body);

      Alert.alert('Password reset successful');
      setOpt(!opt);
      setisResetPass(!isResetPass);
      if (data.status == 200) {
        navigation.navigate(NAVIGATION_ROUTES.LOGIN);
      }
    } catch (error) {
      Alert.alert(
        'confirm password Error',
        'error while submitting new password',
      );
    }
  };

  const otpVerification = async otpVerify => {
    const body = {
      email: email,
      step: 'second',
      otp: otpVerify,
    };
    console.log(
      '🚀 ~ file: ForgetPassword.js:69 ~ otpVerification ~ body:',
      body,
    );
    try {
      const {data} = await API.v1.Auth.forgetPassword(body);
      console.log(
        '🚀 ~ file: ForgetPassword.js:69 ~ otpVerification ~ data:',
        data,
      );

      if (data.status == 200) {
        setOpt(!opt);
        setisResetPass(!isResetPass);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ForgetPassword.js:75 ~ otpVerification ~ error:',
        error,
      );
      Alert.alert('OTP Verification Error', 'error while submitting otp');
    }
  };

  const handleSendOtp = async (values, resetForm) => {
    setEmail(values.emailAdress);
    const body = {
      step: 'first',
      email: values.emailAdress,
    };

    try {
      const {data} = await API.v1.Auth.forgetPassword(body);
      console.log(
        '🚀 ~ file: ForgetPassword.js:87 ~ handleSendOtp ~ data:',
        data,
      );
      // resetForm();
      setOpt(true);

      Alert.alert('Verification code sent to your registered email.');
    } catch (error) {
      console.log(
        '🚀 ~ file: ForgetPassword.js:94 ~ handleSendOtp ~ error:',
        error,
      );
      Alert.alert(
        'Invalid email',
        'Email does not exist. Please check the email associated with the account',
      );
    }
  };

  const loginValidationSchema = yup.object().shape({
    emailAdress: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
  });

  return (
    <View style={[styles.container, {backgroundColor: 'black'}]}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          emailAdress: '',
        }}
        onSubmit={(values, {resetForm}) => handleSendOtp(values, resetForm)}>
        {({handleChange, handleSubmit, values, errors}) => (
          <>
            {!opt && isResetPass ? (
              <>
                <TextInput
                  style={[
                    {
                      backgroundColor: '#293145',
                      color: 'white',
                      display: opt ? 'none' : 'flex',
                    },
                    errors.emailAdress && {borderColor: 'red'},
                  ]}
                  icon={<Email />}
                  placeholder="Email"
                  autoCorrect={false}
                  inputMode="email"
                  keyboardType="email-address"
                  // onChangeText={e => {
                  // setEmail(e);
                  //}}
                  value={values.emailAdress}
                  onChangeText={handleChange('emailAdress')}
                />

                {errors.emailAdress && (
                  <Text style={{color: 'red'}}>{errors.emailAdress}</Text>
                )}

                <TouchableOpacity
                  style={{marginTop: 15}}
                  onPress={handleSubmit}>
                  <Text style={{color: 'white'}}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {opt && isResetPass ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontWeight: '800', fontSize: 18}}>
                  Enter OTP Code
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
                    onPress={handleSubmit}
                    style={{
                      color: '#5E72E4',
                      fontWeight: '800',
                      fontSize: 14,
                    }}>
                    Resend
                  </Text>
                </Text>
              </View>
            ) : null}
          </>
        )}
      </Formik>
      {!opt && !isResetPass && (
        <>
          <TextInput
            icon={<Password fill={'#B7B7B7'} />}
            style={{backgroundColor: '#293145', color: 'white'}}
            secureTextEntry
            placeholder="New Password"
            onChangeText={e => {
              setNewPass(e);
            }}
          />
          <TextInput
            icon={<Password fill={'#B7B7B7'} />}
            style={{backgroundColor: '#293145', color: 'white'}}
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={e => {
              setConfirmPass(e);
            }}
          />

          <TouchableOpacity style={{marginTop: 15}} onPress={handleUpdatePass}>
            <Text style={{color: 'white'}}>Update Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ForgetPassword;

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
