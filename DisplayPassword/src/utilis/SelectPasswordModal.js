//import liraries
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// create a component
const SelectPasswordModal = ({visible, onModalPress, seconText}) => {
  console.log('modal visible==', visible);
  const [modalVisible, setModalVisible] = useState(visible);
  console.log();
  return (
    // <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {
            onModalPress();
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            backgroundColor: 'gray',
          }}>
          {seconText == false ? (
            <>
              <Text style={{color: '#000'}}>Password</Text>
              <Text style={{color: '#000'}}>••••••••••••••</Text>
            </>
          ) : (
            <>
              <Text style={{color: '#000', fontSize: 18}}>
                Save Email and Password
              </Text>
              <Text style={{color: '#000'}}>Email : ************ </Text>
              <Text style={{color: '#000'}}>Password : ************ </Text>
            </>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
    // </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
    backgroundColor: 'gray',
  },
});

//make this component available to the app
export default SelectPasswordModal;
