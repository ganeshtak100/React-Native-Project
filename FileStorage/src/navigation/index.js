import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import ShowImages from '../screen/ShowImages';
import DisplayPhoto from '../screen/DisplayPhoto';
import ShowVideos from '../screen/ShowVideos';
import DisplayVideo from '../screen/DisplayVideo';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Image" component={ShowImages} />
        <Stack.Screen options={{headerShown:false}} name="ShowVideos" component={ShowVideos} />
        <Stack.Screen options={{headerShown:false}} name="DisplayPhoto" component={DisplayPhoto} />
        <Stack.Screen options={{headerShown:false}} name="DisplayVideo" component={DisplayVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;