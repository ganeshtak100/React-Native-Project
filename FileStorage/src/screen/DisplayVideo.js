import { View, Text,Image, Dimensions,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video';
const {WIDTH,HEIGHT}=Dimensions.get("screen");

export default function DisplayVideo({route,navigation}) {
  const [paused,setPaused]=useState(false);
    const VideoRef=useRef();
    const videoLink=route.params?.videoUrl?.item;
    console.log("video data  data",videoLink);
    const onBuffer=()=>{
      console.log("video buffering")
    }
    const videoError=()=>{
      console.log("error in video")
    }
    const onProgress=()=>{
      console.log("video is onProgress")
    }
  return (
    <View style={{flex:1,width:"100%"}}>
    <TouchableOpacity style={{flex:1}} onPress={()=>{setPaused(!paused)}}>
        <Video
        resizeMode='contain'
        source={{uri: videoLink}}  
        ref={VideoRef}
        paused={paused}
        muted={false}
       //onProgress={onProgress}
        onBuffer={onBuffer}                // Callback when remote video is buffering
        onError={videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo} />

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{position:"absolute",top:20,left:20}}>
                        <Image style={{height:20,width:20}} source={require('../assest/Images/close.png')}/>
                      </TouchableOpacity>
    </View>
  )
}
let styles = StyleSheet.create({
    backgroundVideo: {
      flex:1,
      width:"100%",
      height:"100%"
    },
  });