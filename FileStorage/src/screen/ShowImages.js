import {View, Text, FlatList ,Image, TouchableOpacity, PermissionsAndroid,Button,ScrollView,SafeAreaView, Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import CameraRoll from '@react-native-community/cameraroll';
import ImageCropPicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper'
import CustomHeader from '../components/customHeader';
import CustomBottomBar from '../components/CustomBottomBar';
import CameraRollData, { getPhotoss } from '../utilis/CameraRoll';


const ShowImages = ({navigation}) => {

  const [nodes, setNodes] = useState([]);
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [images,setImages]=useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCustomBottomBar,setShowCustomBottomBar]=useState(false);
  const [deleteIndex,setDeleteIndex]=useState();


  useEffect(() => {
    checkPermission()
      .then(() => {
        getPhotos()
        // setNodes(getPhotoss());
      })
  }, [])

  const checkPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    if (hasPermission && writeGranted) {
      return true;
    }

    const status =   await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,

    ]);

    return status === 'granted';
  }

  const getPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 200
    });
    photos.edges.map(item=>{console.log("iii",item.node.image,nodes.length)});

   setNodes(photos.edges.map(edge => edge.node.image.uri))
    console.log("ph")
  }
  // console.log("nodes--",nodes);

 const openCamera=async()=>{
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    // console.log("firstre",readGranted,writeGranted)
    if(readGranted || writeGranted ) {
    ImageCropPicker.openCamera({
        cropping:false,
    }).then((img)=>{
        // console.log("captured image--",img?.path)
        const splitPath=img?.path.split("/");
        const fileName=splitPath[splitPath.length-1];
        // console.log("images array data--",fileName);
        setNodes([img?.path,...nodes]);
        // CameraRoll.save(img?.path, {type:'photo',album:'MyPhoto'});
        // loadGalleryImage();
        // getPhotos();
    }).catch(e=>{console.log("eror",e)});
}
}
const loadGalleryImage=()=>{
    CameraRoll.getPhotos({
        first: 200,
        assetType: 'Photos',
      })
      .then(r => {
        // setImages([r.edges,...images]);
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
          console.log("deee==",deleteIndex);
           nodes.splice(deleteIndex.index,1);
          //  CameraRoll.deletePhotos([deleteIndex.url]);
           setShowCustomBottomBar(false);
          }}  
    ]  
);  
}  

