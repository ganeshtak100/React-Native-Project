import CameraRoll from "@react-native-community/cameraroll";
import { options } from "joi";
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, View ,Text, FlatList, Image, TouchableOpacity, SafeAreaView} from "react-native";
import ImageCropPicker, { cleanSingle } from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import { FileIconName } from "../components/data";
import CameraRollData from "../utilis/CameraRoll";
let RNFS = require('react-native-fs');
const HomeScreen =({navigation})=>{
  const [images,setImages]=useState([]);
  const [downloadDirPath,setDownloadDirPath]=useState('');

  const saveData = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if(!readGranted || !writeGranted  ) {
      console.log('Read and write permissions have not been granted');
      return;
    }
    var path = `${RNFS.ExternalStorageDirectoryPath}/MyApp`;
    RNFS.mkdir(path);
    path += '/data.json';
    RNFS.writeFile(path, JSON.stringify(getData()), 'utf8')
      .then((success) => {
        console.log('Success');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
//   console.log("files path--",RNFS.ExternalStorageDirectoryPath)
  useEffect(()=>{
    async function fectchData(){
      try {
         await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,

        ]);
      } catch (err) {
        console.warn(err);
      }
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if(!readGranted || !writeGranted ) {
      console.log('Read and write permissions have not been granted');
      return;
    }
  
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
    })
    .then(r => {
      setImages(r.edges);
    //   console.log("images data--",r.edges)
    })
    .catch((err) => {
       //Error Loading Images
    });




      setDownloadDirPath(RNFS.DownloadDirectoryPath);
    await RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      
    //   console.log('GOT RESULT', result[0].path);
      
      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0]?.isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
        
      }
      
      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      // console.log("data of files",contents,"---+++++++++");
    })
    .catch((err) => {
      console.log("==",err.message, err.codek,"====");
    });
    
  }
  fectchData();
}
  ,[])

  // CameraRollData();
 

  const openGallery=()=>{
    ImageCropPicker.openPicker({
      multiple: true,
    }).then(image => {
      const splitPath=image[0].path.split("/");
      const fileName=splitPath[splitPath.length-1];
      console.log("images array data--",image);
       saveImage(image,fileName,image[0]?.mime);
    });
  }

  const saveImage=async(source,fileName,mime)=>{
    console.log("source:",source,fileName,mime)

    const folderPath='/storage/emulated/0/Tiktok';
    const filePath=folderPath + "/" + fileName;
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if(writeGranted)
   await RNFetchBlob.fs.isDir(folderPath).then((isDir)=>{
      if(isDir){
        console.log("dir exists")
        addImage(source,filePath);
      }
      else{
        RNFetchBlob.fs.mkdir(folderPath).then(()=>{
        console.log("dir donsent  exists")

          addImage(source,filePath);
        }).catch(e=>{
          console.log("error==",e);
        })
      }
    }).catch(e=>{console.log("erroe ehile createingg dir",e)})
  }
  const addImage=(source,filePath)=>{
    RNFetchBlob.fs.createFile(filePath,source,"base64").then(()=>{
      console.log("image has been saved and path has been created");
      RNFetchBlob.fs.scanFile(filePath,mime);
    });




  }

  const renderData=(item,index)=>{
    // console.log("items data---",item?.item)
    return(
      <TouchableOpacity  key={index} onPress={()=>{
        if(item?.item && item?.item?.type =="Image"){
        navigation.navigate("Image",{item:item ? item :"Image"})}
        else if(item?.item && item?.item?.type =="Videos"){
            navigation.navigate("ShowVideos",{item:item ? item :"Videos"})
        } return;
        }} style={{display:"flex",flexDirection:"column",margin:28,backgroundColor:"#fff"}}>
       { item?.item?.icon &&
       <Image style={{width:40,height:40,backgroundColor:"#fff",alignSelf:"center"}} source={item?.item?.icon}/> }
        <View style={{marginTop:9,alignSelf:"center"}}>
        <Text style={{textAlign:"center"}}>{item?.item?.name}</Text>
        <Text style={{textAlign:"center"}}>{item?.item?.type == "Image" && images.length ? images.length :item?.item?.no_Of_Items}</Text>
        </View>
      </TouchableOpacity>
    ) 
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
    <FlatList
      data={FileIconName}
    //   data={["1","2","3","4","5","6","7","8"]}
      numColumns={4}
      renderItem={renderData}
      
      keyExtractor={(data,item)=>toString(item)}
      />
    </SafeAreaView>

  )
}

export default HomeScreen;

// You can use react-native-fs.

// const moveAttachment = async (filePath, newFilepath) => {
//   return new Promise((resolve, reject) => {
//     RNFS.mkdir(dirPicutures)
//       .then(() => {
//         RNFS.moveFile(filePath, newFilepath)
//           .then(() => {
//             console.log('FILE MOVED', filePath, newFilepath);
//             resolve(true);
//           })
//           .catch(error => {
//             console.log('moveFile error', error);
//             reject(error);
//           });
//       }) 
//       .catch(err => {
//         console.log('mkdir error', err);
//         reject(err);
//       });
//   });
// };