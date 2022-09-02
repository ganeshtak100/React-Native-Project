//import liraries
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {videoData} from '../constant/data';
import ScrollableFlatList from './ScrollableFlatList';
// create a component
const Post = ({currentIndexValue}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.1,
        }}>
        <View
          style={{
            alignItems: 'center',
            // justifyContent: 'space-between',
            padding: 30,
            marginHorizontal: 20,
          }}>
          {videoData.map((item, index) => (
            <ScrollableFlatList
              currentIndexValue={currentIndexValue}
              key={index}
              data={item?.post}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Post;
{
  /* <SwiperFlatList
                autoplay={false}
                showPagination
                data={item}
                renderItem={({ite}) => {
                  console.log('ite, iimage', ite);
                  return (
                    // <View style={{width: '100%', height: 400}}>
                    <Image
                      source={{uri: ite.postImage}}
                      style={{width: '100%', height: 400}}
                    />
                    // </View>
                  );
                }}
              /> */
}
{
  /* <Image
                source={{uri: item.postImage}}
                style={{width: '100%', height: 400}}
              /> */
}
