import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  Button,
  Dimensions,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';

import {API} from '../Api';
import {Email, Password} from '../Assets/Svgs';
import Avatar from '../Utils/Assets/Icons/Avatar';
import TouchableOpacity from '../Components/TouchableOpacity';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {setUser} from '../Store/Actions/user';
import {appleLogin, resendOtp, SignInGuest} from '../Store/Actions/auth';
import GoogleBTN from '../Components/GoogleBTN';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import AppleConnect from '../Components/AppleConnect';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomAlert from '../Components/CustomAlert';
import {showCustomAlert2} from '../../App';
import * as yup from 'yup';

const titleValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(10, 'First Name must be at most 10 characters')
    .test('no-spaces', 'First Name cannot contain only spaces', value => {
      // Check if the value contains only spaces
      return value.trim() !== '';
    }),
  lastname: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(10, 'Last Name must be at most 10 characters')
    .test('no-spaces', 'Last Name cannot contain only spaces', value => {
      // Check if the value contains only spaces
      return value.trim() !== '';
    }),
  emailAdress: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must be at most 12 characters'),
  refferal: yup.string().optional(),
  phoneNumber: yup
    .string()
    .required('Phone Number is required')
    .min(7, 'Phone Number must be at least 7 characters')
    .max(15, 'Phone Number must be at most 15 characters'),
});
const Signup = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState('');
  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [refferal, setRefferal] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const theme = useSelector(e => e.theme);
  const [clicked, setIsClicked] = useState(false);
  const [check, setCheck] = useState(true);
  const [Otpsend, setOtpsend] = useState(false);

  const {guestUser} = useSelector(state => state?.guestUser?.guestUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const otpVerification = async otpVerify => {
    console.log(
      '🚀 ~ file: Signup.js:57 ~ otpVerification ~ otpVerify:',
      otpVerify,
    );
    const body = {
      email: emailAdress,
      step: 'second',
      otp: otpVerify,
    };
    try {
      const {data} = await API.v1.Auth.signup(body);
      setIsClicked(false);

      setOtpsend(!Otpsend);
      Alert.alert('Account created successfully!');
      if (data && data.status === 200) {
        dispatch(setUser(data.data));
      }
    } catch (error) {
      setIsClicked(false);
      Alert.alert('Registration Error', 'error while submitting otp');
    }
  };

  const signupBtn = async values => {
    setEmailAdress(values?.emailAdress);
    setIsClicked(true);
    const body = {
      step: 'first',
      first_name: values?.firstname,
      last_name: values?.lastname,
      email: values?.emailAdress,
      password: values?.password,
      referral_code: values?.refferal,
      phone_no: values?.phoneNumber,
      your_interests: ['bio', 'fantasy'],
    };

    try {
      const {data} = await API.v1.Auth.signup(body);
      console.log('🚀 ~ file: Signup.js:125 ~ signupBtn ~ data:', data);
      setIsClicked(false);
      // setOtpsend(!Otpsend);
      Alert.alert(
        'Verification code sent',
        'Verification code sent to your registered email.',
      );
      navigation.navigate(NAVIGATION_ROUTES.OTP_SCREEN, {
        email: values?.emailAdress,
      });
    } catch (error) {
      setIsClicked(false);
      console.log('error deleted', error.response.data);
      if (error.response.data.message === 'User already exists.') {
        Alert.alert('Registration error', 'Email already exists.');
      } else {
        Alert.alert(
          'Deleted Account',
          'The account linked to this email was already deleted. Please contact support for assistance.',
        );
      }
    }
  };

  const handleResend = () => {
    dispatch(resendOtp(emailAdress));
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: 'black',
        paddingTop: Platform.OS === 'ios' ? 55 : 0,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}>
      <View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.LOGIN);
            }}
            noBg
            style={{alignItems: 'flex-end', backgroundColor: '#303D5B'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 0,
            }}>
            <Image
              source={require('../Assets/MAINLOGO.png')}
              style={{
                width: Dimensions.get('window').width - 150,
                height: 150,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                backgroundColor: '#383E50',
                width: 3,
                marginHorizontal: 15,
                height: 65,
                alignItems: 'center',
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '800',
                  fontSize: 18,
                }}>
                Sign
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '900',
                  fontSize: 22,
                }}>
                Up
              </Text>
            </View>
          </View>
        </View>

        <Formik
          validationSchema={titleValidationSchema}
          initialValues={{
            firstname: '',
            lastname: '',
            emailAdress: '',
            password: '',
            refferal: '',
            phoneNumber: '',
          }}
          onSubmit={values => signupBtn(values)}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '45%'}}>
                  <View
                    style={[
                      styles.textInputView,
                      {backgroundColor: '#181f34'},
                    ]}>
                    <TextInput
                      placeholderTextColor="#B7B7B7"
                      placeholder="First Name"
                      onChangeText={handleChange('firstname')}
                      style={[
                        styles.textInput,
                        {color: 'white'},
                        errors.firstname && {borderColor: 'red'},
                      ]}
                    />
                  </View>
                  {errors.firstname && (
                    <Text style={{color: 'red'}}>{errors.firstname}</Text>
                  )}
                </View>
                <View style={{width: '45%'}}>
                  <View style={[styles.textInputView]}>
                    <TextInput
                      placeholderTextColor="#B7B7B7"
                      placeholder="Last Name"
                      onChangeText={handleChange('lastname')}
                      style={[
                        styles.textInput,
                        {color: 'white'},
                        errors.lastname && {borderColor: 'red'},
                      ]}
                    />
                  </View>
                  {errors.lastname && (
                    <Text style={{color: 'red'}}>{errors.lastname}</Text>
                  )}
                </View>
              </View>
              {/*</View>*/}
              <View style={{width: '100%'}}>
                <View
                  style={[styles.textInputView, {backgroundColor: '#181f34'}]}>
                  <TextInput
                    placeholderTextColor="#B7B7B7"
                    placeholder="Email Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="email"
                    keyboardType={'email-address'}
                    autoComplete={'email'}
                    onChangeText={handleChange('emailAdress')}
                    style={[
                      styles.textInput,
                      {color: 'white'},
                      errors.emailAdress && {borderColor: 'red'},
                    ]}
                  />
                </View>
                {errors.emailAdress && (
                  <Text style={{color: 'red'}}>{errors.emailAdress}</Text>
                )}
              </View>
              <View style={{width: '100%'}}>
                <View
                  style={[styles.textInputView, {backgroundColor: '#181f34'}]}>
                  <TextInput
                    placeholderTextColor="#B7B7B7"
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    style={[
                      styles.textInput,
                      {color: 'white'},
                      errors.password && {borderColor: 'red'},
                    ]}
                  />
                </View>
                {errors.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </View>
              <View
                style={[
                  styles.textInputView,
                  {width: '100%', display: 'none'},
                ]}>
                <TextInput
                  placeholderTextColor="#B7B7B7"
                  placeholder="Username"
                  onChangeText={e => {
                    setUsername(e);
                  }}
                  style={[styles.textInput, {color: 'white'}]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '45%'}}>
                  <View
                    style={[
                      styles.textInputView,
                      {backgroundColor: '#181f34'},
                    ]}>
                    <TextInput
                      placeholderTextColor="#B7B7B7"
                      placeholder="Referral Code"
                      onChangeText={handleChange('refferal')}
                      style={[
                        styles.textInput,
                        {color: 'white'},
                        errors.refferal && {borderColor: 'red'},
                      ]}
                    />
                  </View>
                  {errors.refferal && (
                    <Text style={{color: 'red'}}>{errors.refferal}</Text>
                  )}
                </View>
                <View style={{width: '45%'}}>
                  <View style={[styles.textInputView]}>
                    <TextInput
                      placeholderTextColor="#B7B7B7"
                      placeholder="Phone Number"
                      inlineImageLeft="phoneNumber"
                      keyboardType={'phone-pad'}
                      onChangeText={handleChange('phoneNumber')}
                      style={[
                        styles.textInput,
                        {color: 'white'},
                        errors.phoneNumber && {borderColor: 'red'},
                      ]}
                    />
                  </View>
                  {errors.phoneNumber && (
                    <Text style={{color: 'red'}}>{errors.phoneNumber}</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  marginVertical: 15,
                  maxWidth: Dimensions.get('screen').width - 45,
                }}>
                <Text style={{color: 'white'}}>
                  By continuing, you agree to Share Slate’s {''}
                </Text>
                <TouchableOpacity
                  style={{paddingHorizontal: 0}}
                  noBg
                  start
                  onPress={() => {
                    Linking.openURL('https://www.shareslate.fun/terms');
                  }}>
                  <Text
                    style={{
                      color: '#5E72E4',
                      fontWeight: 'bold',
                      marginTop: -7,
                    }}>
                    Terms & Conditions{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              {!Otpsend ? (
                <TouchableOpacity
                  disable={clicked ? true : false}
                  onPress={handleSubmit}>
                  <View style={{flexDirection: 'row'}}>
                    <ActivityIndicator
                      animating={clicked}
                      size={'small'}
                      color={'#1A2236'}
                      style={{
                        display: clicked ? 'flex' : 'none',
                        marginRight: 15,
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <>
                  <OTPInputView
                    style={{
                      height: 50,
                      marginVertical: 12,

                      width: '70%',
                      alignSelf: 'center',
                    }}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    onCodeFilled={code => {
                      otpVerification(code);
                    }}
                  />
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={{color: 'white'}}>Resend code</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </Formik>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <View style={{justifyContent: 'center', marginRight: 12}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 18,
              }}>
              OR Sign Up
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: '900',
                fontSize: 22,
              }}>
              With
            </Text>
          </View>
          <GoogleBTN />
          <AppleConnect />
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 9,
    backgroundColor: '#181f34',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  underlineStyleBase: {
    borderWidth: 0,
    color: 'white',

    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 18,
    tintColor: 'white',
  },
});
