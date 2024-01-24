/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {GoogleSvg} from '../Assets/Svgs';
import {googleLogin} from '../Store/Actions/auth';

export default function GoogleBTN() {
  const theme = useSelector(s => s.theme);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function googleSignup() {
    setLoading(true);
    GoogleSignin.configure({
      offlineAccess: true,
      // webClientId:
      //   '363861774619-srob0g3ug0pljnji334gq645l3r6d8js.apps.googleusercontent.com',
      // androidClientId:
      //   '363861774619-m818tnkj3ofr4ns2ra4on886g2lrcait.apps.googleusercontent.com',

      webClientId:
        '363861774619-srob0g3ug0pljnji334gq645l3r6d8js.apps.googleusercontent.com',
      androidClientId:
        // '587351668223-rq66srbd823l1tfup6osh1pnbo5uqeuk.apps.googleusercontent.com',
        '5363861774619-4kls05eci6gtaa84chass694olmf8rms.apps.googleusercontent.com',

      iosClientId:
        '587351668223-h86u2pih1ikkds96okqo3sjcp4ma02ik.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    googleUp();
  }

  async function googleUp() {
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              const currentUser = GoogleSignin.getTokens().then(res => {
                dispatch(
                  googleLogin(
                    {
                      accessToken: userInfo.idToken,
                    },
                    navigation,
                  ),
                );
              });
            })
            .catch(e => {
              setLoading(false);
              console.log(
                '🚀 ~ file: GoogleBTN.js:49 ~ .then ~ e:',
                JSON.stringify(e.message),
              );
              Alert.alert('Network Problem 1.1.1', JSON.stringify(e.message));
            });
        }
      })
      .catch(e => {
        setLoading(false);
        console.log('🚀 ~ file: GoogleBTN.js:52 ~ googleUp ~ e:', e);
      });
  }

  return (
    <TouchableOpacity
      style={{
        height: 48,
        width: 56,
        backgroundColor: '#263047',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      }}
      onPress={googleSignup}>
      <View>
        {loading ? (
          <>
            <ActivityIndicator color={'black'} />
            {/* <Text
              style={{
                fontSize: 15,
                color: "white",
                marginLeft: 5,
              }}
            >
              Please wait while we log you in ...
            </Text> */}
          </>
        ) : (
          <>
            <GoogleSvg />
            {/* <Text
              style={{
                fontSize: 15,
                color: "white",
                marginLeft: 5,
              }}
            >
              Connect with <Text style={{ fontWeight: "bold" }}>Google</Text>
            </Text> */}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
