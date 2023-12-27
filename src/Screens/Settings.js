import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {API} from '../Api';
import TextInput from '../Components/TextInput';
import {
  updatePrivacy,
  update_notification_setting,
} from '../Store/Actions/profile';
import {DarkMode, LightMode} from '../Store/Actions/theme';
import {NAVIGATION_ROUTES} from '../Utils/Navigation/NavigationRoutes';
import {isIos} from '../Utils/helpers';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {userSignOut} from '../Store/Actions/user';
import {
  CommunityGuidLines,
  CookiePolicy,
  CopyrightPolicy,
  PrivacyPolicy,
  TermsandConditions,
} from '../Utils/PolicyStrings';

const Settings = () => {
  const theme = useSelector(e => e.theme);
  const user = useSelector(e => e.user?.data?.checkUser);

  const [isEnabled, setIsEnabled] = useState(
    theme.name === 'dark' ? true : false,
  );
  const [isPrivate, setIsPrivate] = useState(
    user?.privacy_setting?.private_account,
  );
  const [isCommentsNotifcation, setIsCommentsNotifcation] = useState(
    user?.notification_setting?.comments_notification,
  );
  const [isLikeNotification, setIsLikeNotification] = useState(
    user?.notification_setting?.likes_notification,
  );
  const [isFollowing_notification, setIsFollowing_notification] = useState(
    user?.notification_setting?.following_notification,
  );

  const [isChangePassVisible, setIsChangePassVisible] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const type = ['public', 'follower', 'only_me'];

  const [commentType] = useState(type);
  const [followType] = useState(type);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const ref1 = useRef();
  const ref2 = useRef();

  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      if (previousState == false) {
        dispatch(DarkMode());
        return !previousState;
      } else {
        dispatch(LightMode());
        return !previousState;
      }
    });
  };

  const togglePrivate = val => {
    setIsPrivate(val);
    handleCommentPrivacy(val, undefined, undefined);
  };

  const toggleCommentsNotifcation = value => {
    setIsCommentsNotifcation(value);
    handleNotificationSettings(value, undefined, undefined);
  };
  const toggleLikesNotification = value => {
    setIsLikeNotification(value);
    handleNotificationSettings(undefined, value, undefined);
  };
  const toggleFollowingNotification = value => {
    setIsFollowing_notification(value);
    handleNotificationSettings(undefined, undefined, value);
  };

  const handleNotificationSettings = (isComment, isLike, isFollowing) => {
    let body = {};
    if (isComment !== undefined) {
      body.comments_notification = isComment;
    }
    if (isLike !== undefined) {
      body.likes_notification = isLike;
    }
    if (isFollowing !== undefined) {
      body.following_notification = isFollowing;
    }

    dispatch(update_notification_setting(body));
  };

  const handleRBSheetFollow = () => {
    ref1.current.open();
  };

  const handleRBSheetComment = () => {
    ref2.current.open();
  };

  const handleCommentPrivacy = (isPrivate, followType, commentType) => {
    let body = {};
    if (isPrivate !== undefined) {
      body.private_account = isPrivate;
    }
    if (followType !== undefined) {
      body.who_can_follow_you = followType;
    }
    if (commentType !== undefined) {
      body.who_can_comment_on_mini = commentType;
    }

    dispatch(updatePrivacy(body));
    ref1.current.close();
    ref2.current.close();
  };

  const handleChangePassword = () => {
    setIsChangePassVisible(!isChangePassVisible);
  };

  const updatePass = async () => {
    if (!newPass) {
      Alert.alert('Error', 'Enter valid New password ');
      return;
    } else if (!confirmPass) {
      Alert.alert('Error', 'Enter valid confirm password');
      return;
    } else if (confirmPass !== newPass) {
      Alert.alert('Error', 'Password does not match ');
      return;
    }

    const body = {
      password: confirmPass,
    };

    try {
      const {data} = await API.v1.Auth.changePassword(body);
      Alert.alert('Password updated successfully');
      if (data.status == 200) {
        setConfirmPass('');
        setNewPass('');
        handleChangePassword();
      }
    } catch (error) {
      Alert.alert('confirm password Error', error.response.data.message);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const data = await API.v1.Auth.deleteProfile();
      Alert.alert('User deleted', data.data.message);
      handleLogout();
    } catch (error) {
      console.log(
        '🚀 ~ file: Settings.js:176 ~ handleDeleteProfile ~ error:',
        error,
      );
    }
  };
  const handleLogout = async () => {
    let fcm = {};
    try {
      if (isIos) {
        fcm.is_ios = true;
      } else {
        fcm.is_android = true;
      }
      dispatch(userSignOut(fcm));
      GoogleSignin.signOut();
      GoogleSignin.clearCachedAccessToken();
    } catch (error) {
      Alert.alert('Logout Failed');
    }
  };
  const styles = useStyles(theme);
  return (
    <ScrollView
      style={{backgroundColor: theme.primary}}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, padding: 15, backgroundColor: theme.primary}}>
        <Text style={styles.heading}>Account</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleChangePassword} style={styles.row}>
            <Text style={styles.rowText}>Change password</Text>
            <Entypo name="key" size={22} style={styles.rowText} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteProfile} style={styles.row}>
            <Text style={styles.rowText}>Delete account</Text>
            <AntDesign name="delete" size={22} style={styles.rowText} />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>Privacy Settings</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Private account</Text>
            <Switch
              trackColor={{false: theme.primary, true: theme.secondary}}
              thumbColor={isEnabled ? theme.primary : '#f4f3f4'}
              ios_backgroundColor={theme.button}
              onValueChange={val => togglePrivate(val)}
              value={isPrivate}
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              handleRBSheetFollow();
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Who can follow you</Text>
            <Text style={styles.rowText}>
              {user?.privacy_setting?.who_can_follow_you === 'only_me'
                ? 'Only me'
                : 'Everyone'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleRBSheetComment();
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Who can comment on your mini</Text>
            <Text style={styles.rowText}>
              {user?.privacy_setting?.who_can_comment_on_mini === 'only_me'
                ? 'Only me'
                : user?.privacy_setting?.who_can_comment_on_mini === 'follower'
                ? 'Follower'
                : 'Everyone'}
              {console.log(
                '🚀 ~ file: Settings.js:268 ~ Settings ~ user?.privacy_setting?.who_can_comment_on_mini :',
                user?.privacy_setting?.who_can_comment_on_mini,
              )}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_ROUTES.BLOCKED_ACCOUNTS)
            }
            style={styles.row}>
            <Text style={styles.rowText}>Blocked Accounts</Text>
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.heading}>Notification</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Comments notification</Text>
            <Switch
              trackColor={{ false: theme.primary, true: theme.secondary }}
              thumbColor={isEnabled ? theme.primary : "#f4f3f4"}
              ios_backgroundColor={theme.button}
              onValueChange={(e) => toggleCommentsNotifcation(e)}
              value={isCommentsNotifcation}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Likes notification</Text>
            <Switch
              trackColor={{ false: theme.primary, true: theme.secondary }}
              thumbColor={isEnabled ? theme.primary : "#f4f3f4"}
              ios_backgroundColor={theme.button}
              onValueChange={(e) => toggleLikesNotification(e)}
              value={isLikeNotification}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Following notification</Text>
            <Switch
              trackColor={{ false: theme.primary, true: theme.secondary }}
              thumbColor={isEnabled ? theme.primary : "#f4f3f4"}
              ios_backgroundColor={theme.button}
              onValueChange={(e) => toggleFollowingNotification(e)}
              value={isFollowing_notification}
            />
          </View>

       
        </View> */}

        <Text style={styles.heading}>About</Text>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                textData: CommunityGuidLines,
              });
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Community Guidelines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                textData: TermsandConditions,
              });
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Terms & Conditions</Text>
          </TouchableOpacity>
          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Privacy Policy</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                textData: PrivacyPolicy,
              });
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Privacy Policy</Text>
          </TouchableOpacity>
          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Copyright Policy</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                textData: CopyrightPolicy,
              });
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Copyright Policy</Text>
          </TouchableOpacity>
          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Cookie Policy</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                textData: CookiePolicy,
              });
            }}
            style={styles.row}>
            <Text style={styles.rowText}>Cookie Policy</Text>
          </TouchableOpacity>

          {/* <View style={[styles.row, { justifyContent: 'center' }]}>
            <Text
              onPress={() =>
                navigation.navigate(NAVIGATION_ROUTES.NOTIFICATION_SETTINGS)
              }
              style={styles.rowText}
            >
              Show More
            </Text>
          </View> */}
        </View>
      </View>

      <RBSheet
        ref={ref1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('screen').height / 4.5}
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
        <TouchableOpacity
          onPress={() =>
            handleCommentPrivacy(undefined, followType[0], undefined)
          }
          style={styles.button}>
          <MaterialIcons name="public" size={28} color={theme.text} />
          <View style={styles.title}>
            <Text style={styles.textHeading}>Public</Text>
            <Text style={{color: theme.text}}>Everyone can follow you</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleCommentPrivacy(undefined, followType[2], undefined)
          }
          style={styles.button}>
          <MaterialIcons name="public" size={28} color={theme.text} />
          <View style={styles.title}>
            <Text style={styles.textHeading}>Only me</Text>
            <Text style={{color: theme.text}}>No one can follow</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={ref2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('screen').height / 3.5}
        closeOnPressBack={true}
        openDuration={50}
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: 'grey',
          },
          container: {
            borderRadius: 15,
            backgroundColor: theme.primary,
          },
        }}>
        <TouchableOpacity
          onPress={() =>
            handleCommentPrivacy(undefined, undefined, commentType[0])
          }
          style={styles.button}>
          <MaterialIcons name="public" size={28} color={theme.text} />
          <View style={styles.title}>
            <Text style={styles.textHeading}>Everyone</Text>
            <Text style={{color: theme.text}}>
              Everyone can comment on your mini
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleCommentPrivacy(undefined, undefined, commentType[1])
          }
          style={styles.button}>
          <MaterialIcons name="public" size={28} color={theme.text} />
          <View style={styles.title}>
            <Text style={styles.textHeading}>Followers</Text>
            <Text style={{color: theme.text}}>
              Followers that you follow back
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleCommentPrivacy(undefined, undefined, commentType[2])
          }
          style={styles.button}>
          <MaterialIcons name="public" size={28} color={theme.text} />
          <View style={styles.title}>
            <Text style={styles.textHeading}>Only me</Text>
            <Text style={{color: theme.text}}>No one can comment</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isChangePassVisible}
        onRequestClose={handleChangePassword}
        style={{margin: 0, flex: 1}}>
        <TouchableOpacity
          onPress={handleChangePassword}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              backgroundColor: theme.background,
              height: '32%',
              width: '90%',
              borderRadius: 10,
              justifyContent: 'center',
              padding: 20,
            }}>
            <Text style={{fontSize: 20, marginBottom: 5}}>Change Password</Text>
            <TextInput
              placeholder="Enter your new password"
              onChangeText={e => {
                setNewPass(e);
              }}
            />
            <TextInput
              placeholder="Confirm your password"
              onChangeText={e => {
                setConfirmPass(e);
              }}
            />

            <Pressable
              onPress={updatePass}
              style={{
                backgroundColor: theme.black,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: '70%',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{color: theme.white, fontSize: 16, fontWeight: '500'}}>
                Update
              </Text>
            </Pressable>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default Settings;

const useStyles = theme =>
  StyleSheet.create({
    heading: {
      fontWeight: 'bold',
      fontSize: 20,
      marginVertical: 12,
      color: theme.text,
    },
    row: {
      flexDirection: 'row',
      backgroundColor: theme.button,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    container: {
      padding: 5,
      borderRadius: 8,
      backgroundColor: theme.button,
    },
    rowText: {
      color: theme.text,
    },
    button: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {paddingVertical: '2%', paddingHorizontal: 15},
    textHeading: {fontSize: 18, fontWeight: '600', color: theme.text},
  });
