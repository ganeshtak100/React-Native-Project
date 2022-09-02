//import liraries
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// create a component
const ImageList = () => {
  return (
    <TouchableOpacity style={{width: '100%', height: 80}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{paddingHorizontal: 20}}>
          <Image
            style={{width: 54, height: 54}}
            source={require('../../assests/folder.png')}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginLeft: 1}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{paddingTop: 5, fontSize: 15, fontWeight: '700'}}>
              {"new image 1"}
            </Text>
            <Text style={{paddingTop: 8, fontSize: 12, opacity: 0.7}}>
              {item?.item?.createdOn + ' - ' + item?.item?.items + ' items'}
            </Text>
          </View>
        </View>
        <View style={{marginRight: 20, alignSelf: 'center'}}>
          <Image
            style={{width: 14, height: 16}}
            source={require('../../assests/next.png')}
          />
        </View>
      </View>
      <View
        style={{
          marginLeft: 93,
          height: 2,
          backgroundColor: '#CFCFD5',
          opacity: 0.5,
        }}
      />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default ImageList;
