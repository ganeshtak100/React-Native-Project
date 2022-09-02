//import liraries
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
export const WIDTH = Dimensions.get('window').width;
// console.log('WIDTH==', WIDTH);
const HEIGHT = Dimensions.get('window').height;

// create a component
const ScrollableFlatList = ({data, currentIndexValue, viewable, VideoId}) => {
  const [pause, setPause] = useState(false);
  // console.log('pause statue==', pause);
  console.log('current index value==', viewable, VideoId);

  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log('scrolldata---', data);
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);

  const [videoActive, setVideoActive] = useState(0);
  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != videoActive) {
        setVideoActive(slide);
      }
    }
  };
  const onBuffer = buffer => {
    // console.log('buffring', buffer);
  };
  const onError = error => {
    // console.log('error', error);
  };
  console.log('videoActive index', videoActive);
  // const paused= VideoId && ;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{...styles.wrap, marginVertical: 70}}>
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {data.map((item, index) => {
            const paused = (VideoId && VideoId == item?.id) || viewable;

            // console.log('first,cu', currentIndexValue, index);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPause(!pause);
                }}>
                <View key={index} style={{marginHorizontal: 2}}>
                  <Video
                    // controls={true}
                    // onReadyForDisplay={() => {
                    //   console.log('video forready');
                    // }}

                    key={index}
                    ref={videoRef}
                    // videoRef={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat={true}
                    resizeMode="cover"
                    // paused={false}
                    paused={
                      paused || pause
                      // VideoId && VideoId == item?.v_id? false:
                      // viewable == true ? false : true
                    }
                    source={item?.video}
                    muted={mute}
                    style={{
                      backgroundColor: 'black',
                      ...styles.wrap,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.wrapDot}>
          {data.map((e, index) => (
            <Text
              key={index}
              style={videoActive == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
  },
  wrap: {
    width: WIDTH - 2,
    height: 270,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
  dotActive: {
    margin: 3,
    color: 'gray',
  },
});

//make this component available to the app
export default ScrollableFlatList;

///instagram story tiles using reanimated 2
// const TilesProgressBar = ({current, slices, progress}) => {
// return (
//     <View style={{flexDirection: 'row'}}>
//       {slices.map((slice, index) => {
//         const animatedStyle = useAnimatedStyle(() => {
//           return {
//             flex: current == index ? progress.value : slice.finish,
//           };
//         });

//         return (
//           <View
//             key={index}
//             style={{
//               height: 2,
//               flex: 1,
//             }}>
//             <Animated.View style={[animatedStyle]} />
//           </View>
//         );
//       })}
//     </View>
//   );
// };
// current prop is the current slice selected, it changes when you tap right on left like on instagram.
// slices prop are all slices of the story, so the number of tiles is slices.length.
// progress is the reanimated useSharedValue() used to keep track of the slice duration, say for example 4 seconds.
