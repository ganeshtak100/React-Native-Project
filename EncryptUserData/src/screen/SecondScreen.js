// In App.js in a new project
import * as Keychain from 'react-native-keychain';

import * as React from 'react';
import { View, Text } from 'react-native';

function SecondScreen() {
    const [userDetail,setUserDetail]=React.useState('');

        React.useEffect(()=>async function(){

        const credentials = await Keychain.getGenericPassword();
        console.log("user credentails==",credentials);
        if(credentials){
        setUserDetail(credentials);
        }

    },[])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{
          color: "#000",
          marginBottom: 20,
          fontSize: 30,
      }}>{userDetail?.username}</Text>
    </View>
  );
}
export default SecondScreen;