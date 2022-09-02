import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';
import SelectPasswordModal from '../utilis/SelectPasswordModal';

export default function SignUp({navigation}) {
  const bundledId = 4567897890;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [passwordHolder, setPasswordHolder] = useState('');
  const [visibleModal, setModalVisible] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const credentials = await Keychain.getGenericPassword();
  //       console.log('user credentails==', credentials);
  //       if (credentials) {
  //         setIsLoggedIn(true);
  //         setUserDetails(credentials);
  //       } else {
  //         console.log('No credentials stored');
  //       }
  //     } catch (error) {
  //       console.log("Keychain couldn't be accessed!", error);
  //     }
  //   })();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Your code here
      setEmail('');
      setUserName('');
      setPasswordHolder('');
    }, []),
  );
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(true);
  }, []);

  const checkDetails = () => {
    if (username == '') {
      alert('Enter Username');
      return false;
    } else if (email == '') {
      alert('Enter Email address');
      return false;
    } else if (passwordHolder == '') {
      alert('Password can not be empty');
      return false;
    } else if (passwordHolder.length < 6) {
      alert('Password must be greater than six char');
      return false;
    } else return true;
  };
  let webCredentials = 'www.google.com';
  const handleSignUp = async () => {
    if (checkDetails()) {
      const data = {
        email: email,
        password: passwordHolder,
      };
      // login api call here
      const secretKey = 'jsbdiudhsjksj';
      if (Platform.OS == 'ios') {
        const result = await Keychain.hasInternetCredentials(
          bundledId || webCredentials,
        );
        !result &&
          (await Keychain.setSharedWebCredentials(
            bundledId || webCredentials,
            email,
            passwordHolder,
          ));
        console.log('keychain saved success for ios');
      } else if (Platform.OS == 'android') {
        await Keychain.setGenericPassword(email, passwordHolder);
        console.log('keychain saved success for android');
      }

      setUserDetails({username, passwordHolder});
      navigation.navigate('Home');
      // setIsLoggedIn(true);
    }
  };
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop: 250,
          }}>
          <Text style={styles.helloText}>Sign Up Here!</Text>
          {shown ? (
            <>
              <TextInput
                onChangeText={usernanme => {
                  setUserName(usernanme);
                }}
                returnKeyType="next"
                value={username}
                textContentType={'username'}
                autoComplete={'username'}
                importantForAutofill={'yes'}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder="Full Name"
                style={styles.textInput}
              />
              <TextInput
                onChangeText={email => {
                  setEmail(email);
                }}
                value={email}
                textContentType="emailAddress"
                importantForAutofill={'yes'}
                autoComplete={'username'}
                autoCompleteType="email"
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder="Email Address"
                style={styles.textInput}
              />
              <TextInput
                placeholder="Choose Password"
                textContentType="password"
                autoComplete={'password'}
                autoCompleteType="password"
                importantForAutofill={'yes'}
                autoCorrect={false}
                autoCapitalize={'none'}
                secureTextEntry
                value={passwordHolder}
                style={styles.textInput}
                onChangeText={pass => {
                  setPasswordHolder(pass);
                }}
              />
            </>
          ) : null}
          <Text
            style={{...styles.loginBtn, width: 300}}
            onPress={() => {
              handleSignUp();
            }}>
            Sign Up
          </Text>
          <Text
            style={{...styles.loginBtn, width: 300, marginTop: 20}}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            Login Here !
          </Text>
          <SelectPasswordModal
            seconText={true}
            visible={visibleModal}
            onModalPress={() => {
              setModalVisible(false);
            }}
          />
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
