import {Platform} from 'react-native';
import {Types} from '../Store/Types/type';
import {API} from '../Api';
import {store} from '../Store/store';
import Share from 'react-native-share';
import dynamicLinks, {firebase} from '@react-native-firebase/dynamic-links';
import ImagePicker from 'react-native-image-crop-picker';
// import {
//   IronSource,
//   IronSourceSegment,
//   IronSourceRewardedVideo,
//   IronSourceInterstitials,
//   IronSourceOfferwall,
//   IronSourceBanner,
// } from '@wowmaking/react-native-iron-source';
import {useDispatch} from 'react-redux';
import {
  AdEventType,
  AppOpenAd,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import socketServcies from './socketServcie';
import CustomAlert from '../Components/CustomAlert';
import {NAVIGATION_ROUTES} from './Navigation/NavigationRoutes';
const isIos = Platform.OS === 'ios';

const timeSince = date => {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' m';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' d';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' m';
  }
  return Math.floor(seconds) + ' s';
};
const handleAddVideo = (route, navigation, createType, miniId) => {
  ImagePicker.openPicker({
    width: 570,
    height: 250,
    cropping: false,
    multiple: false,
    mediaType: route?.params?.item ? 'any' : 'video',
  }).then(image => {
    console.log(image, 'image for picker');
    if (image == null || undefined || '') return;
    if (route?.params?.item) {
      route.params.sendMessageHandler(image);

      navigation.goBack();
      // navigation.navigate(NAVIGATION_ROUTES.CHAT_ROOM, {
      //   image: image.path,
      //   // mediaType: image?.mime?.split("/")[0],
      //   item: route?.params?.item
      // });
    } else {
      navigation.navigate(NAVIGATION_ROUTES.CREATE_MINI, {
        image: image,
        from: 'upload',
        type: 'picker',
        miniId,
        ...createType,
      });
    }
  });
};
const handleChangeNotificationElement = (arr, id) => {
  return arr.map(el =>
    el._id === id
      ? {
          ...el,
          is_read: true,
        }
      : el,
  );
};

const handleFilteredReadUnread = (arr, isRead, key) => {
  return [
    ...new Map(
      arr.filter(el => el.is_read === isRead).map(item => [item[key], item]),
    ).values(),
  ];
};
const countFormatter = num => {
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'K'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, '$1') + item.symbol
    : '0';
};
const transactionStyle = coin => {
  if (coin == 10) {
    return 'Flower';
  } else if (coin == 20) {
    return 'Thumbs Up';
  } else if (coin == 50) {
    return 'Stars';
  } else if (coin == 100) {
    return 'Love';
  } else if (coin == 250) {
    return 'Kiss';
  } else if (coin == 500) {
    return 'Crown';
  }
};

const convertMentionsToPlainText = text => {
  const entityRegex = /(@|#)\[([^\]]+)\]\(\w+\)/g;
  const plainText = text.replace(entityRegex, '$1$2');
  return plainText;
};

import DeviceInfo from 'react-native-device-info';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const isGooglePlayServicesAvailable = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return true;
  } catch (error) {
    console.error('Google Play Services are not available:', error);
    return false;
  }
};

// Example usage
const checkAvailability = async () => {
  if (await isGooglePlayServicesAvailable()) {
    console.log(
      '🚀 ~ file: helpers.js:161 ~ checkAvailability ~ isGooglePlayServicesAvailable:',
    );
  } else {
  }
};

