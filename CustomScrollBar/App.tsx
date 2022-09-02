import React, {Reducer, useReducer, useState} from 'react';
import {
  Image,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Scrollbar} from './components/scrollbar';
import data from './data.json';
import {
  HeaderProps,
  ScrollViewItemProps,
  ScrollViewSectionProps,
  SHAction,
  SHs,
  SHTypes,
} from './src/types';
const ScrollViewSection = ({section, ...ViewProps}: ScrollViewSectionProps) => {
  const {title} = section;

  return (
    <View {...ViewProps}>
      {section.data.map((item, i) => (
        <ScrollViewItem key={i} item={item} />
      ))}
    </View>
  );
};

const Header = ({title}: HeaderProps) => (
  <View style={styles.listSectionHeader}>
    <Text style={styles.listSectionHeaderText}>{title}</Text>
  </View>
);

const ScrollViewItem = ({item}: ScrollViewItemProps) => {
  const {name, photo} = item;

  return (
    <View style={styles.listItem}>
      <Image style={{...styles.listItemImage}} source={{uri: photo}} />
    </View>
  );
};

const initialState = {
  scrollview: 0,
  scrollbar: 0,
};

const App = () => {
  const [list, _] = useState(data); // fetch your list from somewhere
  const LIST_LENGTH = list.length;

  // Get height of ScrollView section and Scrollbar section
  const [sectionHeights, dispatch] = useReducer<Reducer<SHs, SHAction>>(
    reducer,
    initialState,
  );
  console.log(sectionHeights);

  const scrollViewRef = useAnimatedRef();

  const scrollActive = useSharedValue(false);
  const scrollIndex = useSharedValue(0); // number between 0 and (LIST_LENGTH - 1)

  useDerivedValue(() => {
    if (scrollActive.value) return;
    scrollTo(
      scrollViewRef,
      0,
      scrollIndex.value * sectionHeights.scrollview,
      false,
    );
  });

  const handleScroll = (event: any) => {
    'worklet';
    if (!scrollActive.value) return;
    const newScrollIndex = Math.floor(
      event.nativeEvent.contentOffset.y / sectionHeights.scrollview,
    );
    if (LIST_LENGTH > newScrollIndex && newScrollIndex >= 0) {
      scrollIndex.value = withSpring(newScrollIndex);
    }
  };

  const handleLayout = (e: LayoutChangeEvent, type: SHTypes) => {
    // dont set state if its already set (not zero)
    if (sectionHeights[type]) return;
    const {height} = e.nativeEvent.layout;
    dispatch({type: type, payload: height});
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'scrollview':
        return {
          ...state,
          scrollview: action.payload,
        };
      case 'scrollbar':
        return {
          ...state,
          scrollbar: action.payload / LIST_LENGTH,
        };
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={[styles.container, styles.flexRow]}>
        <TapGestureHandler onBegan={() => (scrollActive.value = true)}>
          <ScrollView
            // @ts-ignore
            ref={scrollViewRef}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={30}
            onScroll={handleScroll}>
            {list.map((section, i) => (
              <ScrollViewSection
                key={i}
                section={section}
                onLayout={e => handleLayout(e, 'scrollview')}
              />
            ))}
          </ScrollView>
        </TapGestureHandler>
        <View style={styles.justifyCenter}>
          <Scrollbar
            list={list}
            scrollActive={scrollActive}
            scrollIndex={scrollIndex}
            sectionHeights={sectionHeights}
            onLayout={e => handleLayout(e, 'scrollbar')}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  listItemImage: {
    height: 240,
    width: 240,
    // borderRadius: 25,
    marginRight: 10,
  },
  listSectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listSectionHeaderText: {
    fontSize: 30,
    fontWeight: '900',
  },
});

export default App;

// import React, {Reducer, useReducer, useRef, useState} from 'react';
// import {
//   Image,
//   LayoutChangeEvent,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {
//   useAnimatedRef,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
// import {Scrollbar} from './components/scrollbar';
// import data from './data.json';
// import {
//   HeaderProps,
//   ScrollViewItemProps,
//   ScrollViewSectionProps,
//   SHAction,
//   SHs,
//   SHTypes,
// } from './src/types';

