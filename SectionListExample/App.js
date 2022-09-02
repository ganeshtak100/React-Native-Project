import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MAXWIDTH, spacer} from './src/styles/baseStyle';

const App = () => {
  let data = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
  ];
  let imageUrls = [
    'data:image/jpeg;base64,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',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS88-uONKrzfqwJkWuShw_E_9AWSG1B6TWAAfYRM9FASurU6KCjD8H&usqp=CAE&s',
    'data:image/jpeg;base64,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',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XlQKfzhvKFPHNEi3PPKOkn_UE1HzkBbQTw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKGfJn0ohHQ2WMNeNiSNAKVaKSUCORJxS6w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy93eFEUAIdNSpyBOukGNXJvFplul0F6k0yg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkmVX6gUyHawT8PeLxpmvlNAaHZKwz7DCXQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XlQKfzhvKFPHNEi3PPKOkn_UE1HzkBbQTw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKGfJn0ohHQ2WMNeNiSNAKVaKSUCORJxS6w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy93eFEUAIdNSpyBOukGNXJvFplul0F6k0yg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkmVX6gUyHawT8PeLxpmvlNAaHZKwz7DCXQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XlQKfzhvKFPHNEi3PPKOkn_UE1HzkBbQTw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKGfJn0ohHQ2WMNeNiSNAKVaKSUCORJxS6w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy93eFEUAIdNSpyBOukGNXJvFplul0F6k0yg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkmVX6gUyHawT8PeLxpmvlNAaHZKwz7DCXQ&usqp=CAU',
  ];
  const [refreshing, setRefreshing] = useState(false);
  const pulltoRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  let scrollYAnimatedValue = new Animated.Value(0);

  const HEADER_MIN_HEIGHT = 50;
  const HEADER_MAX_HEIGHT = 200;
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['#e91e63', '#B8EF4E'],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <View>
        <ScrollView
          stickyHeaderIndices={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
          // showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          // contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          // // stickyHeaderIndices={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          // onScroll={Animated.event([
          //   {
          //     nativeEvent: {contentOffset: {y: scrollYAnimatedValue}},
          //   },
          // ])}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: MAXWIDTH,
                  backgroundColor: '#C2185B',
                  // marginBottom: 27 * item?.data.length,
                }}>
                <Animated.Text
                  style={{
                    // height: 40,
                    // width: MAXWIDTH,
                    padding: spacer,
                    color: '#fff',
                    fontSize: 20,
                    textAlign: 'center',

                    // borderColor: '#000',
                    // borderWidth: 1,
                    // borderRadius: 10,
                  }}>
                  {item.title}
                </Animated.Text>

                {item?.data.map((item, index) => {
                  return (
                    <View key={index} style={{backgroundColor: '#fff'}}>
                      <Text
                        style={{
                          padding: spacer * 0.2,
                          alignItems: 'center',
                          // borderColor: '#000',
                          // borderWidth: 1,
                          // borderRadius: 10,
                        }}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
                {/* <NestedScrollView
                  data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                  type={'no'}
                /> */}
              </View>
            );
          })}
        </ScrollView>

        {/* <Animated.View
        style={[
          styles.animatedHeaderContainer,
          {height: headerHeight, backgroundColor: headerBackgroundColor},
        ]}>
        <Text style={styles.headerText}>Today's Menu</Text>
      </Animated.View>
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <Text style={{color: 'red', fontSize: 20}}>
          {' '}
          Resuable Nested ScrollView
        </Text>
        <NestedScrollView data={imageUrls} type={'image'} />
      </View> */}
      </View>
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
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default App;
