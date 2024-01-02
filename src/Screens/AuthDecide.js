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

const AuthDecide = () => {
  const navigation = useNavigation();

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

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#263047',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 120,
          }}>
          <Image
            source={require('../Assets/partyEmail.png')}
            style={{
              width: '30%',
            }}
            resizeMode="contain"
          />
          <Text style={{color: 'white', paddingBottom: 7}}>Use Email </Text>
        </View>

        <View
          style={{
            width: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#263047',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 120,
            marginHorizontal: 5,
          }}>
          <Image
            source={require('../Assets/funlogo.png')}
            style={{
              width: '30%',
              height: 70,
            }}
            resizeMode="contain"
          />
        </View>
        <View
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
              width: '30%',
              height: 70,
            }}
            resizeMode="contain"
          />
        </View>
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
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7,
            marginBottom: -15,
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
