//import liraries
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import BrowseItem from '../components/BrowseItem';
import BrowseMenuModal from '../components/BrowseMenuModal';
import Header from '../components/Header';
import {browseMenuName, data, TagsData} from '../constants/data';

// create a component
const Browse = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const ShowModal = () => {};
  const CloseModal = () => {
    // alert();
    setShowModal(!showModal);
  };
  const IconOnPress = () => {
    setShowModal(true);
  };
  const scrollEnable = val => {
    // setScrollEnabled(val);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} scrollEnabled={scrollEnabled}>
        <View
          style={{
            flex: 1,
          }}>
          <Header headerName={'Browse'} iconOnPress={IconOnPress} />
        </View>
        <View style={{flex: 1, marginVertical: 20}}>
          <BrowseItem headerName={'Locations'} item={data} />
        </View>
        <View style={{flex: 1, marginVertical: 20}}>
          <BrowseItem
            headerName={'Tags'}
            item={TagsData}
            // ScollEnable={scrollEnable}
          />
        </View>
        {
          <View style={{flex: 1}}>
            <BrowseMenuModal
              gridData={browseMenuName}
              ShowModal={showModal}
              colseModal={() => {
                CloseModal();
              }}
            />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#fff',
  },
});

//make this component available to the app
export default Browse;
