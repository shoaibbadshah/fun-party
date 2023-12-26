import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import InputFieldComponent from '../Components/InputFieldComponent';
import SignUpButtonComponent from '../Components/SignUpButtonComponent';
import {setUser} from '../Store/Actions/user';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const handlePress = () => {
    navigation.navigate(NAVIGATION_ROUTES.FUN_PARTY_INVITE);
    // dispatch(setUser(signInData));
  };
  const handleSignInData = (name, value) => {
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.connectingDropsHeading}>SignIn</Text>

        <InputFieldComponent
          label="Email"
          secureTextEntry={false}
          keyboardType="default"
          placeholder="Enter your email"
          name="email"
          value={signInData?.email}
          handleChange={handleSignInData}
        />

        <InputFieldComponent
          label="Password"
          placeholder="Enter your Password"
          keyboardType="default"
          secureTextEntry={true}
          name="password"
          value={signInData?.password}
          handleChange={handleSignInData}
        />

        <View style={{paddingBottom: 20}} />
        <SignUpButtonComponent title="Submit" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  connectingDropsHeading: {
    color: '#000',
    fontSize: '43@s',
    fontWeight: '700',
    marginVertical: '5@s',
  },
});

export default SignIn;