const imageLongPress=(item,index)=>{
  setDeleteIndex({index:index,url:item});
  // console.log("first,",nodes.length);

//  nodes.forEach((item,ind)=>{
//     console.log("first,",ind,index);
//     ind!=index
//   })
  console.log("first,",nodes.length);
  

  // console.log("nodes data--",nodes);
  // nodes.filter((item,inde)=>{
  //   inde==index;
  // })
  // console.log("item of image",item,index,nodes.indexOf(item));
  console.log("first,",nodes.length);


  setShowCustomBottomBar(true)
  // nodes.filter(item)

}
  return (
    <SafeAreaView style={{flex:1}}>
      {
        detailViewVisible==true ? null:
      <CustomHeader headerName={"Camera"} showCrossBar={showCustomBottomBar} closeCrossBar={()=>{}}
       backOnPress={(val)=>{
        
        if(val && val != undefined){
          setShowCustomBottomBar(false)
        }
        else
        navigation.goBack()}}
        />
      }
     <ScrollView style={{flex:1}}>
      {
          detailViewVisible
          ?
           (
            <>
            <Swiper
            dot={ 
              <View style={{backgroundColor:"#333", width: 0, height: 0,borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
            }
            activeDot={ 
              <View style={{backgroundColor:"#333", width: 0, height: 0,borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
            }
              loop={false}
              index={selectedIndex}
            >
              { 
              nodes.map((node,index)=>(
    
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          flex: 1,
                        }}
                        resizeMode="contain"
                        source={{
                          uri:node && node 
                        }}
                      />
                     
                      </View> 
              ))
      }
                      </Swiper> 
                      <TouchableOpacity onPress={()=>{setDetailViewVisibility(false)}} style={{position:"absolute",top:20,left:20}}>
                        <Image style={{height:20,width:20}} source={require('../assest/Images/close.png')}/>
                      </TouchableOpacity>
            </>
                      
                      )
                      :
                      (
              <View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                { nodes.map((item,index)=>(
                <TouchableOpacity key={index}
                onLongPress={()=>{imageLongPress(item,index)}}
                onPress={()=>{ 
                  setDetailViewVisibility(true);
                  setSelectedIndex(index);
                  // navigation.navigate("DisplayPhoto",{photoUrl:item?.item?.node?.image?.uri})
                  }} style={{backgroundColor:"#fff"}}>
                    
                    <Image source={{uri:item && item }}
                    style={{width:90,height:90,backgroundColor:"#000",margin:2}}/>
                    </TouchableOpacity>
            ))
          }
          <View style={{height:50,flex:1}}></View>
                      </View>
        )
      }

    </ScrollView>
      <TouchableOpacity onPress={()=>{openCamera()}} style={{position:"absolute",right:40,bottom:120,width:70,height:70,borderRadius:50,alignItems:"center",justifyContent:"center",borderWidth:.5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 15.0,
        backgroundColor:"#222"
        
        }}>
        <Image style={{width:26,height:28,alignSelf:"center"}} source={require('../assest/Images/camera.png')}/>
      </TouchableOpacity>
        {
          showCustomBottomBar ? (
            <CustomBottomBar deleteItem={deleteItem}/>
          )
          :null
        }
   
    </SafeAreaView>
  )}


export default ShowImages;

// export default function ShowImages({navigation}) {
//   const [images,setImages]=useState([]);
//   const [detailViewVisible, setDetailViewVisibility] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//     useEffect(()=>{
//         async function fectchData(){
//           try {
//              await PermissionsAndroid.requestMultiple([
//               PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//               PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//               PermissionsAndroid.PERMISSIONS.CAMERA,

//             ]);
//           } catch (err) {
//             console.warn(err);
//           }
//         const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
//         const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//         if(!readGranted || !writeGranted ) {
//           console.log('Read and write permissions have not been granted');
//           return;
//         }
      
//         CameraRoll.getPhotos({
//           first: 200,
//           assetType: 'Photos',
//         })
//         .then(r => {   
//           setImages(r.edges);
//           // console.log("images data--",photos);
//         })
//         .catch((err) => {
//           console.log("ERROR LOADING IMAGES",err)
//           //  Error Loading Images
//         });
//       }
//       fectchData();
//     },
//     [])
// const renderImage=(item,index)=>{
//   console.log("images data=>".item)
//     return ( <TouchableOpacity  key={index} onPress={()=>{navigation.navigate("DisplayPhoto",{photoUrl:item?.item?.node?.image?.uri})}} style={{backgroundColor:"#fff"}}>
//             <Image source={{uri:item?.item?.node?.image?.uri && item?.item?.node?.image?.uri }}
//              style={{width:90,height:90,backgroundColor:"#fff",margin:2}}/>
//             </TouchableOpacity>
// )}

// const openCamera=async()=>{
//     const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
//     const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//     // console.log("firstre",readGranted,writeGranted)
//     if(readGranted || writeGranted ) {
//     ImageCropPicker.openCamera({
//         cropping:false,
//     }).then((img)=>{
//         console.log("captured image--",img?.path)
//         const splitPath=img?.path.split("/");
//         const fileName=splitPath[splitPath.length-1];
//         console.log("images array data--",fileName);

//         CameraRoll.save(img?.path, {type:'photo',album:'MyPhoto'});
//         loadGalleryImage();
//     }).catch(e=>{console.log("eror",e)});
// }
// }
// const loadGalleryImage=()=>{
//     CameraRoll.getPhotos({
//         first: 200,
//         assetType: 'Photos',
//       })
//       .then(r => {
//         setImages([r.edges,...images]);
//         console.log("images data--",r.edges)
//       })
//       .catch((err) => {
//          //Error Loading Images
//       });
    
// }
// console.log("images==",images);
//   return (
//     <View style={{flex:1}}>
//       <FlatList
//     //   data={["1","2","3","4","5","6"]} 
//       data={images}
//       numColumns={4}
//       renderItem={renderImage}
//       keyExtractor={(data,item)=>toString(item)}
      
//       />
//       <TouchableOpacity onPress={openCamera} style={{position:"absolute",right:40,bottom:120,width:70,height:70,borderRadius:50,alignItems:"center",justifyContent:"center",borderWidth:.5,
//         shadowColor: "#000",
//         shadowOffset: {
//         width: 0,
//         height: 12,
//         },
//         shadowOpacity: 0.58,
//         shadowRadius: 15.0,
        
//         }}>
//         <Image style={{width:26,height:28,alignSelf:"center"}} source={require('../assest/Images/camera.png')}/>
//       </TouchableOpacity>
//     </View>
//   )
// }
///////////////////////////
     {/* <FlatList
    //   data={["1","2","3","4","5","6"]} 
      data={nodes}
      numColumns={4}
      renderItem={renderImage}
      keyExtractor={(data,item)=>toString(item)}
      
      /> */}