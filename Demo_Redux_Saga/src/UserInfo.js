import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {randomQuotes} from '../quotes';
import {useUsersData} from './customHook/useUsersData';
// import {useDispatch} from 'react-redux';

const UserInfo = () => {
  // const dispatch = useDispatch();
  // dispatch(getUsersFetch());
  // useEffect(() => {
  //   // getDeviceToken();
  //   callNotification();
  //   messaging().setBackgroundMessageHandler(async msg => {
  //     console.log('=============BackgroundNotification===========', msg);
  //     // const data =
  //     //   typeof msg?.data == 'object' && Object.keys(msg?.data).length > 0
  //     //     ? msg?.data
  //     //     : msg?.notification;
  //     // showNotification(data?.title, data?.body, data);
  //   });
  // });
  const [data] = useUsersData('https://jsonplaceholder.typicode.com/users');
  console.log('--', data);
  // console.log('users data--', users);
  // const users = useSelector(state =>
  //   state.FirstReducer.users.map(item => item),
  // );
  // console.log('users data--', users);
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  const handleNotification = (item, index) => {
    const randomNo = Math.floor(Math.random() * 10 + 0);
    // PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: 'test-channel',
      channelName: 'Test Channel',
      title: ' Your Name is ' + item?.name,
      message: 'You live in ' + item?.address?.city,
      bigText: randomQuotes[randomNo],
      color: 'red',
      id: index,
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(getUsersFetch());
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '600',
              color: '#52006A',
              paddingVertical: 10,
            }}>
            Show Users Data
          </Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // handleNotification(item, index);
                }}
                style={{
                  ...styles.card,
                  ...styles.shadowProp,
                  ...styles.elevation,
                  marginVertical: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    // height: 50,
                    paddingVertical: 5,
                    width: '100%',
                    // backgroundColor: 'gray',
                  }}>
                  User name : {item?.name}
                </Text>
                <Text
                  style={{
                    color: '#000',

                    // height: 50,
                    width: '100%',
                    // backgroundColor: 'gray',
                  }}>
                  Address : {item?.address?.city}
                </Text>
                <Text
                  style={{
                    // height: 50,
                    width: '100%',
                    color: '#000',
                    paddingVertical: 5,
                    // backgroundColor: 'gray',
                  }}>
                  Phone No : {item?.phone}
                  {item?.id}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* <Button
          onPress={() => {
            dispatch(getUsersFetch());
          }}
          title="Get Users"></Button>*/}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});

export default UserInfo;
