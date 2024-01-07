import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import appleAuth from '@invertase/react-native-apple-authentication';
import {API} from '../Api';
import {useDispatch} from 'react-redux';
import {AppleSVG} from '../Assets/Svgs';
import GoogleBTN from '../Components/GoogleBTN';

const AuthDecide = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnApplePress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      try {
        const {data} = await API.v1.Auth.appleLoginVerify({
          apple_id: appleAuthRequestResponse.user,
          // apple_id:
          //   '34567890vy78uioiuh9rtyuoi.34567890vy78uioiuh9rtyuoi.iouy5678',
        });

        await dispatch(setUser(data.data));
        navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
      } catch (error) {
        if (credentialState === appleAuth.State.REVOKED) {
        } else if (credentialState === appleAuth.State.AUTHORIZED) {
          if (appleAuthRequestResponse.email == null) {
            handleChangePassword();
            setFirstName(appleAuthRequestResponse.fullName.familyName);
            setLastName(appleAuthRequestResponse.fullName.givenName);
            setModalEmail(appleAuthRequestResponse.email);
            setUserApple(appleAuthRequestResponse.user);
          } else {
            dispatch(
              appleLogin(
                {
                  familyName: appleAuthRequestResponse.fullName.familyName,

                  givenName: appleAuthRequestResponse.fullName.givenName,
                  user: appleAuthRequestResponse.user,
                  email: appleAuthRequestResponse.email,
                },
                navigation,
              ),
            );
          }
        } else {
        }
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
      } else {
        console.error('Apple login error:', error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 15,
        backgroundColor: 'black',
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 10,
      }}
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />

      <Image
        source={require('../Assets/MAINLOGO.png')}
        style={{
          width: Dimensions.get('screen').width - 15,
          height: Dimensions.get('screen').height * 0.3,
        }}
        resizeMode="contain"
      />

      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 24,
          marginBottom: 20,
        }}>
        Sign Up
      </Text>

      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_ROUTES.SIGNUP)}
            style={[styles.logos, {alignItems: 'center'}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/EmailLogo.png')}
                style={{
                  width: '30%',
                  height: 22,
                }}
                resizeMode="contain"
              />
              <Text style={{color: '#ccc', marginLeft: 3}}>Use Email</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_ROUTES.LOGIN)}
            style={[styles.logos, {marginHorizontal: 5}]}>
            <Image
              source={require('../Assets/funLogoBtn.png')}
              style={{
                height: 32,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {Platform.OS === 'ios' ? (
          <View>
            <TouchableOpacity
              onPress={handleOnApplePress}
              style={[styles.logos]}>
              <Image
                source={require('../Assets/AppleLogo.png')}
                style={{
                  //width: '30%',
                  height: 30,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.logos}>
            <GoogleBTN onStart={true} />
          </View>
        )}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '10%',
        }}>
        <View
          style={{
            marginVertical: 15,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 11}}>
            By continuing, you agree to Share Slate’s
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{paddingHorizontal: 0}}
              noBg
              onPress={() => {
                Linking.openURL('https://www.shareslate.fun/terms');
              }}>
              <Text style={{color: '#5E72E4', fontSize: 12, fontWeight: '700'}}>
                Terms & Conditions{' '}
              </Text>
            </TouchableOpacity>

            <Text style={{color: 'white', fontSize: 12, fontWeight: '700'}}>
              {' '}
              and{' '}
            </Text>
            <TouchableOpacity
              style={{paddingHorizontal: 0}}
              noBg
              onPress={() => {
                Linking.openURL('https://www.shareslate.fun/privacypolicy');
              }}>
              <Text style={{color: '#5E72E4', fontSize: 12, fontWeight: '700'}}>
                {' '}
                Privacy Policy{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{color: 'white', marginBottom: 12}}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_ROUTES.LOGIN)}
          style={{
            width: '93%',
            //height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7,
            marginBottom: 15,
            borderRadius: 25,
            paddingVertical: 8,
            borderWidth: 2,
            borderColor: '#263047',
          }}>
          <Text style={{color: '#fff', fontWeight: '800'}}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AuthDecide;

const styles = StyleSheet.create({
  logos: {
    width: Dimensions.get('screen').width * 0.3,
    backgroundColor: '#263047',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    height: 51,
  },
});
