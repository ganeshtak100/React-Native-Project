import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const App = () => {
  // let realm = new Realm({path: 'Book'});

  // for (let i = 0; i < 3; i++) {
  //   realm.write(() => {
  //     const book = realm.create('Book', {
  //       title: 'Book no' + i,
  //       pages: 900,
  //     });
  //   });
  // }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{padding: 8}}>
        <Text>Some sample text</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
