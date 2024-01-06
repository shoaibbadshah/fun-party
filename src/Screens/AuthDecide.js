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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import appleAuth from '@invertase/react-native-apple-authentication';
import {API} from '../Api';
import {useDispatch} from 'react-redux';
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
          height: Dimensions.get('screen').height * 0.4,
        }}
        resizeMode="contain"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_ROUTES.SIGNUP)}
          style={{
            width: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#263047',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 120,
            paddingVertical: 5,
          }}>
          <Image
            source={require('../Assets/partyEmail.png')}
            style={{
              width: '27%',
              // height:  22,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              // paddingBottom: Platform.OS == 'ios' ? 0 : 9,
            }}>
            Use Email{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_ROUTES.LOGIN)}
          style={{
            width: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#263047',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 120,
          }}>
          <Image
            source={require('../Assets/funlogo.png')}
            style={{
              width: '27%',
              height: 50,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {Platform.OS == 'ios' ? (
          <TouchableOpacity
            onPress={handleOnApplePress}
            style={{
              width: Dimensions.get('screen').width * 0.3,
              backgroundColor: '#263047',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 120,
            }}>
            <Image
              source={require('../Assets/partyApple.png')}
              style={{
                width: '27%',
                height: 50,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <GoogleBTN onStart={true} />
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
                Linking.openURL('https://www.shareslate.fun/terms');
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
