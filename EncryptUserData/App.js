// App.js
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { Base64 } from 'js-base64';
// import AsyncStorage from "@react-native-community/async-storage";
import { Encrypt } from "./src/utilis/aes";
import * as Keychain from 'react-native-keychain';
var CryptoJS = require("crypto-js");
export default function HomeScreen({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username,setUserName]=useState('');
  const [userDetails, setUserDetails] = useState({});
  const [passwordHolder,setPasswordHolder]=useState('');

//   const encryptPass = () => {
//     if(!email){
//       alert("please enter email in  field")
//     return;
//     }
//     if(!passwordHolder){
//       alert("please enter  password field")
//     return;
//     }
//   else{


// // Encrypt
// // let ciphertext = CryptoJS.AES.encrypt("hello", 'secret key 123').toString();
// // console.log("encrypted cipertext password--",ciphertext);

// // Decrypt
// // let bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret-key-123');
// // let originalText = bytes.toString(CryptoJS.enc.Utf8);

// // console.log("orignial password==",originalText); // 'my message'

//   let encode = Base64.encode(passwordHolder);
//   let enPass=Encrypt(passwordHolder);
//   console.log("encrypted password--",encode,enPass);
//   const jsonValue = JSON.stringify(encode)
//   console.log("json value-",jsonValue)
//   AsyncStorage.setItem("password",jsonValue);
//   setUserDetails(email);
//   setIsLoggedIn(true);
//   // const fetchPassword=AsyncStorage.getItem("Password");
//   // console.log("getitem vbaiule=",fetchPassword)
//   // let parseValue=JSON.parse(fetchPassword);
//   // console.log("fetchpassword details==",parseValue);
//     }
// }

// useEffect(()=>{
//   (async()=>{
//     try {
//       const fetchPassword=AsyncStorage.getItem("password");
//       let a=JSON.parse(fetchPassword);
//       console.log("fetchpassword details==",fetchPassword,a);
//       if(fetchPassword !==null){
//         const decod=Base64.decode(fetchPassword);
//         console.log("after decodeing data is==",decod);
//         // setIsLoggedIn(true);
//       setUserDetails(fetchPassword);

//       }
//       else{
//       setIsLoggedIn(false);
//       }
//     } catch (error) {
//       console.log("error---",error);
//     }

//   })();
// },[])
  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        console.log("user credentails==",credentials);
        if (credentials) {
          setIsLoggedIn(true);
          setUserDetails(credentials);
        } else {
          console.log("No credentials stored");
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);
  const handleLogin = async () => {
    setIsLoggedIn(true)
    // login api call here
    const secretKey =
      "jsbdiudhsjksj";
    await Keychain.setGenericPassword(username, secretKey);
    setUserDetails({username,passwordHolder});
    setIsLoggedIn(true);
  };
  const handleLogout = async()=>{
    // setIsLoggedIn(false);
    const logout = await Keychain.resetGenericPassword();
    console.log("logout data--",{logout});
    if(logout){
      setIsLoggedIn(false);
      setUserDetails({});
    }
  }
  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <View>
          <Text style={styles.helloText}>Hello There!</Text>
          <TextInput onChangeText={(usernanme)=>{setUserName(usernanme)}} placeholder="Username" style={styles.textInput} />
          <TextInput
            placeholder="password"
            secureTextEntry
            style={styles.textInput}
            onChangeText={(pass)=>{setPasswordHolder(pass)}}
          />
          <Text style={styles.loginBtn} onPress={handleLogin}>
            Login
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>
            Welcome Hero! {userDetails?.username ?userDetails?.username :"Boss"}
          </Text>
          <Text style={styles.logoutBtn} onPress={handleLogout} >Logout</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("SecondScreen")}} style={{
            marginTop:20
          }}><Text style={{...styles.loginBtn}}>Press Me</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    paddingTop: 250,
  },
  helloText: {
    color: "white",
    marginBottom: 20,
    fontSize: 30,
  },
  textInput: {
    padding: 5,
    paddingStart: 15,
    backgroundColor: "#3b3b3b",
    width: screenWidth * 0.8,
    borderRadius: 25,
    marginBottom: 15,
    color: "white",
    fontWeight: "600",
  },
  loginBtn: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: "red",
    borderRadius: 75,
    color: "white",
    textAlign: "center",
  },
  welcomeText: {
    color: "#000",
    marginBottom: 20,
    fontSize: 30,
  },
  logoutBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#000",
    borderRadius: 25,
    color: "white",
    textAlign: "center",
  },
});




// import React, { Component, useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


//  const App=()=>{
//   const [encryptPassword,setEncryptPassword]=useState('');
//   const [passwordHolder,setPasswordHolder]=useState('');

//   const encryptPass = () => {
  //for encryption
//   var encode = Base64.encode(passwordHolder);
//   console.log("encrypted password--",encode);
//   setEncryptPassword(encode);
// }


//   return (
//     <View style={styles.Container}>
//       <TextInput
//         placeholder="Enter Password Here"
//         onChangeText={data => {setPasswordHolder(data)}}
//         style={styles.textInputStyle}
//         underlineColorAndroid='transparent'
//       />
//       <TouchableOpacity style={styles.button} onPress={()=>{encryptPass()}} >
//         <Text style={styles.text}>Click to Encode Password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity  style={styles.button} onPress={()=>{}} >
//         <Text style={styles.text}>Click to Decode Password</Text>
//       </TouchableOpacity>
//       <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
//         {"HELLO"}
//       </Text> 
//     </View>
//   );
// }
// export default App;

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textInputStyle: {
//     textAlign: 'center',
//     height: 42,
//     width: '80%',
//     borderWidth: 1,
//     borderColor: '#9e9e9e',
//     borderRadius: 7,
//   },
//   button: {
//     width: '80%',
//     paddingTop: 2,
//     paddingBottom: 2,
//     backgroundColor: '#ec407a',
//     borderRadius: 3,
//     marginTop: 20
//   }, 
//   text: {
//     color: '#fff',
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 5
//   }
// });