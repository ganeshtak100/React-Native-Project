import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// import {Platform} from 'react-native';
// import PushNotification from 'react-native-push-notification';

// export const requestPermissions = async () => {
//   try {
//     const isPermissionGranted = await messaging().requestPermission();
//     console.log('jkjkkjkjkjk');
//     const enabled =
//       isPermissionGranted === messaging.AuthorizationStatus.AUTHORIZED ||
//       isPermissionGranted === messaging.AuthorizationStatus.PROVISIONAL;
//     if (enabled) {
//       // checkPermission();
//       getDeviceToken();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const checkPermission = async () => {
  try {
    // await firebase.initializeApp();
    // const hasPermission = await firebase.messaging().hasPermission();
    const isPermissionGranted = await messaging().requestPermission();
    console.log('==', isPermissionGranted);

    if (isPermissionGranted) {
      console.log('first');
      getDeviceToken();
    } else {
      requestPermission();
    }
  } catch (error) {
    console.log(error);
  }
};

const requestPermission = async () => {
  try {
    const isPermissionGranted = await messaging().requestPermission();
    if (isPermissionGranted) {
      checkPermission();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDeviceToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  // console.log('-----fcm token---', fcmToken);

  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      console.log('fcm token---', fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', fcmToken);
        return;
      }
    } catch (e) {
      console.log('error for fcm token--', e);
    }
  } else return;
};

const getMessage = async () => {
  try {
    const msg = await messaging().onMessage(async msg => {
      console.log('=============Notification===========', msg);
      // const data =
      //   typeof msg?.data == 'object' && Object.keys(msg?.data).length > 0
      //     ? msg?.data
      //     : msg?.notification;
      // showNotification(data?.title, data?.body, data);
    });
  } catch (error) {
    console.log(error);
  }
};

// export const showNotification = (title, message, user = {}) => {
//   const channelId = 'default_notification_channel_id';
//   PushNotification.localNotification({
//     title: 'Demo Notification',
//     message: message,
//     userInfo: user,
//     channelId: channelId,
//     playSound: true,
//   });
// };

// function createNotificationChannel() {
//   alert();
//   if (Platform.OS == 'android') {
//     PushNotification.createChannel(
//       {
//         channelId: 'default_notification_channel_id', // (required)
//         channelName: 'default_notification_channel_id', // (required)
//         channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//         soundName: 'notification_sound.mp3',
//         importance: 4, // (optional) default: 4. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//       },
//       created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//     );
//   }
//   return;
// }

export const NotificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('first', remoteMessage);
    /* Handle the incoming data on remoteMessage*/
  });

  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification in foreground state...', remoteMessage);
  });
};

export const callNotification = () => {
  // PushNotification.configure({
  //   onNotification: notification => {
  //     console.log('notification==', notification);
  //   },
  // });
  getDeviceToken();
  // checkPermission();
  // requestPermissions();
  // createNotificationChannel();
  // getMessage();
};
