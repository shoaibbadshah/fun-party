import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput as Input,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import Text from '../Components/Text';
import TextInput from '../Components/TextInput';
import GoogleBTN from '../Components/GoogleBTN';
import {Email, Password} from '../Assets/Svgs';
import AppleConnect from '../Components/AppleConnect';
import TouchableOpacity from '../Components/TouchableOpacity';
import {SignInApi, SignInGuest} from '../Store/Actions/auth';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {LightMode} from '../Store/Actions/theme';
import * as yup from 'yup';
import {Formik} from 'formik';
// import { InAppPurchase } from "react-native-iap";

const loginValidationSchema = yup.object().shape({
  emailAdress: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must be at most 12 characters'),
});
const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const HandleLoginBTN = async values => {
    setLoading(true);
    const body = {
      email: values?.emailAdress,
      password: values?.password,
    };
    dispatch(SignInApi(body, navigation, setLoading));
  };

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 15,
        backgroundColor: 'black',
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 0,
      }}
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.SIGNUP);
            }}
            noBg
            style={{
              alignItems: 'flex-end',
              backgroundColor: '#303D5B',
              height: 45,
            }}>
            <Text
              style={{
                color: '#fff',

                fontWeight: 'bold',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 45,
          }}>
          {/* <View style={{ flex: 1 }} /> */}

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
              source={require('../Assets/MAINLOGO.png')}
              style={{
                width: Dimensions.get('window').width - 150,
                height: 150,
                // marginTop: 20,
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
                In
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          emailAdress: '',
          password: '',
        }}
        onSubmit={values => HandleLoginBTN(values)}>
        {({handleChange, handleSubmit, values, errors}) => (
          <>
            <View style={{marginTop: '10%'}}>
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
            <View style={[styles.textInputView, {backgroundColor: '#181f34'}]}>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                noBg
                onPress={() => {
                  navigation.navigate(NAVIGATION_ROUTES.FORGET);
                }}
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'white'}}>Forgot Password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                noBg
                onPress={() => {
                  navigation.navigate(NAVIGATION_ROUTES.HELP);
                }}>
                <Text style={{color: '#5E72E4', fontWeight: '800'}}>
                  Need help signing in?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator color="black" animating={true} />
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Sign In</Text>
              )}
            </TouchableOpacity>
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
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 18,
              marginRight: 12,
            }}>
            OR Sign In
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
    </KeyboardAwareScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 0,
    height: 50,
    marginVertical: 9,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    color: 'white',
  },
});
