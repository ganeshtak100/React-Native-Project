import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {FilesData} from './src/constants/data';
import TabBar from './src/navigation/TabBar';
import {store} from './src/redux/store';
import {hasAndroidPermission} from './src/utils/Premission/FileAccess';

export default function App() {
  useEffect(() => {
    const media = [];
    async function galleryImage() {
      if (Platform.OS === 'android' && (await hasAndroidPermission())) {
        CameraRoll.getPhotos({
          first: 300,
          assetType: 'Photos',
        })
          .then(data => {
            // console.log('getPhotes respons-', data);
            data.edges.forEach((d, index) => {
              if (index < 8) {
                FilesData[0]?.data.push({
                  folderName: d?.node?.name ? d?.node?.name : 'My Files',
                  createdOn: '24/3/22',
                  imageUri: d.node.image.uri
                    ? d.node.image.uri
                    : require('./src/assests/folder.png'),
                  size: '',
                  location: '',
                  timestamp: '',
                  type: 'image',
                  items: 5,
                });
              }
              if (index > 8 && index < 18) {
                FilesData[1]?.data.push({
                  folderName: d?.node?.name ? d?.node?.name : 'My Files',
                  createdOn: '24/3/22',
                  imageUri: d.node.image.uri
                    ? d.node.image.uri
                    : require('./src/assests/folder.png'),
                  size: '',
                  location: '',
                  timestamp: '',
                  type: 'image',
                  items: 5,
                });
              }
              if (index > 18 && index < 28) {
                FilesData[3]?.data.push({
                  folderName: d?.node?.name ? d?.node?.name : 'My Files',
                  createdOn: '24/3/22',
                  imageUri: d.node.image.uri
                    ? d.node.image.uri
                    : require('./src/assests/folder.png'),
                  size: '',
                  location: '',
                  timestamp: '',
                  type: 'image',
                  items: 5,
                });
              }
            });
            // data.edges.forEach(
            //   d =>
            //     FilesData[0]?.data.push({
            //       folderName: d?.node?.name ? d?.node?.name : 'My Files',
            //       createdOn: '24/3/22',
            //       imageUri: d.node.image.uri
            //         ? d.node.image.uri
            //         : require('./src/assests/folder.png'),
            //       size: '',
            //       location: '',
            //       timestamp: '',
            //       type: '',
            //       items: 5,
            //     }),

            // media.push({
            //   photo: d.node.image.uri,
            // }),
            // );
            // FilesData[0]?.data.push(media);
          })
          .catch(console.log('error'));
      }
      console.log('fILES DATA=', FilesData[0]?.data);
    }
    galleryImage();
    // console.log(' dasta', media);

    // for (let i = 0; i < media.length; i++) {}
  }, []);
  return (
    <>
      <Provider store={store}>
        <TabBar />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
