import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import Browse from '../screens/Browse';
import OnMyPhone from '../screens/OnMyPhone/OnMyPhone';
import ViewPhoto from '../screens/Photo/ViewPhoto';
import Recents from '../screens/Recents';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Recents') {
              color = focused ? 'blue' : 'gray';
              iconName = focused
                ? require('../assests/clockInColor.png')
                : require('../assests/clock.png');
            } else if (route.name === 'Browse') {
              color = focused ? 'blue' : 'gray';

              iconName = focused
                ? require('../assests/folderBlueColor.png')
                : require('../assests/folder.png');
            }

            // You can return any component that you like here!
            return (
              <Image
                style={{width: 20, height: 20, color: color}}
                source={iconName}
              />
            );
          },
          // tabBarActiveTintColor: 'blue',
          // tabBarInactiveTintColor: 'blue',
        })}>
        <Tab.Screen
          options={{headerShown: false}}
          name="Recents"
          component={Recents}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Browse"
          component={BrowseStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const BrowseStack = () => {
  return (
    <Stack.Navigator initialRoutName="BrowseScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="BrowseScreen"
        component={Browse}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OnMyPhone"
        component={OnMyPhone}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ViewPhoto"
        component={ViewPhoto}
      />
    </Stack.Navigator>
  );
};
