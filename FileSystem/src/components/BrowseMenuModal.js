//import liraries
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// create a component
const BrowseMenuModal = ({gridData, ShowModal, colseModal}) => {
  // console.log('first,', gridData);
  const toplistOnPress = item => {
    colseModal();
  };
  return (
    <View style={styles.container}>
      <Modal
        style={{
          width: 240,
          height: 300,
        }}
        animationType="fade"
        transparent={true}
        visible={ShowModal}
        onDismiss={() => {
          colseModal();
        }}
        onRequestClose={() => {
          colseModal();
        }}>
        <Pressable
          style={{flex: 1}}
          onPress={event => {
            if (event.target == event.currentTarget) {
              colseModal();
            }
          }}>
          <>
            <View
              style={{
                width: 250,
                height: 180,
                backgroundColor: '#fff',
                position: 'absolute',
                right: 10,
                top: 40,
                borderRadius: 10,
              }}>
              {gridData.map((item, index) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        toplistOnPress(item);
                      }}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingLeft: 20,
                        paddingTop: 10,
                        marginVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#000',
                          flex: 1,
                          marginLeft: 15,
                        }}>
                        {item?.name}
                      </Text>
                      {item?.icon && (
                        <Image
                          style={{width: 18, height: 18, marginRight: 20}}
                          source={item.icon}
                        />
                      )}
                    </TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 0.4,
                        opacity: 0.4,
                        borderBottomColor: 'gray',
                      }}
                    />
                  </>
                );
              })}
            </View>
          </>
        </Pressable>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BrowseMenuModal;
