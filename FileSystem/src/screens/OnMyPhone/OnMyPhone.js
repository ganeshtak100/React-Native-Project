//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ListFilter from '../../components/ListFilter';
import OnMyPhoneHeader from '../../components/OnMyPhoneHeader';
import {gridData} from '../../constants/data';
import FolderList from './FolderList';

// create a component
const OnMyPhone = ({route}) => {
  let gloabalView = useSelector(state => state?.ListReducer?.iconName);
  console.log('state response=', gloabalView);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {};
  const CloseModal = () => {
    // alert();
    setShowModal(!showModal);
  };
  const IconOnPress = () => {
    setShowModal(true);
  };
  // console.log('routes data==>>>>', route.params.data.item.folderName);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
          }}>
          <OnMyPhoneHeader
            headerName={route?.params?.data?.item?.folderName}
            iconOnPress={IconOnPress}
            leftIconOnPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{marginTop: 20, flex: 1}}>
          <FolderList gridView={gloabalView} routeData={route?.params} />
        </View>
        <View style={{flex: 1}}>
          <ListFilter
            showHeadData={true}
            gridData={gridData}
            ShowModal={showModal}
            colseModal={() => {
              CloseModal();
            }}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              position: 'absolute',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 6,
              bottom: 0,
            }}>
            {route?.params?.data?.item?.data?.length
              ? route?.params?.data?.item?.data?.length +
                ' items, Zero KB available'
              : 6 + ' items, Zero KB available'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});

//make this component available to the app
export default OnMyPhone;
