import { View, Text,Image ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { customBottomBar } from './data'

export default function CustomBottomBar({deleteItem}) {
  return (
    <View style={styles.container}>

        {
            customBottomBar.map((item,index)=>{
                return(
                    <TouchableOpacity onPress={deleteItem} style={{justifyContent:"center",alignItems:"center"}} key={index}>
                        <Image style={{width:20,height:20}} source={item?.icon}/>
                        <Text style={{textAlign:"center",fontSize:10,opacity:.6,marginTop:3}}>{item?.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
      
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        height:60,
        flexDirection:"row",
        justifyContent:"space-around",
        position:"absolute",
        bottom:1,
        width:"100%",
        flex:1,
        shadowColor: "#000",
        shadowOffset: {
	width: 0,
	height: 10,
            },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    }
})