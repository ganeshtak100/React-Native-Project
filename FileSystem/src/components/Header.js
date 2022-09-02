import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function Header({headerName, iconOnPress}) {
  let icon = useSelector(store => store?.ListReducer?.iconName);

  return (
    <View style={{flex: 1}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            iconOnPress();
          }}>
          {headerName == 'Browse' ? (
            <Image
              style={{
                height: 25,
                width: 25,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 10,
              }}
              source={require('../assests/more-information.png')}
            />
          ) : icon == 'Icons' ? (
            <Image
              style={{
                height: 25,
                width: 25,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 10,
              }}
              source={require('../assests/grid.png')}
            />
          ) : (
            <Image
              style={{
                height: 25,
                width: 25,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 10,
              }}
              source={require('../assests/listColor.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 29,
          fontWeight: 'bold',
          color: '#000',
          marginHorizontal: 10,
          marginLeft: 20,
        }}>
        {headerName}
      </Text>
      <View
        style={{
          marginVertical: 8,
          flexDirection: 'row',
          marginTop: 5,
          flex: 1,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          // borderColor: '#000',
          borderWidth: 0.5,
          // marginHorizontal: 10,
          backgroundColor: '#F0F3F6',
        }}>
        <Image
          source={require('../assests/search.png')}
          style={{height: 18, width: 18, marginLeft: 10, top: 10}}
        />
        <TextInput
          style={{
            paddingLeft: 13,
            height: 40,
            fontSize: 19,
            alignSelf: 'center',
            color: 'gray',
          }}
          placeholder="Search"
          onChangeText={text => {
            console.log(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
