//import liraries
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

// create a component
const ViewPhoto = ({route}) => {
  const routeData = route.params?.imageUrl;
  console.log('image urls==', routeData?.imageUrl);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${routeData}`}}
        style={{width: '100%', height: '90%'}}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#red',
  },
});

//make this component available to the app
export default ViewPhoto;
