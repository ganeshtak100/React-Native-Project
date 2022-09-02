//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
// import Swipeout from 'react-native-swipeout';
// create a component
const BrowseItem = ({headerName, item, ScollEnable}) => {
  const [data, setData] = useState(item);
  const navigation = useNavigation();
  const [showList, setShowList] = useState(false);
  const ListShow = () => {
    setShowList(!showList);
  };
  // console.log('list show value==', showList);

  const ListItemOnPress = item => {
    // console.log('item', item);
    if (item && item?.onPress) {
      navigation.navigate(item?.onPress);
    }
  };
  // let swipeoutBtns = [
  //   {
  //     text: 'Button',
  //   },
  // ];
  // const renderRightActions = (
  //   progress: Animated.AnimatedInterpolation,
  //   dragX: Animated.AnimatedInterpolation,
  // ) => {
  //   const opacity = dragX.interpolate({
  //     inputRange: [-150, 0],
  //     outputRange: [1, 0],
  //     extrapolate: 'clamp',
  //   });

  //   return (
  //     <View style={styles.swipedRow}>
  //       <View style={styles.swipedConfirmationContainer}>
  //         <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
  //       </View>
  //       <Animated.View style={[styles.deleteButton, {opacity}]}>
  //         <TouchableOpacity>
  //           <Text style={styles.deleteButtonText}>Delete</Text>
  //         </TouchableOpacity>
  //       </Animated.View>
  //     </View>
  //   );
  // };
  const renderItem = ({item, drag, isActive, index}) => {
    return (
      <ScaleDecorator>
        {/* <Swipeout right={swipeoutBtns}> */}
        {/* <Swipeable renderRightActions={renderRightActions}> */}
        <TouchableOpacity
          disabled={isActive}
          style={{
            flex: 1,
            backgroundColor: isActive ? '#FFFF' : '#fff',
          }}
          onLongPress={drag}
          onPress={() => {
            ListItemOnPress(item);
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginVertical: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              {headerName == 'Locations' ? (
                <Image style={{width: 28, height: 30}} source={item.icon} />
              ) : (
                <View
                  style={{
                    borderRadius: 50,
                    width: 15,
                    borderColor: `${item?.name.toLowerCase()}`,
                    height: 15,
                    opacity: 0.7,
                    borderWidth: 0.4,
                    marginTop: 10,
                    backgroundColor: `${item?.name.toLowerCase()}`,
                  }}></View>
              )}
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 19, marginLeft: 25, color: '#000'}}>
                {item?.name}
              </Text>
            </View>
            <Image
              style={{
                width: 10,
                height: 14,
                top: 10,
                opacity: 0.6,
                alignSelf: 'flex-start',
              }}
              source={require('../assests/right-arrowGray.png')}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#868686',
              borderWidth: 0.3,
              opacity: 0.8,
              marginLeft: headerName == 'Locations' ? 72 : 61,
            }}
          />
        </TouchableOpacity>
        {/* </Swipeable> */}
        {/* </Swipeout> */}
      </ScaleDecorator>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => ListShow()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text
          style={{fontSize: 24, fontWeight: '500', bottom: 10, color: '#000'}}>
          {headerName}
        </Text>
        {showList == true ? (
          <Image
            style={{width: 14, height: 14}}
            source={require('../assests/arrow-down.png')}
          />
        ) : (
          <Image
            style={{width: 14, height: 14}}
            source={require('../assests/right-arrow.png')}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',

          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        }}>
        {showList == true && (
          // <FlatList
          //   data={item}
          //   keyExtractor={(item, index) => index.toString()}
          //   renderItem={({item, index}) => {
          //     return (
          //       <TouchableOpacity
          //         onPress={() => {
          //           ListItemOnPress(item);
          //         }}>
          //         <View
          //           style={{
          //             flexDirection: 'row',
          //             paddingHorizontal: 20,
          //             marginVertical: 15,
          //             justifyContent: 'space-between',
          //           }}>
          //           <View>
          //             {headerName == 'Locations' ? (
          //               <Image
          //                 style={{width: 28, height: 30}}
          //                 source={item.icon}
          //               />
          //             ) : (
          //               <View
          //                 style={{
          //                   borderRadius: 50,
          //                   width: 15,
          //                   borderColor: `${item?.name.toLowerCase()}`,
          //                   height: 15,
          //                   opacity: 0.7,
          //                   borderWidth: 0.4,
          //                   marginTop: 10,
          //                   backgroundColor: `${item?.name.toLowerCase()}`,
          //                 }}></View>
          //             )}
          //           </View>
          //           <View style={{flex: 1}}>
          //             <Text
          //               style={{fontSize: 19, marginLeft: 25, color: '#000'}}>
          //               {item?.name}
          //             </Text>
          //           </View>
          //           <Image
          //             style={{
          //               width: 10,
          //               height: 14,
          //               top: 10,
          //               opacity: 0.6,
          //               alignSelf: 'flex-start',
          //             }}
          //             source={require('../assests/right-arrowGray.png')}
          //           />
          //         </View>
          //         <View
          //           style={{
          //             borderBottomColor: '#868686',
          //             borderWidth: 0.3,
          //             opacity: 0.8,
          //             marginLeft: headerName == 'Locations' ? 72 : 61,
          //           }}
          //         />
          //       </TouchableOpacity>
          //     );
          //   }}
          // />
          <DraggableFlatList
            data={data}
            onDragEnd={({data}) => {
              setData(data);
              // ScollEnable(true);
            }}
            keyExtractor={(item, index) => index.toString()}
            // onDragBegin={() => {
            //   ScollEnable(false);
            // }}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#efefef',
    margin: 20,
    minHeight: 50,
  },
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

//make this component available to the app
export default BrowseItem;
// <FlatList
//   data={item}
//   renderItem={({item, index}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           ListItemOnPress(item);
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             paddingHorizontal: 20,
//             marginVertical: 15,
//             justifyContent: 'space-between',
//           }}>
//           <View>
//             {headerName == 'Locations' ? (
//               <Image style={{width: 28, height: 30}} source={item.icon} />
//             ) : (
//               <View
//                 style={{
//                   borderRadius: 50,
//                   width: 15,
//                   borderColor: `${item?.name.toLowerCase()}`,
//                   height: 15,
//                   opacity: 0.7,
//                   borderWidth: 0.4,
//                   marginTop: 10,
//                   backgroundColor: `${item?.name.toLowerCase()}`,
//                 }}></View>
//             )}
//           </View>
//           <View style={{flex: 1}}>
//             <Text style={{fontSize: 19, marginLeft: 25, color: '#000'}}>
//               {item?.name}
//             </Text>
//           </View>
//           <Image
//             style={{
//               width: 10,
//               height: 14,
//               top: 10,
//               opacity: 0.6,
//               alignSelf: 'flex-start',
//             }}
//             source={require('../assests/right-arrowGray.png')}
//           />
//         </View>
//         <View
//           style={{
//             borderBottomColor: '#868686',
//             borderWidth: 0.3,
//             opacity: 0.8,
//             marginLeft: headerName == 'Locations' ? 72 : 61,
//           }}
//         />
//       </TouchableOpacity>
//     );
//   }}
// />;
