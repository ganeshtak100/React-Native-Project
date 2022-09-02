import {PermissionsAndroid} from 'react-native';
// const permissionWriteExternalStorage = async () => {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//   );
//   return granted === PermissionsAndroid.RESULTS.GRANTED;
// };

// if (Platform.OS === 'android') {
//   const permissionGranted = await permissionWriteExternalStorage();
//   if (permissionGranted) {
//     await FileSystem.writeFile(filePath, base64Data, 'base64');

//     if (!FileSystem.exists(filePath)) return; // check to see if our filePath was created

//     await FileSystem.cpExternal(filePath, fileName, 'downloads'); // copies our file to the downloads folder/directory
//     // file should now be visible in the downloads folder
//   }

//   return;
// }

export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}
