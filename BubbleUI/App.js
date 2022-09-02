import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {BubbleUI} from './BubbleUI';
// const width = Dimensions().width();
const {width, height} = Dimensions.get('window');
const App = () => {
  let x = [1, 2, 3, 4, 5];
  let y = [1, 2, 3, 4];
  const getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {x.map((a, i) => {
          return (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{display: 'flex', flexDirection: 'row'}}
              horizontal>
              {y.map((a, i) => {
                return <BubbleUI />;
              })}
            </ScrollView>
          );
        })}

        {/* <View
          style={{
            width: '100%',
            height: 300,
            backgroundColor: 'gray',
          }}></View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
