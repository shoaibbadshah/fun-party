import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// import TabRoutes from "./TabRoutes";
import Login from '../../Screens/Login';
import Signup from '../../Screens/Signup';
import OnBoard from '../../Screens/Onboard';
import {NAVIGATION_ROUTES} from './NavigationRoutes';

// import EditProfile from "../../Screens/EditProfile";
// import SeeAll from "../../Screens/SeeAll";
// import Followers from "../../Screens/Followers";
// import ProfileMiniVideo from "../../Components/ProfileMiniVideo";
// import ReplyMini from "../../Screens/ReplyMini";
// import ChallengeInvite from "../../Screens/ChallengeInvite";
// import TrendingMini from "../../Screens/TrendingMini";

// import CommentComponent from "../../Components/CommentComponent";
// import Profile from "../../Screens/Profile";
// import CreateMini from "../../Screens/CreateMini";
import TermsnConditions from '../../Components/TermsnConditions';
// import QRCodeScreen from "../../Screens/QRCode";
import Help from "../../Screens/Help";
import ForgetPassword from '../../Screens/ForgetPassword';

// import SearchMini from "../../Screens/SearchMinis";
// import Explore from "../../Screens/Explore";
import {Dimensions, StatusBar, Text, View} from 'react-native';
// import Settings from "../../Screens/Settings";
// import BlockedAccounts from "../../Screens/BlockedAccounts";
// import NotificationSetting from "../../Screens/NotificationSetting";
// import Support from "../../Screens/Support";
// import CreateSupportCase from "../../Screens/CreateSupportCase";
// import SupportChat from "../../Screens/SupportChat";
import {navigationRef} from './navigationRef';
import RecoverAccount from "../../Screens/RecoverAccount";
// import WalletHome from "../../Screens/WalletScreens/WalletHome";
// import Statement from "../../Screens/WalletScreens/Statement";
// import WalletStatement from "../../Screens/WalletScreens/WalletStatement";
// import Insights from "../../Screens/Insights";
// import PaymentScreen from "../../Screens/WalletScreens/ToUp";
// import ProfileAllAnalytics from "../../Screens/ProfileAllAnalytics";
// import ChatRoom from "../../Screens/Chat";
// import MediaForChat from "../../Components/MediaForChat";
// import NotificationScreen from "../../Screens/Notifications";
// import FriendList from "../../Components/FriendList";

// import LvListings from "../../Screens/LongVideos/LvListings";
// import LvDetail from "../../Screens/LongVideos/LvDetail";
// import LvProfile from "../../Screens/LongVideos/LvProfile";
// import OwnLV from "../../Screens/OwnLV";
// import RBSheet from "react-native-raw-bottom-sheet";
// import ShareComponent from "../../Components/ShareComponent";
// import Wallet from "../../Screens/WalletScreens/Wallet";
// import WalletUsers from "../../Components/Wallet/WalletUsers";
// import CoinSelection from "../../Screens/WalletScreens/CoinSelection";
import VideoCall from '../../Screens/Jitsi/VideoCall';
import FunPartyInvite from '../../Screens/Jitsi/FunPartyInvite';
import FunPartyQuickStart from '../../Screens/Jitsi/FunPartyQuickStart';
// import LongVideosDetail from "../../Screens/LongVideos/LvDetailRevamp";
// import LvDetailReVamp from "../../Screens/LongVideos/LvDetailRevamp";

import OTPScreen from '../../Screens/OTPScreen';
import LeftArrow from '../Assets/Icons/LeftArrow';
import TabRoutes from './TabRoutes';
// import CameraScreenNew from "../../Screens/DeepAR/screens/CameraScreenNew";

const Stack = createStackNavigator();

const RootNavigator = ({initial}) => {
  const {data, isOnBaorded} = useSelector(({user}) => user);
  const {guestUser} = useSelector(state => state?.guestUser?.guestUser);
  const theme = useSelector(e => e.theme);

  const customOptions = {
    headerShown: true,
    unmountOnBlur: true,
    headerBackTitleVisible: false,
    headerTintColor: theme.text,
    headerBackTitleStyle: {color: theme.text},
    headerTitleStyle: {color: theme.text},
    headerLeft: () => (
      <LeftArrow
        onPress={() => navigationRef.current?.goBack()}
        color={'white'}
        width={24}
        height={24}
      />
    ),

    headerStyle: {
      backgroundColor: 'black',
      shadowOffset: {height: 0, width: 0},
    },
  };

  const customAuthOptions = {
    headerShown: true,
    headerBackTitle: '',
    headerTintColor: 'white',

    headerBackgroundContainerStyle: {backgroundColor: 'black'},

    headerTitleStyle: {color: 'white'},
    headerStyle: {
      backgroundColor: 'black',

      shadowOffset: {height: 0, width: 0},
    },
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={theme.statusbar} backgroundColor={theme.primary} />

      <Stack.Navigator>
        {!data && !guestUser ? (
          <>
            {!isOnBaorded && (
              <Stack.Screen
                component={OnBoard}
                name={NAVIGATION_ROUTES.ONBOARD}
                options={{headerShown: false}}
              />
            )}
            <Stack.Screen
              name={NAVIGATION_ROUTES.LOGIN}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.OTP_SCREEN}
              component={OTPScreen}
              options={{
                ...customAuthOptions,
                headerShown: true,
                title: 'Verification code',
                headerBackTitleVisible: false,
                headerBackTitle: '',
              }}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.SIGNUP}
              component={Signup}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name={NAVIGATION_ROUTES.HELP}
              component={Help}
              options={{
                ...customAuthOptions,
                headerBackTitleVisible: false,
                headerTitle: "Need Help",
              }}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.RECOVER_ACCOUNT}
              component={RecoverAccount}
              options={{
                ...customAuthOptions,
                headerBackTitleVisible: false,
                headerTitle: "Need Help",
              }}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.TERMS_CONDITION}
              component={TermsnConditions}
              options={{
                ...customAuthOptions,
                headerBackTitleVisible: false,
                title: '',
              }}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.FORGET}
              component={ForgetPassword}
              options={{
                ...customAuthOptions,
                headerBackTitleVisible: true,
                title: 'Forget Password',
                headerBackTitle: 'Forgot Password',
              }}
            />
          </>
        ) : (
          <>
          {/* <Stack.Screen
              name={NAVIGATION_ROUTES.TABS}
              component={TabRoutes}
              options={{
                ...customOptions,
                headerShown: false,
                headerTitle: 'Tab Navigator',
              }}
            /> */}
            {/* <Stack.Screen
              name={NAVIGATION_ROUTES.FUN_PARTY_QUICK_START}
              component={FunPartyQuickStart}
              options={{
                ...customOptions,
                headerShown: false,
                headerTitle: 'Create FunParty',
              }}
            /> */}
            <Stack.Screen
              name={NAVIGATION_ROUTES.FUN_PARTY_INVITE}
              component={FunPartyInvite}
              options={{
                headerShown: false,
                headerBackTitle: '',
              }}
            />
            <Stack.Screen
              name={NAVIGATION_ROUTES.JITSI}
              component={VideoCall}
              options={{
                headerShown: false,
                headerBackTitle: '',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
