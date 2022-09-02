import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomHeader({headerName,backOnPress,searchOnPress,showCrossBar,closeCrossBar}) {
  return (
    <View style={{display:"flex",marginHorizontal:5,marginLeft:11,flexDirection:"row",height:60,justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <TouchableOpacity onPress={ ()=>{
              if(showCrossBar){
              backOnPress(true);
            } else  backOnPress()}} 
            style=
            {{justifyContent:"center",alignItems:"center"}}>
              { showCrossBar ?
           <Image source={require("../assest/Images/close.png")} style={{width:25,height:25,alignSelf:"center"}}/>
:
           <Image source={require("../assest/Images/left-arrow.png")} style={{width:25,height:25,alignSelf:"center"}}/>
              }</TouchableOpacity>
         <Text style={{marginLeft:13,fontWeight:"bold",fontSize:20}}>{headerName ?headerName :"File Manager"}</Text>
        </View>
        <TouchableOpacity style={{marginRight:18,alignItems:"center",justifyContent:"center"}} onPress={searchOnPress && searchOnPress}>
           <Image source={require("../assest/Images/search.png")} style={{width:20,height:20}}/>
            </TouchableOpacity>

    </View>
  )
}