// const App = () => {
//   const [list, _] = useState(data);
//   const scrollRef = useRef<ScrollView>(null);
//   const scrollViewRef = useAnimatedRef();
//   const scrollActive = useSharedValue(false);
//   const scrollIndex = useSharedValue(0); // number between 0 and (LIST_LENGTH - 1)
//   let LIST_LENGTH = list.length;

//   // useDerivedValue(() => {
//   //   if (scrollActive.value) return;
//   //   scrollTo(
//   //     scrollViewRef,
//   //     0,
//   //     scrollIndex.value * sectionHeights.scrollview,
//   //     false,
//   //   );
//   // });
//   const initialState = {
//     scrollview: 0,
//     scrollbar: 0,
//   };
//   // Get height of ScrollView section and Scrollbar section
//   const [sectionHeights, dispatch] = useReducer<Reducer<SHs, SHAction>>(
//     reducer,
//     initialState,
//   );
//   console.log(sectionHeights);

//   const handleLayout = (e: LayoutChangeEvent, type: SHTypes) => {
//     // dont set state if its already set (not zero)
//     if (sectionHeights[type]) return;
//     const {height} = e.nativeEvent.layout;
//     dispatch({type: type, payload: height});
//   };

//   function reducer(state: any, action: any) {
//     switch (action.type) {
//       case 'scrollview':
//         return {
//           ...state,
//           scrollview: action.payload,
//         };
//       case 'scrollbar':
//         return {
//           ...state,
//           scrollbar: action.payload / LIST_LENGTH,
//         };
//     }
//   }
//   const ScrollViewShows = ({section, ...ViewProps}: ScrollViewSectionProps) => {
//     const {title} = section;
//     return (
//       <View>
//         <Header title={title} />
//         {section.data.map((item, index) => (
//           <ScrollViewItem key={index} item={item} />
//         ))}
//       </View>
//     );
//   };
//   const Header = ({title}: HeaderProps) => (
//     <View style={styles.listSectionHeader}>
//       <Text style={styles.listSectionHeaderText}>{title}</Text>
//     </View>
//   );
//   const ScrollViewItem = ({item}: ScrollViewItemProps) => {
//     const {name, photo} = item;
//     return (
//       <View>
//         <Image style={styles.listItemImage} source={{uri: photo}} />
//       </View>
//     );
//   };
//   const handleScroll = (event: any) => {
//     'worklet';
//     if (!scrollActive.value) return;
//     const newScrollIndex = Math.floor(
//       event.nativeEvent.contentOffset.y / sectionHeights.scrollview,
//     );
//     if (LIST_LENGTH > newScrollIndex && newScrollIndex >= 0) {
//       scrollIndex.value = withSpring(newScrollIndex);
//     }
//   };
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaView
//         style={{flex: 1, backgroundColor: '#fff', ...styles.flexRow}}>
//         {/* <TapGestureHandler onBegan={() => (scrollActive.value = true)}> */}
//         <ScrollView
//           // contentInsetAdjustmentBehavior="automatic"
//           ref={scrollRef}
//           style={styles.container}
//           onScroll={handleScroll}
//           showsVerticalScrollIndicator={false}
//           scrollEventThrottle={36}>
//           {list.map((section, i) => (
//             <ScrollViewShows
//               key={i}
//               section={section}
//               onLayout={e => handleLayout(e, 'scrollview')}
//             />
//           ))}
//           <View style={styles.justifyCenter}>
//             <Scrollbar
//               list={list}
//               scrollActive={scrollActive}
//               scrollIndex={scrollIndex}
//               sectionHeights={sectionHeights}
//               onLayout={e => handleLayout(e, 'scrollbar')}
//             />
//           </View>
//         </ScrollView>
//         {/* </TapGestureHandler> */}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   justifyCenter: {
//     justifyContent: 'center',
//   },
//   flexRow: {
//     flexDirection: 'row',
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//   },
//   listItemImage: {
//     height: 40,
//     width: 40,
//     borderRadius: 25,
//     marginRight: 10,
//     marginVertical: 15,
//     marginLeft: 20,
//   },
//   listSectionHeader: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   listSectionHeaderText: {
//     fontSize: 30,
//     fontWeight: '900',
//     marginLeft: 20,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// import React, {useRef, useState} from 'react';
// import {Image, ScrollView, StyleSheet, View} from 'react-native';

