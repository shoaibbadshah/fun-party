import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {isIos} from '../Utils/helpers';

const {width, height} = Dimensions.get('screen');
const WatchPartyGuide = ({setGuidCheck, guidCheck, handleInvitePress}) => {
  const [adLoaded, setAdLoaded] = useState(true);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  const theme = useSelector(e => e.theme);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {flex: 1, backgroundColor: theme.primary, marginHorizontal: 15},
      ]}>
      <StatusBar
        // backgroundColor={"transparent"}
        // translucent={true}
        barStyle={theme.StatusBar}
      />
      <View
        style={[
          styles.flexStyle,
          {
            width: width - width / 3.5,
            marginBottom: height - height + 10,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setGuidCheck(!guidCheck);
          }}>
          <LeftArrow width={18} height={18} color={theme.text} />
        </TouchableOpacity>
        <Text style={{color: theme.text, fontWeight: 'bold', fontSize: 18}}>
          FunParty Instructions
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme.text,
              fontWeight: 'bold',
              fontSize: 17,
              marginTop: 10,
            }}>
            Invite sent
          </Text>

          <View
            style={{
              // width: '95%',
              // justifyContent: "center",
              // alignItems: "center",ellipsis-horizontal-outline
              marginTop: 10,
              // height: '62%',
              borderRadius: 15,
              backgroundColor: theme.name === 'dark' ? '#303d5b' : '#ECECEC',
              padding: 20,
            }}>
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 15,
              }}>
              Steps to start FunParty
            </Text>
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                textAlignVertical: 'auto',
                //   marginLeft: 15,
              }}>
              1. Go to{'   '}
              <Icon
                name="ellipsis-horizontal-outline"
                color={theme.text}
                size={19}
                //   style={{ marginTop: 35 }}
              />{' '}
            </Text>
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                textAlignVertical: 'top',
                //   height: 40,
                //   backgroundColor: "red",
                //   marginLeft: 15,
              }}>
              2. Tap on{' '}
              <Icon
                name="play-circle-outline"
                color={theme.text}
                size={18}
                //   style={{ marginTop: 35 }}
              />{' '}
              Share video icon
            </Text>
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
                //   marginLeft: 15,
              }}>
              3. Paste the video link from Fun Videos or Youtube in the text box
              and hit OK.
            </Text>

            {/* <View
            style={{
              // width: '100%',
              // marginTop: '10%',
              // maxHeight: '50%',
              display: 'none',
              // height: '55%',
              // flex: 0.9,
              //   backgroundColor: "red",
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.name === 'dark' ? 'black' : 'white',
                // justifyContent: "center",
                alignItems: 'center',
                borderRadius: 15,

                overflow: 'hidden',
              }}>
              <Text
                style={{
                  color: theme.text,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 10,
                  //   marginLeft: 15,
                }}>
                Share video
              </Text>
              <View
                style={{
                  marginTop: 10,
                  height: '25%',
                  width: '90%',
                  backgroundColor:
                    theme.name === 'dark' ? '#303d5b' : '#ECECEC',
                  borderRadius: 5,

                  //   marginLeft: 15,
                }}>
               <Text> Share video</Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  height: 1,
                  width: '100%',
                  backgroundColor:
                    theme.name === 'dark' ? '#303d5b' : '#ECECEC',
                  borderRadius: 5,
                }}>
              <View
                style={{
                  //   marginTop: 10,
                  //   height: "18%",
                  width: '100%',
                  //   backgroundColor: "#303d5b",
                  //   borderRadius: 5,
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  overflow: 'hidden',

                  //   marginLeft: 15,
                }}>
                <TouchableOpacity
                  style={{
                    height: 45,
                    width: '50%',
                    backgroundColor: theme.name === 'dark' ? 'black' : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.text,
                      fontWeight: 'bold',
                      fontSize: 16,
                      //   marginTop: 10,

                      //   marginLeft: 15,
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    // marginTop: 15,
                    height: 55,
                    width: '0.3%',
                    backgroundColor:
                      theme.name === 'dark' ? '#303d5b' : '#ECECEC',
                    borderRadius: 5,
                  }}></View>
                <TouchableOpacity
                  style={{
                    height: 45,
                    width: '50%',
                    backgroundColor: theme.name === 'dark' ? 'black' : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.text,
                      fontWeight: 'bold',
                      fontSize: 16,
                      //   marginTop: 10,
                      //   marginLeft: 15,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text>Share video</Text>
              </View>
            </View>
            </View>
          </View> */}
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              marginTop: 20,
              overflow: 'hidden',
              display: adLoaded ? 'flex' : 'flex',
            }}>
            <BannerAd
              // unitId={adUnitId}
              unitId={
                !isIos
                  ? 'ca-app-pub-3686012001393355/3621783252'
                  : 'ca-app-pub-3686012001393355/1358033256'
              }
              size={BannerAdSize.MEDIUM_RECTANGLE}
              onAdFailedToLoad={() => {
                setAdLoaded(false);
              }}
              onAdLoaded={() => {
                setAdLoaded(true);
              }}
              requestOptions={{
                networkExtras: {
                  collapsible: 'top',
                },
              }}
            />
          </View>
          <Text
            style={{
              color: theme.text,
              fontWeight: 'bold',
              fontSize: 17,
              marginTop: 15,
              // marginBottom:20
            }}>
            Enjoy your FunParty!
          </Text>
          <TouchableOpacity
            onPress={handleInvitePress}
            // disabled={checked.length == 0 ? true : false}
            style={{
              backgroundColor: theme.secondary,
              borderRadius: 8,
              height: 45,
              paddingHorizontal: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
              marginTop: 50,
            }}>
            <Text style={{color: 'white', fontSize: 16, padding: 10}}>
              {'Start FunParty'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {flex: 1},
  inviteUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  userInfo: {
    width: 30,
    height: 30,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#00000010',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchPartyGuide;
