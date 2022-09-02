//import liraries
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListFilter from '../components/ListFilter';
import {gridData} from '../constants/data';

// create a component
const Recents = () => {
  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {};
  const CloseModal = () => {
    // alert();
    setShowModal(!showModal);
  };
  const IconOnPress = () => {
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
          }}>
          <Header headerName={'Recents'} iconOnPress={IconOnPress} />
        </View>
      </ScrollView>
      <View style={{flex: 1}}>
        <ListFilter
          showHeadData={false}
          gridData={gridData}
          ShowModal={showModal}
          colseModal={() => {
            CloseModal();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Recents;
