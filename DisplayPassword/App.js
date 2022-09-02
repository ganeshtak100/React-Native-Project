// App.js
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import SelectPasswordModal from './src/utilis/SelectPasswordModal';
export default function HomeScreen({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [passwordHolder, setPasswordHolder] = useState('');
  const [suggestPassword, setSuggestPassword] = useState();
  const [visibleModal, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        console.log('user credentails==>>>>', credentials);
        if (credentials) {
          // setIsLoggedIn(true);
          setUserDetails(credentials);
          setPasswordHolder(credentials.password);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  const checkDetails = () => {
    if (username == '') {
      alert('Enter Username');
      return false;
    } else if (passwordHolder == '') {
      alert('Password can not be empty');
      return false;
    } else if (passwordHolder.length < 6) {
      alert('Password must be greater than six char');
      return false;
    } else return true;
  };
  const login = () => {
    console.log('lofin value', username, passwordHolder, userDetails);
    if (checkDetails()) {
      if (
        username === userDetails?.username &&
        passwordHolder === userDetails?.password
      ) {
        console.log('=====', userDetails);
        alert('Login Success');
      } else {
        alert('Enter correct details.');
      }
    }
  };
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(true);
  }, []);

  // fetchKeyChainData();
  // const handleLogin = async () => {
  //   setIsLoggedIn(true);
  //   // login api call here
  //   const secretKey = 'jsbdiudhsjksj';
  //   await Keychain.setGenericPassword(username, secretKey);
  //   setUserDetails({username, passwordHolder});
  //   setIsLoggedIn(true);
  // };
  // const handleLogout = async () => {
  //   // setIsLoggedIn(false);
  //   const logout = await Keychain.resetGenericPassword();
  //   console.log('logout data--', {logout});
  //   if (logout) {
  //     setIsLoggedIn(false);
  //     setUserDetails({});
  //   }
  // };
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          {shown && !isLoggedIn ? (
            <View>
              <Text style={styles.helloText}>Login Here!</Text>
              <TextInput
                onChangeText={usernanme => {
                  setUserName(usernanme);
                  if (usernanme == userDetails?.username) {
                    setModalVisible(true);
                    // setSuggestPassword(true);
                  }
                }}
                textContentType={'username'}
                // textContentType={'emailAddress'}
                value={username}
                autoCompleteType="email"
                autoComplete={'email'}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder="Enter Email"
                importantForAutofill={'yes'}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Enter Password"
                textContentType={'password' || 'newPassword'}
                autoComplete={'password'}
                autoCompleteType="password"
                value={suggestPassword == true ? passwordHolder : ''}
                autoCorrect={false}
                autoCapitalize={'none'}
                importantForAutofill={'yes'}
                secureTextEntry
                style={styles.textInput}
                onChangeText={pass => {
                  setPasswordHolder(pass);
                }}
              />
              <Text
                style={styles.loginBtn}
                onPress={() => {
                  login();
                }}>
                Login
              </Text>
              <Text
                style={{...styles.loginBtn, marginTop: 20}}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Sign Up Here!
              </Text>
              <SelectPasswordModal
                seconText={false}
                visible={visibleModal}
                onModalPress={() => {
                  setSuggestPassword(true);
                  setModalVisible(false);
                }}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.welcomeText}>
                Welcome Hero!{' '}
                {userDetails?.username ? userDetails?.username : 'Boss'}
              </Text>
              <Text style={styles.logoutBtn} onPress={() => {}}>
                Logout
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SecondScreen');
                }}
                style={{
                  marginTop: 20,
                }}>
                <Text style={{...styles.loginBtn}}>Press Me</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 250,
  },
  helloText: {
    color: '#000',
    marginBottom: 20,
    fontSize: 30,
  },
  textInput: {
    padding: 5,
    paddingStart: 15,
    backgroundColor: '#fff',
    borderColor: 'black',
    width: screenWidth * 0.8,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 15,
    height: 50,
    color: '#000',
    fontWeight: '600',
  },
  loginBtn: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: 'red',
    borderRadius: 75,
    color: 'white',
    textAlign: 'center',
    // borderRadius: 20,
  },
  welcomeText: {
    color: '#111',
    marginBottom: 20,
    fontSize: 30,
  },
  logoutBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 25,
    color: 'white',
    textAlign: 'center',
  },
});