// interface Props {
//   visible: boolean;
//   onDismiss: () => void;
// }

// const scrollElementHeightPercent = 45;
// const scrollElementHeightPercentStr = `${scrollElementHeightPercent}%`;
// const scrollBarBorderRadius = 6;
// const App = (props: Props) => {
//   const [contentOffset, setContentOffset] = useState({x: 0, y: 0});
//   const scrollRef = useRef<ScrollView>(null);
//   const [contentSize, setContentSize] = useState(0);
//   const [scrollViewHeight, setScrollViewHeight] = useState(0);

//   let scrollPosPercent;

//   if (contentOffset.y > 0) {
//     scrollPosPercent =
//       (contentOffset.y / (contentSize - scrollViewHeight)) *
//       (100 - scrollElementHeightPercent);
//   }

//   const onDismiss = () => {
//     setContentOffset({x: 0, y: 0});
//     props.onDismiss();
//   };
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           justifyContent: 'flex-end',
//           alignItems: 'center',
//           height: '15%',
//           backgroundColor: 'transparent',
//         }}>
//         <View
//           style={{
//             marginBottom: 8,
//             width: '20%',
//             height: 4,
//             borderRadius: 4,
//             backgroundColor: 'white',
//           }}
//         />
//       </View>

//       <View
//         style={{
//           position: 'absolute',
//           right: 20,
//           top: '20%',
//           marginBottom: 8,
//           width: 8,
//           height: 100,
//           borderRadius: scrollBarBorderRadius,
//           backgroundColor: 'rgba(255,255,255,.5)',
//           zIndex: 1,
//         }}>
//         <View
//           style={{
//             position: 'absolute',
//             left: -1,
//             top: `${Number(scrollPosPercent || 0).toFixed(0)}%`,
//             marginBottom: 8,
//             width: 10,
//             height: scrollElementHeightPercentStr,
//             borderRadius: scrollBarBorderRadius + 2,
//             backgroundColor: 'rgba(255,255,255,.7)',
//           }}
//         />
//       </View>

//       <View
//         style={{
//           width: '100%',
//           flex: 1,
//           borderRadius: 16,
//           overflow: 'hidden',
//         }}>
//         <ScrollView
//           ref={scrollRef}
//           scrollEventThrottle={16}
//           onLayout={e => {
//             setScrollViewHeight(e.nativeEvent.layout.height);
//           }}
//           onContentSizeChange={(_, height) => {
//             setContentSize(height);
//           }}
//           showsHorizontalScrollIndicator
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//           disableScrollViewPanResponder
//           onScroll={(e: any) => {
//             22222;
//             setContentOffset(e.nativeEvent.contentOffset);
//           }}
//           automaticallyAdjustContentInsets={false}
//           style={styles.scrollView}>
//           <Image
//             source={require('./assests/images/1.jpg')}
//             style={styles.image}
//           />

//           <Image
//             source={require('./assests/images/2.jpg')}
//             style={styles.image}
//           />

//           <Image
//             source={require('./assests/images/3.jpg')}
//             style={styles.image}
//           />

//           <Image
//             source={require('./assests/images/4.jpg')}
//             style={styles.image}
//           />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     height: 300,
//     width: '100%',
//   },
//   container: {
//     flex: 1,
//     position: 'relative',
//     backgroundColor: 'transparent',
//     borderRadius: 16,
//     height: 250,
//   },
//   scrollView: {},
//   developmentModeText: {
//     marginBottom: 20,
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   helpContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     textAlign: 'center',
//   },
// });
// export default App;

