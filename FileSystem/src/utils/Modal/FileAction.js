//import liraries
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// create a component
const FileActionModal = () => {
  return (
    <View style={styles.container}>
      <Text>FileActionModal</Text>
    </View>
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
});

//make this component available to the app
export default FileActionModal;