const generateLink = async mini_id => {
  try {
    var link = await dynamicLinks().buildShortLink(
      {
        link: `https://funparty.page.link/jofZ?${mini_id}`,
        domainUriPrefix: 'https://funparty.page.link',
        // link: `https://appshareslatefun.page.link/PZXe?${mini_id}`,
        // domainUriPrefix: 'https://appshareslatefun.page.link',
        analytics: {
          campaign: 'banner',
        },
        android: {
          packageName: 'com.shareslatefunparty',
          minimumVersion: '1',
        },
        ios: {
          appStoreId: '6474907392',
          bundleId: 'org.reactjs.native.example.shareslatefunparty',
          minimumVersion: '1',
        },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    );
    console.log('🚀 ~ file: helpers.js:165 ~ generateLink ~ link:', link);
    return link;
  } catch (error) {
    console.log('🚀 ~ file: helpers.js:163 ~ generateLink ~ error:', error);
  }
};
const adUnitId = TestIds.APP_OPEN;

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});
const calculateAge = birthDateString => {
  var birthDate = new Date(birthDateString);
  var currentDate = new Date();

  var ageInMilliseconds = currentDate - birthDate;
  var millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
  var ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);

  return ageInYears;
};
const generateRandomMeetId = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let strongId = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    strongId += characters.charAt(randomIndex);
  }

  return strongId;
};
// const showInterstitial = () => {
//   const onClose = () => IronSourceInterstitials.removeAllListeners();

//   IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
//     IronSourceInterstitials.showInterstitial();
//   });

//   IronSourceInterstitials.addEventListener(
//     'interstitialDidFailToLoadWithError',
//     (err) => {
//       console.warn('Failed to load inter', err);
//       onClose();
//     }
//   );
//   IronSourceInterstitials.addEventListener(
//     'interstitialDidFailToShowWithError',
//     (err) => {
//       console.warn('Failed to show inter', err);
//       onClose();
//     }
//   );
//   IronSourceInterstitials.addEventListener('interstitialDidClose', () => {
//     onClose();
//   });

//   IronSourceInterstitials.loadInterstitial();
// };
const getImageExtension = url => {
  const extension = url.split('.').pop().toLowerCase(); // Get the extension after the last dot and convert to lowercase
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // List of common image extensions

  if (imageExtensions.includes(extension)) {
    return true; // Return the extension if it's in the list of image extensions
  } else {
    return false; // Return null if the extension is not in the list
  }
};
const getMIniSocket = ID => {
  const dispatch = useDispatch();
  const user = store.getState().user;
  socketServcies.emit('mini', {
    user_id: user.data?.checkUser?._id,
    mini_id: ID,
  });
  socketServcies.on('mini', e => {
    console.log('🚀 ~ file: socketServcies.js:140 ~ socketServcies.on ~ e:', e);
    // return e;
    // dispatch({
    //   type: Types.LIKE_COUNT,
    //   payload: {
    //     like_id: e._id,
    //     like_count: e?.likes_count,
    //     is_like: e?.is_like,
    //   },
    // });

    dispatch({
      type: Types.UPDATE_MINI,
      payload: {
        update_miniId: e._id,
        mini: e,
      },
    });
  });
  // if (ID) {
  //   return ID; // Return the extension if it's in the list of image extensions
  // } else {
  //   return ""; // Return null if the extension is not in the list
  // }
};

// const adUnitId_APP_Open = TestIds.INTERSTITIAL;
// const interStitial_APP_Open = InterstitialAd.createForAdRequest(
//   adUnitId_APP_Open,
//   {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ["fashion"],
//   },
// );

const adUnitWithInApp = isIos
  ? 'ca-app-pub-3686012001393355/2730649049'
  : 'ca-app-pub-3686012001393355/9737204239';

// const interStitialAdsWithInApp = InterstitialAd.createForAdRequest(
//   adUnitWithInApp,
//   {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ["fashion"],
//   },
// );
// const interStitialAdsWithInAppSHOW = () => {
//   interStitialAdsWithInApp.addAdEventListener(AdEventType.LOADED, () => {
//     interStitialAdsWithInApp.show();
//     // setRunning(true);
//   });

//   interStitialAdsWithInApp.load();
//   // setLaterAdd(false);
//   // return unsubscribe;
// };

// const onShareLink = async (setLoader) => {
//   // Generate the short link
//   setLoader && setLoader(true);
//   const link = await generateLink();

