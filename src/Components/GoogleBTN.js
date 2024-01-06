/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Alert,
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
      //webClientId is required if you need offline access app/funRelease.keystore
      offlineAccess: true,
      // webClientId:
      //   '363861774619-srob0g3ug0pljnji334gq645l3r6d8js.apps.googleusercontent.com',
      // androidClientId:
      //   '363861774619-m818tnkj3ofr4ns2ra4on886g2lrcait.apps.googleusercontent.com',

      webClientId:
        '587351668223-sirqqq6fvn423up2mg5seh7aijmj755i.apps.googleusercontent.com',
      androidClientId:
        '587351668223-rq66srbd823l1tfup6osh1pnbo5uqeuk.apps.googleusercontent.com',

      iosClientId:
        '587351668223-h86u2pih1ikkds96okqo3sjcp4ma02ik.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    googleUp();
  }

  const check = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log('🚀 ~ file: GoogleBTN.js:40 ~ check ~ idToken:', idToken);

    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  };
  async function googleUp() {
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(
                '🚀 ~ file: GoogleBTN.js:37 ~ .then ~ userInfo:',
                userInfo.idToken,
              );
              // Alert.alert("Token", userInfo.idToken);

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
              Alert.alert(
                'Network Problem',
                'Something went wrong, please try again later',
              );
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
        backgroundColor: '#303D5B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 15,
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
