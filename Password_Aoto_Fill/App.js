//import liraries
import React, {useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const CounterEvents = new NativeEventEmitter(NativeModules.Counter);
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomainName] = useState('');
  const [countVal, setCountValue] = useState(0);

  // useEffect(() => {
  //   CounterEvents.addListener('onIncrement', result => {
  //     setCountValue(...result);
  //     console.log('onIncrement received', result);
  //   });
  //   CounterEvents.addListener('onDecrement', result => {
  //     setCountValue(...result);
  //     console.log('onDecrement received', result);
  //   });
  //   CounterEvents.addListener('saveData', result => {
  //     console.log('onDecrement received', result);
  //   });
  //
  //   return () => {
  //     CounterEvents.removeAllListeners();
  //   };
  // }, []);

  // const {CalenderModule} = NativeModules;
  const {CalendarModule, AutoFillSave} = NativeModules;
  const module = NativeModules.Counter;

  console.log('native modues name', module);
  const decrement = async () => {
    if (Platform.OS == 'ios') {
      try {
        var result = await NativeModules.Counter.decrement();
        console.log('Decrement RES==', result);
      } catch (e) {
        console.log(e.message, e.code);
      }
    } else {
      CalendarModule.CounterDecremenet(count => {
        setCountValue(count);
        console.log('counter val--==', count);
      });
    }
  };
  const increment = async () => {
    if (Platform.OS == 'ios') {
      try {
        NativeModules.Counter.increment(val => {
          // setCountValue(val);
          console.log('increment value==>', val);
        });
      } catch (e) {
        console.log(e.message, e.code);
      }
    } else {
      CalendarModule.CounterIncremenet(count => {
        setCountValue(count);
        console.log('counter val--==', count);
      });
    }
  };

  const Save = () => {
    // alert();
    if (Platform.OS == 'ios') {
      console.log('first');
      // module.save(email, password, domain);
      NativeModules.Counter.save(email, password, domain, val => {
        // setCountValue(val);
        console.log('save data value==>', val);
      });
    } else {
      AutoFillSave.save(email, password, domain, eventId => {
        console.log('new event id is created==', eventId);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          width: 320,
          borderRadius: 10,
        }}
        placeholder="Email Address"
        value={email}
        onChangeText={email => {
          setEmail(email);
        }}></TextInput>

      <TextInput
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          width: 320,
          marginVertical: 6,
          borderRadius: 10,
        }}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={password => {
          setPassword(password);
        }}></TextInput>

      <TextInput
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          width: 320,
          marginVertical: 6,
          borderRadius: 10,
        }}
        value={domain}
        placeholder="Domain name"
        onChangeText={domain => {
          setDomainName(domain);
        }}></TextInput>

      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          marginTop: 10,
          borderColor: '#444',
        }}
        onPress={() => {
          Save();
        }}>
        <Text>Save </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          marginTop: 10,
          borderColor: '#444',
        }}
        onPress={() => {
          increment();
        }}>
        <Text>incremenet</Text>
      </TouchableOpacity>
      <Text
        style={{
          padding: 10,
          // borderRadius: 4,
          // borderWidth: 1,
          // marginTop: 10,
          // borderColor: '#444',
        }}>
        {countVal}
      </Text>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          marginTop: 10,
          borderColor: '#444',
        }}
        onPress={decrement}>
        <Text>decrement</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default App;
