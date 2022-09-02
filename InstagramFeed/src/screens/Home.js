//import liraries
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {videoData} from '../constant/data';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoId, setVideoId] = useState(0);
  const [viewable, setViewable] = useState(true);
  // console.log('current index value==', currentIndex);
  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.y / nativeEvent.layoutMeasurement.width,
      );
      // console.log('current index value==>>>', slide);

      if (slide != currentIndex) {
        setCurrentIndex(slide);
      }
    }
  };
  const onViewableItemsChanged = ({viewableItems}) => {
    console.log(
      'viewable items length==',
      viewableItems.length,
      '\n',
      'data---',
      viewableItems,
      '\n',
      'nested post data',
      viewableItems[0]?.item?.post,
    );
    if (viewableItems.length >= 3) {
      let item_id = viewableItems[1]?.item?.id;
      console.log('entered when lengh is 3');
      setCurrentIndex(item_id);
      if (
        viewableItems[0]?.item?.post.length >= 1 &&
        viewableItems[0]?.item?.id == viewableItems[0]?.item?.post[0]?.id
      ) {
        setVideoId(viewableItems[1].item?.post[0]?.v_id);
      }
    } else if (viewableItems.length == 2) {
      console.log('entered when lengh is 2---', viewableItems[0]?.item?.id);
      if (
        viewableItems[0]?.item?.post.length > 1 &&
        viewableItems[0]?.item?.id == viewableItems[0]?.item?.post[0]?.id
      ) {
        setVideoId(viewableItems[0]?.item?.post[0]?.v_id);
      }
      setCurrentIndex(viewableItems[0]?.item?.id);
    } else setCurrentIndex(viewableItems[0]?.item?.id);
    // if (viewableItems[0]?.item?.post[0]?.v_id) {
    setVideoId(viewableItems[0].item?.post[0]?.v_id);

    const firstViewItem = viewableItems[0].key;
    const index = videoData.findIndex(item => item.id === firstViewItem);
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const horizontalVideo = ({item, index}) => {
    console.log(
      'HORIZONTAL VIDEO RENDER---',
      currentIndex,
      item.id,
      videoId,
      item.v_id,
    );
    const paused =
      currentIndex == item.id && videoId == item.v_id ? false : true;
    return (
      <View
        key={index}
        style={{width: WIDTH, marginVertical: 10, height: HEIGHT}}>
        <Video
          source={item.video}
          paused={paused}
          style={{
            backgroundColor: 'black',
            ...styles.wrap,
          }}
          repeat={true}
          resizeMode={'cover'}
        />
        <TouchableOpacity
          style={{
            height: 300,
            width: WIDTH,
            position: 'absolute',
            marginTop: 50,
          }}
          activeOpacity={1}
          onPress={() => {
            setCurrentIndex(item.id);
            item.v_id == videoId && item.id == currentIndex
              ? setVideoId(-1)
              : setVideoId(item.v_id);
          }}
        />
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    if (item.post.length > 1) {
      return (
        <View
          key={index}
          style={{
            width: WIDTH - 2,
            height: HEIGHT,
            flex: 1,
            // marginVertical: 190,
          }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            renderItem={horizontalVideo}
            data={item.post}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={({nativeEvent}) => {
              setVideoId(Math.round(nativeEvent.contentOffset.x / WIDTH) + 1);
            }}
          />
        </View>
      );
    } else {
      const paused = item.id == currentIndex ? false : true;
      return (
        <View
          key={index}
          style={{
            width: WIDTH - 2,
            height: HEIGHT,
            marginVertical: 20,
            flex: 1,
          }}>
          <Video
            resizeMode="cover"
            source={item.post[0].video}
            paused={paused}
            style={{
              backgroundColor: 'black',
              ...styles.wrap,
            }}
            repeat={true}
          />
          <TouchableOpacity
            style={{
              height: HEIGHT,
              width: WIDTH,
              position: 'absolute',
              marginTop: 50,
            }}
            activeOpacity={1}
            onPress={() => {
              item.id == currentIndex
                ? setCurrentIndex(-1)
                : setCurrentIndex(item.id);
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={videoData}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={renderItem}
        // renderItem={({item, index}) => {
        //   console.log(' indexkkkkk///', index + 1);
        //   return (
        //     <View
        //       key={index}
        //       style={{
        //         flex: 1,
        //         alignItems: 'center',
        //         marginHorizontal: 20,
        //         padding: 10,
        //       }}>
        //       <ScrollableFlatList
        //         viewable={currentIndex === index + 1}
        //         VideoId={videoId}
        //         // currentIndexValue={currentIndexValue}
        //         data={item?.post}
        //       />
        //     </View>
        //   );
        // }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ff7',
  },
  wrap: {
    width: WIDTH - 2,
    height: HEIGHT,
  },
});

//make this component available to the app
export default Home;
{
  /* <ScrollView
        onContentSizeChange={(contentWidth, contentHeight) => {
          console.log('WIDTH AND height', contentWidth, contentHeight);
        }}
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 6,
            borderColor: 'gray',
            borderBottomWidth: 0.4, 
            borderTopWidth: 0.5,
            opacity: 0.1,
          }}></View>
        <Post currentIndexValue={currentIndex} />
      </ScrollView> */
}
