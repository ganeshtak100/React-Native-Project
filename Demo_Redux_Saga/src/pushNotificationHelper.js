import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
export async function checkPermission() {
  try {
    const hasPermission = await firebase.messaging().hasPermission();
    if (hasPermission) {
      getFcmToken();
    } else {
      requestPermission();
    }
  } catch (error) {
    console.log(error);
  }
}

const requestPermission = async () => {
  try {
    const isPermissionGranted = await messaging().requestPermission();
    const enabled =
      isPermissionGranted === messaging.AuthorizationStatus.AUTHORIZED ||
      isPermissionGranted === messaging.AuthorizationStatus.PROVISIONAL;
    if (isPermissionGranted) {
      checkPermission();
    }
  } catch (error) {
    console.log(error);
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmToken) {
    try {
      let fcmToken = messaging().getToken();
      if (fcmToken) {
        AsyncStorage.setItem('fcmtoken', fcmToken);
      } else {
      }
    } catch (e) {
      console.log('error for fcm token--', e);
    }
  }
};
export const NotificationListener = () => {
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
