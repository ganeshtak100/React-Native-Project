import { Alert,View, Text, FlatList ,Image, TouchableOpacity, PermissionsAndroid} from 'react-native'
import React,{useEffect, useState} from 'react'
import CameraRoll from '@react-native-community/cameraroll';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomHeader from '../components/customHeader';
import CustomBottomBar from '../components/CustomBottomBar';

export default function ShowVideos({navigation}) {
  const [images,setImages]=useState(null);
  const [showCustomBottomBar,setShowCustomBottomBar]=useState(false);
  const [deleteIndex,setDeleteIndex]=useState();
  const [video,setVideo]=useState([]);

  console.log("Videos data==///",images)
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
        const video = await CameraRoll.getPhotos({
          first: 200,
          assetType: 'Videos',
          include:['fileSize','playableDuration']
        })
        video.edges.map(item=>{console.log("iii",item.node.image.uri)});
      setVideo(video.edges.map(edge => edge.node.image.uri))
      }
      fectchData();
    },
    []);

const renderVideos=(item,index)=>{
  console.log("render video item=",item?.item?.node?.image?.fileSize)
  const splitPath=item?.item?.node?.image?.uri.split("/");
  const fileName=splitPath[splitPath.length-1];
  const fileSize=item?.item?.node?.image?.fileSize

console.log("splitted path",splitPath);
    return ( <TouchableOpacity key={index} onPress={()=>{ 
      // alert();
      navigation.navigate("DisplayVideo",{videoUrl:item?.item})
      }} style={{backgroundColor:"#fff"}}>
            <Image source={{uri:item?.item?.node?.image?.uri && item?.item?.node?.image?.uri }}
             style={{width:90,height:90,backgroundColor:"#fff",margin:2}}/>
            </TouchableOpacity>
)}

const videoLongPress=(item,index)=>{
  setDeleteIndex(index);
  setShowCustomBottomBar(true);

}
const renderVideoss=(item,index)=>{
  console.log("first,item",item)
  const splitPath=item?.item.split("/");
  const videoName=splitPath[splitPath.length-1];
  const fileSize=item?.item?.node?.image?.fileSize;
  return( <TouchableOpacity 
    onLongPress={()=>{videoLongPress(item,index)}}
    key={index} onPress={()=>{ 
      // alert();
      navigation.navigate("DisplayVideo",{videoUrl:item})
      }} style={{flexDirection:"row",marginHorizontal:10,backgroundColor:"#fff"}}>
      <View style={{backgroundColor:"#fff",width:50,height:50,justifyContent:"center"}}>
      <Image source={{uri:item?.item && item?.item }}
      style={{width:30,height:"100%",alignSelf:"center",backgroundColor:"#fff"}}/>
      </View>
      <View style={{marginLeft:15}}>
        <Text style={{fontSize:14 }}numberOfLines={1} >{videoName}</Text>
        <Text style={{fontSize:10,opacity:.5,marginTop:6}}>{"Size " + 24.4 + " MB"}</Text>
        <View style={{width:"80%",borderWidth:.4,marginTop:20,borderColor:"#000",opacity:.5}}></View>
      </View>
    </TouchableOpacity>
  )
}
const openCamera=async()=>{
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    // console.log("firstre",readGranted,writeGranted)
    if(readGranted || writeGranted ) {
    ImageCropPicker.openCamera({
        mediaType:"video",
        cropping:false,
    }).then((img)=>{
        console.log("captured image--",img)
        const splitPath=img?.path.split("/");
        const fileName=splitPath[splitPath.length-1];
        console.log("images array data--",fileName);
        setVideo([img?.path,...video]);
        // CameraRoll.save(img?.path, {type:'photo',album:'MyPhoto'});
        // loadGalleryImage();
    }).catch(e=>{console.log("eror",e)});
}
}
const loadGalleryImage=()=>{
    CameraRoll.getPhotos({
        first: 200,
        assetType: 'Videos',
      })
      .then(r => {
        console.log("images data--",r.edges)
      })
      .catch((err) => {
         //Error Loading Images
      });
    
}

const deleteItem=()=>{
 
  Alert.alert(  
    'Delete Item',  
    'This item will be Deleted',  
    [  
        {  
            text: 'Cancel',  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
        },  
        {text: 'OK', onPress: () => {
           video.splice(deleteIndex,1);
           setShowCustomBottomBar(false);
          }}  
    ]  
);  
}  

  return (
    <View style={{flex:1}}>

       {
      <CustomHeader headerName={"Video"} showCrossBar={showCustomBottomBar} closeCrossBar={()=>{}}
       backOnPress={(val)=>{
        
        if(val && val != undefined){
          setShowCustomBottomBar(false)
        }
        else
        navigation.goBack()}}
        />
      }

      <FlatList
      data={video}
      renderItem={renderVideoss}
      keyExtractor={(item,index)=>toString(index)}
      />
      <TouchableOpacity onPress={openCamera} style={{position:"absolute",right:40,bottom:120,width:70,height:70,borderRadius:50,alignItems:"center",justifyContent:"center",borderWidth:.5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 15.0,
    
    }}>
        <Image style={{width:26,height:28,alignSelf:"center"}} source={require('../assest/Images/camera.png')}/>
      </TouchableOpacity>
      {
          showCustomBottomBar ? (
            <CustomBottomBar deleteItem={deleteItem}/>
          )
          :null
        }
    </View>
  )
}