// import React, {useRef, useState} from 'react';
// import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';

// class CustomScrollview extends PureComponent {
//   state = {
//     indicator: new Animated.Value(0),
//     wholeHeight: 1,
//     visibleHeight: 0,
//   };
//   render() {
//     const indicatorSize =
//       this.state.wholeHeight > this.state.visibleHeight
//         ? (this.state.visibleHeight * this.state.visibleHeight) /
//           this.state.wholeHeight
//         : this.state.visibleHeight;

//     const difference =
//       this.state.visibleHeight > indicatorSize
//         ? this.state.visibleHeight - indicatorSize
//         : 1;
//     return (
//       <View>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           onContentSizeChange={(width, height) => {
//             this.setState({wholeHeight: height});
//           }}
//           onLayout={({
//             nativeEvent: {
//               layout: {x, y, width, height},
//             },
//           }) => this.setState({visibleHeight: height})}
//           scrollEventThrottle={16}
//           onScroll={Animated.event([
//             {nativeEvent: {contentOffset: {y: this.state.indicator}}},
//           ])}></ScrollView>
//         <View style={styles.indicatorWrapper} />
//         <Animated.View
//           style={[
//             styles.indicator,
//             {
//               height: indicatorSize,
//               transform: [
//                 {
//                   translateY: Animated.multiply(
//                     this.state.indicator,
//                     this.state.visibleHeight / this.state.wholeHeight,
//                   ).interpolate({
//                     inputRange: [0, difference],
//                     outputRange: [0, difference],
//                     extrapolate: 'clamp',
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       </View>
//     );
//   }
// }

// const CustomScrollBarComponent = () => {
//   const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
//   const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
//   const scrollIndicator = useRef(new Animated.Value(0)).current;

//   const scrollIndicatorSize =
//     completeScrollBarHeight > visibleScrollBarHeight
//       ? (visibleScrollBarHeight * visibleScrollBarHeight) /
//         completeScrollBarHeight
//       : visibleScrollBarHeight;

//   const difference =
//     visibleScrollBarHeight > scrollIndicatorSize
//       ? visibleScrollBarHeight - scrollIndicatorSize
//       : 1;

//   const scrollIndicatorPosition = Animated.multiply(
//     scrollIndicator,
//     visibleScrollBarHeight / completeScrollBarHeight,
//   ).interpolate({
//     extrapolate: 'clamp',
//     inputRange: [0, difference],
//     outputRange: [0, difference],
//   });

//   const onContentSizeChange = (_, contentHeight) =>
//     setCompleteScrollBarHeight(contentHeight);

//   const onLayout = ({
//     nativeEvent: {
//       layout: {height},
//     },
//   }) => {
//     setVisibleScrollBarHeight(height);
//   };

//   return (
//     <View style={styles.scrollContainer}>
//       <ScrollView
//         contentContainerStyle={{paddingRight: 14}}
//         onContentSizeChange={onContentSizeChange}
//         onLayout={onLayout}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
//           {useNativeDriver: false},
//         )}
//         scrollEventThrottle={3}
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollViewContainer}>
//         {/* Your ScrollView content here */}
//         <View style={{alignItems: 'center', justifyContent: 'center'}}>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//           <Text>1</Text>
//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>

//           <Text>1</Text>
//         </View>
//       </ScrollView>
//       <View style={styles.customScrollBarBackground}>
//         <Animated.View
//           style={[
//             styles.customScrollBar,
//             {
//               height: scrollIndicatorSize,
//               transform: [{translateY: scrollIndicatorPosition}],
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   scrollViewContainer: {
//     width: '100%',
//   },
//   customScrollBar: {
//     backgroundColor: '#ccc',
//     borderRadius: 3,
//     width: 6,
//   },
//   customScrollBarBackground: {
//     backgroundColor: 'red',
//     borderRadius: 3,
//     height: '100%',
//     width: 6,
//   },
// });
// export default CustomScrollBarComponent;