//   if (link) {
//     RNFetchBlob.config({
//       fileCache: true,
//     })
//       .fetch("GET", "https://shareslatelogoandstuff.s3.amazonaws.com/1024.png")
//       .then((resp) => resp.readFile("base64"))
//       .then(async (resultBase64) => {
//         var base64Data = `data:image/png;base64,${resultBase64}`;

//         const options = {
//           title: "Hey! I found this amazing app that I think you will love.",
//           // message: `Check out this cool app! ${link} `,
//           message: `Check it out: ShareSlate Fun. Download it here: ${link}`,
//           urls: [base64Data],
//         };

//         await Share.open(options)
//           .then((res) => {
//             console.log("res", res);
//             setLoader && setLoader(false);
//           })
//           .catch((err) => {
//             console.log("error while sharing", err);
//             setLoader && setLoader(false);
//           });
//       });
//   }
//   setLoader && setLoader(false);
// };

const searchByName = (searchString, peopleArray) => {
  const foundPeople = [];

  for (const person of peopleArray) {
    const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();

    if (fullName.includes(searchString.toLowerCase())) {
      foundPeople.push(person);
    } else {
      foundPeople.pop();
    }
  }

  return foundPeople;
};
const checkImageUrl = (url, alfaBaticUrl) => {
  // console.log("🚀 ~ file: helpers.js:331 ~ checkImageUrl ~ url:", url);
  // List of common image file extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  // Get the file extension from the URL
  if (url) {
    const urlParts = url.split('.');
    const fileExtension = urlParts[urlParts.length - 1].toLowerCase();

    // Check if the file extension is in the list of image extensions
    if (imageExtensions.includes(fileExtension)) {
      return url; // Return the original URL since it's an image
    } else {
      // Return a dummy image URL if it's not an image
      // const dummyImageUrl = `https://ui-avatars.com/api/?background=random&name=${user?.data?.checkUser?.first_name}+${user?.data?.checkUser?.last_name}`
      // "https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg";
      return alfaBaticUrl;
    }
  } else {
    const dummyImageUrl =
      'https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg';
    return alfaBaticUrl;
  }
};

const generateAuthToken = payload => {
  // var jwt = require("jsonwebtoken");
  // const token = jwt.sign(payload, "518B837725AC1959C4878BDF15362AFD8B");
  return false;
};
const formatTime = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

let alertInstance;

export function showAlert({message, centerbtnText}) {
  if (!alertInstance) {
    // const div = document.createElement('div');
    // document.body.appendChild(div);
    const onClose = () => {
      console.log('closed alert');
    };

    alertInstance = (
      <CustomAlert
        modalVisible={true}
        message={message}
        centerBtn={onClose}
        centerBtnText={centerbtnText}
      />
    );

    // render(alertInstance, div);
    return alertInstance;
  }
}
const decodeMeetID = RoomID => {
  const regex = /https:\/\/meet\.shareslate\.fun\/(\w+)\?jwt=/;
  const match = RoomID.match(regex);

  if (match && match[1]) {
    const randomMeetId = match[1];
    console.log(randomMeetId);
    return randomMeetId;
  } else {
    console.log('Random meet ID not found.');
    return null;
  }
};
export {
  // _getToken,
  isIos,
  timeSince,
  handleChangeNotificationElement,
  handleFilteredReadUnread,
  countFormatter,
  convertMentionsToPlainText,
  generateLink,
  calculateAge,
  transactionStyle,
  // showInterstitial,
  generateRandomMeetId,
  getImageExtension,
  // interStitial_APP_Open,
  // interStitialAdsWithInApp,
  // adUnitWithInApp,
  // adUnitId_APP_Open,
  // interStitialAdsWithInAppSHOW,
  getMIniSocket,
  searchByName,
  checkImageUrl,
  generateAuthToken,
  formatTime,
  handleAddVideo,
  decodeMeetID,
  appOpenAd,
  // showAlert,
};
