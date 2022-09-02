import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppTextInput} from './components/AppTextInput';
import {checkEmail} from './components/checkEmail';
import {useUserLogin} from './customHook/useUserLogin';
let baseUrl = 'https://reqres.in/api/posts';

const Login = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // let emailRef = useRef(null);
  // let passwordRef = useRef(null);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [send, setSend] = useState(false);
  let [data1, setData] = useState();
  let [newEmail, setNewEmail] = useState('');
  let [newPassword, setNewPassword] = useState('');
  const getParams = () => {
    const obj = {};
    obj['email'] = email;
    obj['password'] = password;
    setData(obj);
    // return obj;
  };
  const checkValidation = () => {
    if (email == '') {
      showMessage('Enter Your Email', 'Email');
      return false;
    } else if (checkEmail(email) == false) {
      showMessage('Invalid Email Type', 'Email');
      return false;
    } else if (password == '') {
      showMessage('Enter password', 'Password');
      return false;
    }
    return true;
  };
  const showMessage = (msg, title) => {
    Alert.alert(title, msg, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const loginStatus = useUserLogin(baseUrl, data1);
  // console.log('login data===', loginStatus);

  const onLogin = async () => {
    const isDetailDone = checkValidation();
    if (isDetailDone) {
      const data = getParams();
      // console.log('data', data1);
      const res = await loginStatus;
      console.log('login data===', res);
      if (res && res?.email && res?.password) {
        setNewEmail(res?.email);
        setNewPassword(res?.password);
        // setModalVisible(true);
        // alert();
        navigation.navigate('Details');
      }
      // useUserLogin(baseUrl, data);
    }
  };
  console.log('first', newEmail, newPassword);
  // const joke = useJokeRandom('Ganesh', 'Suresh');
  // console.log(':curerent jokes===', joke);
  // const displayJokes = () => {
  //   // joke;
  // };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
              height: 120,
              // backgroundColor: '#1B73E7',
            }}>
            <Text style={{fontSize: 26}}>Login Here</Text>
          </View>

          <View
            style={{
              minHeight: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppTextInput
              // ref={emailRef}
              placeholder={'Enter Email'}
              value={email}
              onChangeText={email => {
                setEmail(email);
              }}
              keyboardType="email-address"
            />
            <AppTextInput
              // ref={passwordRef}
              placeholder={'Enter Password'}
              value={password}
              onChangeText={pass => {
                setPassword(pass);
              }}
              autoCapitalize={false}
              keyboardType="default"
              editable={true}
              secureTextEntry={true}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 500,
                height: 100,
              }}>
              <TouchableOpacity
                style={{
                  borderColor: '#000',
                  borderRadius: 7,
                  borderWidth: 1,
                  flexDirection: 'row',
                  width: 150,
                  height: 42,
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1B73E7',
                }}
                onPress={() => {
                  onLogin();
                }}>
                <Text style={{alignSelf: 'center'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
              height: 120,
              // backgroundColor: '#1B73E7',
            }}>
            <Text style={{fontSize: 26}}>Random Jokes</Text>
            <Text style={{fontSize: 26}}>{joke}</Text>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
      {modalVisible && (
        <Modal
          style={{
            backgroundColor: 'red',
            flex: 1,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Text>"User Email -" {newEmail}</Text>

            <Text>"User Password-"{newPassword}</Text>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 22,
    height: 200,
    width: 200,
  },
});
export default Login;
