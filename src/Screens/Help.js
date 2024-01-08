import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import OnBoard from './src/screens/Onboard';
import { NAVIGATION_ROUTES } from '../Utils/Navigation/NavigationRoutes';

const Help = ({ navigation }) => {
  return (
    // <Login />
    // <OnBoard />
    <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: 'black' }}>
      <StatusBar barStyle={'default'} backgroundColor={'black'} />

      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '10%',
        }}
      >
        {/* <Text style={{color: 'white', fontWeight: '600', fontSize: 24}}>
          Need Help
        </Text> */}

        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.shareslate.fun/ContactUs');
          }}
          style={{
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#5E72E4', fontWeight: 'bold' }}>
            Open a support case
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#5E72E4', fontWeight: 'bold' }}>
            Forgot password
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NAVIGATION_ROUTES.RECOVER_ACCOUNT);
          }}
          style={{
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#5E72E4', fontWeight: 'bold' }}>
            Recover my account
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            width: '100%',
            marginTop: 35,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#5E72E4',
          }}
        >
          <Text style={{ color: '#5E72E4' }}>Other issues</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Help;
