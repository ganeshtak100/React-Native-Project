import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OnMyPhoneHeader({
  headerName,
  iconOnPress,
  leftIconOnPress,
}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          // flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 10}}
          onPress={() => {
            leftIconOnPress();
          }}>
          <View>
            <Image
              style={{
                height: 16,
                width: 16,
                transform: [{rotate: '180deg'}],
                marginTop: 6,
              }}
              source={require('../assests/right-arrow.png')}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: '#0074CD',
              marginLeft: 5,
            }}>
            {'Browse'}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 10,
            // marginHorizontal: 10,
          }}>
          {headerName ? headerName : 'On My iPhone'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            iconOnPress();
          }}>
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
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 8,
          flexDirection: 'row',
          marginTop: 10,
          // flex: 1,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          // borderColor: '#000',
          borderWidth: 0.5,
          marginHorizontal: 10,
          backgroundColor: '#F0F3F6',
        }}>
        <Image
          source={require('../assests/search.png')}
          style={{height: 18, width: 18, marginLeft: 10, top: 10}}
        />
        <TextInput
          style={{
            paddingLeft: 8,
            marginTop: 3,
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
