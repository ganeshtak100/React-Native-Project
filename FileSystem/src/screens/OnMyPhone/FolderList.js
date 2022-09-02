//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FilesData} from '../../constants/data';
// var RNFS = require('react-native-fs');
// import DocumentPicker, {types} from 'react-native-document-picker';
// import { Dirs, FileSystem } from 'react-native-file-access';
// const fileName = 'myfile.pdf'; //whatever you want to call your file
// const filePath = `${Dirs.DocumentDir}/${fileName}`;
// const base64Data = 'V3JpdGluZyBhIGZpbGUgYW5kIG1ha2luZyBpdCB2aXNpYmxlIHRvIHVzZXJzIGluIFJlYWN0IE5hdGl2ZQ=='; //our base64 encode file;

// create a component
const FolderList = ({route, routeData, gridView}) => {
  const [numCols, setColumnNo] = useState(0);
  // if (gridView === 'Icons') {
  //   setColumnNo(3);
  // }

  // let gridView = gridVieW;
  console.log('gridView=', gridView, numCols);
  const navigation = useNavigation();
  const [downloadsFolder, setDownloadsFolder] = useState('');
  const [documentsFolder, setDocumentsFolder] = useState('');
  const [externalDirectory, setExternalDirectory] = useState('');
  // console.log('params==', route?.params);
  // useEffect(() => {
  //   //get user's file paths from react-native-fs
  //   setDownloadsFolder(RNFS.DownloadDirectoryPath);
  //   setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
  //   setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
  // }, []);
  // const [files, setFiles] = useState([]);
  // console.log('files==', files);

  // const getFileContent = async path => {
  //   const reader = await RNFS.readDir(path);
  //   setFiles(reader);
  // };
  // useEffect(() => {
  //   getFileContent(RNFS.DocumentDirectoryPath); //run the function on the first render.
  // }, []);

  //   const response = await DocumentPicker.pick({
  //   presentationStyle: 'fullScreen',
  //   type: [types.pdf],
  // });
  // console.log('routes data=====>>>>', routeData?.data?.item?.data);
  // let data = route?.params;

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={{width: '100%', height: 80}}
        onPress={() => {
          if (item?.item?.type && item?.item?.type == 'image') {
            navigation.navigate('ViewPhoto', {
              imageUrl: item?.item?.imageUri,
            });
          } else {
            navigation.navigate('OnMyPhone', {
              headerName: item?.item?.folderName,
              name: 'folder',
              data: item,
            });
          }
        }}>
        <View
          style={gridView == 'Icons' ? styles?.gridStyle : styles?.listStyle}>
          <View style={{paddingHorizontal: 20}}>
            <Image
              style={{
                width: gridView == 'Icons' ? 75 : 54,
                height: gridView == 'Icons' ? 75 : 54,
                borderRadius: 6,
              }}
              // source={{
              //   uri: 'file:///storage/emulated/0/Pictures/IMG_20220607_153134_1.jpg',
              // }}
              source={
                item?.item?.imageUri
                  ? {uri: `${item?.item?.imageUri}`}
                  : require('../../assests/folder.png')
              }
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1, marginLeft: 1}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{paddingTop: 5, fontSize: 15, fontWeight: '700'}}>
                {item?.item?.folderName}
              </Text>
              {gridView == 'Icons' ? (
                <Text style={{paddingTop: 8, fontSize: 12, opacity: 0.7}}>
                  {item?.item?.items + ' items'}
                </Text>
              ) : (
                <Text style={{paddingTop: 8, fontSize: 12, opacity: 0.7}}>
                  {item?.item?.createdOn + ' - ' + item?.item?.items + ' items'}
                </Text>
              )}
            </View>
          </View>

          {gridView == 'Icons' ? null : (
            <View style={{marginRight: 20, alignSelf: 'center'}}>
              <Image
                style={{width: 14, height: 16}}
                source={require('../../assests/next.png')}
              />
            </View>
          )}
        </View>
        {gridView == 'Icons' ? null : (
          <View
            style={{
              marginLeft: 93,
              height: 2,
              backgroundColor: '#CFCFD5',
              opacity: 0.5,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
  let filedata =
    routeData?.name == 'folder' ? routeData?.data?.item?.data : FilesData;

  return (
    <View style={styles.container}>
      <FlatList
        data={filedata}
        numColumns={numCols}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // marginTop: -500,
    flex: 1,
    marginBottom: 19,
    backgroundColor: '#fff',
  },
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridStyle: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  image: {
    // width: gridView == 'Icons' ? 75 : 54,
    // height: gridView == 'Icons' ? 75 : 54,
    borderRadius: 6,
  },
});

//make this component available to the app
export default FolderList;
