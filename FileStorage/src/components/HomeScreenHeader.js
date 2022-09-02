import { View, Text } from 'react-native'
import React from 'react'

export default function HomeScreenHeader() {
  return (
    <View>
        <View>
             <Image source={require("../assest/Images/setting.png")} style={{width:20,height:20}}/>
        </View>
      <Text>File Manager</Text>
      <View style={{flexDirection:"row",marginHorizontal:20,borderRadius:15,borderWidth:1}}>
        <Image source={require("../assest/Images/search.png")} style={{width:10,height:10}}/>
        <Text>Seacrh files </Text>
      </View>
    </View>
  )
}