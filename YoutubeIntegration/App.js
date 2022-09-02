import React, {useRef, useState} from 'react';
import {
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YouTube from 'react-native-youtube';

const App = () => {
  const youtubePlayerRef = useRef();
  // const VideoId = 'mLI_QxszYrU';
  const VideoIds = ['Fpf2qJE0Iag', 'Fpf2qJE0Iag', 'bEFswXe1-BQ'];

  // const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  // const [quality, setQuality] = useState(null);
  // const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [isLooping, setIsLooping] = useState(true);
  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          if (!containerMounted) setContainerMounted(true);
          if (containerWidth !== width) setContainerWidth(width);
        }}>
        <View
          style={{
            marginTop: 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, marginVertical: 10}}>
            YOUTUBE VIDEO PLAY
          </Text>
        </View>
        {containerMounted && (
          <YouTube
            ref={youtubePlayerRef}
            apiKey="AIzaSyDvLNtqMfxYN_JVdA8INXhHmiW1JKU5xJk"
            videoIds={VideoIds}
            play={isPlaying}
            fullscreen={fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  containerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            onChangeState={e => setStatus(e.state)}
            onChangeFullscreen={e => setFullscreen(e.isFullscreen)}
            onProgress={e => {
              setDuration(e.duration);
              setCurrentTime(e.currentTime);
            }}
          />
        )}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsPlaying(isPlaying => !isPlaying)}>
            <Text style={styles.buttonText}>
              {status == 'playing' ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.previousVideo()
            }>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current && youtubePlayerRef.current.nextVideo()
            }>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View> */}

        {!fullscreen && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFullscreen(true)}>
              <Text style={styles.buttonText}>Fullscreen</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: 100,
    marginVertical: 30,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'red',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

// AIzaSyDvLNtqMfxYN_JVdA8INXhHmiW1JKU5xJk;

export default App;
