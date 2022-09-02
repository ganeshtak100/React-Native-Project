import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll';



//  CameraRoll.getPhotos({
//     first: 200,
//     assetType: 'Videos',
//   })
//   .then(r => {   
//     console.log("Videos data--==>>>>>>",r);
//   })
//   .catch((err) => {
//      //Error Loading Images
//   });
 export const getPhotoss = async () => {
  
  const [images,setImages]=useState([]);

    const photos = await CameraRoll.getPhotos({
      first: 200
    });
    photos.edges.map(item=>{console.log("iii",item.node.image,nodes.length)});

    setImages(photos.edges.map(edge => edge.node.image.uri))
   return images;
  }

 export const delteImage=(url)=>{}

 export const getVideo=async()=>{
  const [videos, setVideos] = useState([]);

    const video = await CameraRoll.getPhotos({
      first: 200,
      assetType: 'Videos',
      include:['fileSize','playableDuration']
    })
    video.edges.map(item=>{console.log("iii",item.node.image.uri)});
    setVideos(video.edges.map(edge => edge.node.image.uri))
    return videos;
  }
 export const delteVideo=(url)=>{}

  


