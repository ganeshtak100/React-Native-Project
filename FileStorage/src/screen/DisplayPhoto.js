import { View, Text,Image, Dimensions } from 'react-native'
import React from 'react'
const {WIDTH,HEIGHT}=Dimensions.get("screen");

export default function DisplayPhoto({route}) {
    const imageLink=route.params?.photoUrl;
    console.log("roytes data",imageLink);
  return (
    <View style={{flex:1}}>
        <Image style={{width:"100%",height:"100%"}} source={{uri:`${imageLink}`}}/>
    </View>
  )
}