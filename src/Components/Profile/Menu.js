import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {Alert, View} from 'react-native';
import Share from 'react-native-share';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Text from '../../Components/Text';
import {isIos} from '../../Utils/helpers';
import {userSignOut} from '../../Store/Actions/user';
import {fetchAllAnalytics} from '../../Store/Actions/minis';
import TouchableOpacity from '../../Components/TouchableOpacity';
import {NAVIGATION_ROUTES} from '../../Utils/Navigation/NavigationRoutes';

const Menu = forwardRef((props, ref) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector(e => e.theme);
  const user = useSelector(e => e.profile?.profile);

  const handleLogout = async () => {
    let fcm = {};
    try {
      if (isIos) {
        fcm.is_ios = true;
      } else {
        fcm.is_android = true;
      }
      dispatch(userSignOut(fcm));
      // GoogleSignin.signOut();
      // GoogleSignin.clearCachedAccessToken();
      refRBSheet.current.close();
    } catch (error) {
      console.error('Logout error ;', error);
      Alert.alert('Logout Failed');
    }
  };

  const handleLink = async () => {
    const options = {
      message: 'https://shareslate.fun/' + 'profile/' + `${user._id}`,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log('🚀 ~ file: Menu.js:51 ~ handleLink ~ err:', err);
    }
    refRBSheet.current.close();
  };

  const handleMenu = () => {
    refRBSheet.current.open();
  };

  useImperativeHandle(ref, () => ({
    handleMenu,
  }));

  const handleQR = () => {
    navigation.navigate(NAVIGATION_ROUTES.QR_CODE, {
      image: user._id,
    });
    refRBSheet.current.close();
  };

  return (
    <View style={{flexDirection: 'row', marginTop: -12}}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={140}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: 'grey',
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.primary,
          },
        }}>
        {/* <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            shadowOpacity: 0,
          }}
          noBg
          onPress={() => {
            handleQR();
          }}>
          <Ionicons
            name={'qr-code-outline'}
            size={22}
            color={theme.textColor}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>
            Share Slate Code
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            shadowOpacity: 0,
          }}
          noBg
          onPress={handleLink}>
          <Ionicons name={'share-outline'} size={22} color={theme.textColor} />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>
            Share Profile
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            shadowOpacity: 0,
            display: 'flex',
          }}
          noBg
          onPress={() => {
            refRBSheet.current.close();
            dispatch(fetchAllAnalytics(user?._id));
            navigation.navigate(NAVIGATION_ROUTES.PROFILE_ALL_ANALYTICS);
          }}>
          <Ionicons
            name={'analytics'}
            size={22}
            style={{
              transform: [{rotate: '180deg'}],
              color: theme.textColor,
            }}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>
            Analytics
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            shadowOpacity: 0,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}
          noBg
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate(NAVIGATION_ROUTES.SETTINGS);
          }}>
          <Ionicons
            name={'settings-outline'}
            size={22}
            color={theme.textColor}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>
            Settings and privacy
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            shadowOpacity: 0,
            display: 'flex',
          }}
          noBg
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate(NAVIGATION_ROUTES.WALLET_HOME);
          }}>
          <Octicons
            name={'credit-card'}
            size={22}
            style={{
              transform: [{rotate: '180deg'}],
              color: theme.textColor,
            }}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>Wallet</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            shadowOpacity: 0,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}
          noBg
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate(NAVIGATION_ROUTES.SUPPORT);
          }}>
          <MaterialIcons
            name={'support-agent'}
            size={22}
            color={theme.textColor}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>Support</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            shadowOpacity: 0,
          }}
          noBg
          onPress={handleLogout}>
          <Octicons
            name={'sign-out'}
            size={22}
            style={{
              transform: [{rotate: '180deg'}],
              color: theme.textColor,
            }}
          />
          <Text style={{paddingLeft: 15, color: theme.textColor}}>Logout</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
});

export default Menu;
