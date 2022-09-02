//import liraries
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MAXWIDTH} from './baseStyle';

// create a component
let items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const NestedScrollView = ({data, type}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1}}>
        <ScrollView
          scrollEventThrottle={100}
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: MAXWIDTH}}>
          {data &&
            data.map((item, index) => {
              return (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 100,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 4,
                    marginBottom: 5,
                  }}>
                  {type === 'no' && (
                    <Text style={{textAlign: 'center'}}>{item}</Text>
                  )}
                  {type === 'image' && (
                    <Image
                      style={{width: 100, height: 100}}
                      resizeMode="cover"
                      source={{
                        uri: item,
                      }}
                    />
                  )}
                </View>
              );
            })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default NestedScrollView;
