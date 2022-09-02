//import liraries
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// create a component
const ListFilter = ({gridData, ShowModal, colseModal, showHeadData}) => {
  // console.log('gridaDta==', gridData[0].headData);
  const dispatch = useDispatch();

  const midListOnpress = item => {
    dispatch({type: 'MIDLIST', action: item?.name});
    colseModal();
  };
  const toplistOnPress = item => {
    dispatch({type: 'TOPLIST', action: item?.name});
    colseModal();
  };
  const bottomListOnpress = () => {};
  const icon = useSelector(store => store?.ListReducer?.iconName);
  const midIcon = useSelector(store => store?.MidListReducer?.iconName);

  return (
    <View style={styles.container}>
      <Modal
        style={{
          width: 240,
          height: showHeadData ? 690 : 390,
        }}
        animationType="fade"
        transparent={true}
        visible={ShowModal}
        onDismiss={() => {
          colseModal();
        }}
        onRequestClose={() => {
          colseModal();
        }}>
        <Pressable
          style={{flex: 1}}
          onPress={event => {
            if (event.target == event.currentTarget) {
              colseModal();
            }
          }}>
          <>
            <View
              style={{
                width: 240,
                height: showHeadData ? 490 : 390,

                backgroundColor: '#fff',
                position: 'absolute',
                right: 10,
                top: 47,
                borderRadius: 10,
              }}>
              {showHeadData == true &&
                gridData[0].headData &&
                gridData.map((item, index) => {
                  return item?.headData.map((item, index) => {
                    return (
                      <>
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            toplistOnPress(item);
                          }}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingLeft: 20,
                            paddingTop: 10,
                            marginVertical: 3,
                          }}>
                          {
                            <View
                              style={{
                                width: 16,
                                height: 15,
                              }}>
                              {icon == item?.name && (
                                <Image
                                  style={{
                                    width: 16,
                                    height: 15,
                                    paddingTop: 22,
                                  }}
                                  source={require('../assests/check.png')}
                                />
                              )}
                            </View>
                          }
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#000',
                              flex: 1,
                              marginLeft: 15,
                            }}>
                            {item?.name}
                          </Text>
                          {item?.icon && (
                            <Image
                              style={{width: 18, height: 18, marginRight: 20}}
                              source={item.icon}
                            />
                          )}
                        </TouchableOpacity>
                        <View
                          style={{
                            borderWidth: 0.4,
                            opacity: 0.4,
                            borderBottomColor: 'gray',
                          }}
                        />
                      </>
                    );
                  });
                })}
              <View
                style={{
                  // marginTop: 3,
                  height: 8,
                  backgroundColor: '#CFCFD5',
                  opacity: 0.5,
                }}
              />

              {gridData.map((item, index) => {
                return item?.topItem.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          toplistOnPress(item);
                        }}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          paddingLeft: 20,
                          paddingTop: 10,
                          marginVertical: 3,
                        }}>
                        {
                          <View
                            style={{
                              width: 16,
                              height: 15,
                            }}>
                            {icon == item?.name && (
                              <Image
                                style={{width: 16, height: 15, paddingTop: 22}}
                                source={require('../assests/check.png')}
                              />
                            )}
                          </View>
                        }
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000',
                            flex: 1,
                            marginLeft: 15,
                          }}>
                          {item?.name}
                        </Text>
                        {item?.icon && (
                          <Image
                            style={{width: 18, height: 18, marginRight: 20}}
                            source={item.icon}
                          />
                        )}
                      </TouchableOpacity>
                      <View
                        style={{
                          borderWidth: 0.4,
                          opacity: 0.4,
                          borderBottomColor: 'gray',
                        }}
                      />
                    </>
                  );
                });
              })}
              <View
                style={{
                  // marginTop: 3,
                  height: 8,
                  backgroundColor: '#CFCFD5',
                  opacity: 0.5,
                }}
              />
              {gridData.map((item, index) => {
                return item?.midItem.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          midListOnpress(item);
                        }}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          paddingLeft: 20,
                          paddingTop: 10,
                          marginVertical: 3,
                        }}>
                        <View style={{width: 16, height: 15}}>
                          {midIcon == item?.name && (
                            <Image
                              style={{width: 16, height: 15, paddingTop: 22}}
                              source={require('../assests/check.png')}
                            />
                          )}
                        </View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000',
                            flex: 1,
                            marginLeft: 15,
                          }}>
                          {item?.name}
                        </Text>
                        {item?.icon && (
                          <Image
                            style={{width: 18, height: 18}}
                            source={item.icon}
                          />
                        )}
                        {/* <View style={{borderWidth: 1, borderBottomColor: 'gray'}} /> */}
                      </TouchableOpacity>
                      <View
                        style={{
                          borderWidth: 0.3,
                          opacity: 0.3,
                          borderBottomColor: 'gray',
                        }}
                      />
                    </>
                  );
                });
              })}
              <View
                style={{
                  // marginTop: 3,
                  height: 8,
                  backgroundColor: '#CFCFD5',
                  opacity: 0.5,
                }}
              />
              {gridData.map((item, index) => {
                return item?.botomItem.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        key={index}
                        onPress={bottomListOnpress}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          paddingLeft: 20,
                          paddingTop: 10,
                          marginVertical: 3,
                        }}>
                        {
                          <Image
                            style={{width: 16, height: 15, paddingTop: 22}}
                            source={require('../assests/check.png')}
                          />
                        }
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000',
                            flex: 1,
                            marginLeft: 15,
                          }}>
                          {item?.name}
                        </Text>
                        {item?.image && (
                          <Image
                            style={{width: 20, height: 20}}
                            source={item.image}
                          />
                        )}
                      </TouchableOpacity>
                      <View
                        style={{
                          borderWidth: 0.4,
                          borderBottomColor: 'gray',
                          opacity: 0.3,
                        }}
                      />
                    </>
                  );
                });
              })}
            </View>
          </>
        </Pressable>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // top: 0,
    // right: 0,
  },
});

export default ListFilter;

{
  /* <FlatList
            style={{flex: 1, backgroundColor: '#fff'}}
            data={gridData}
            renderItem={({item, index}) => {
              console.log('first', item);
              return (
                <View>
                  {item?.topItem.map((item, index) => {
                    return (
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 30,
                            marginVertical: 3,
                          }}>
                          <Text style={{fontSize: 18, color: '#000'}}>
                            {item?.name}
                          </Text>
                          {item?.image && (
                            <Image
                              style={{width: 20, height: 20}}
                              source={item.image}
                            />
                          )}
                        </View>
                        <View
                          style={{borderWidth: 1, borderBottomColor: 'gray'}}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            }}
          />
          <View
            style={{
              // marginTop: 3,
              height: 8,
              backgroundColor: '#CFCFD5',
              opacity: 0.5,
            }}
          /> */
}
{
  /* <FlatList
            style={{flex: 1, backgroundColor: '#fff'}}
            data={gridData}
            renderItem={({item, index}) => {
              console.log('first', item);
              return (
                <View>
                  {item?.midItem.map((item, index) => {
                    return (
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 30,
                            marginVertical: 3,
                          }}>
                          <Text style={{fontSize: 18, color: '#000'}}>
                            {item?.name}
                          </Text>
                          {item?.image && (
                            <Image
                              style={{width: 20, height: 20}}
                              source={item.image}
                            />
                          )}
                        </View>
                        <View
                          style={{borderWidth: 1, borderBottomColor: 'gray'}}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            }}
          />
          <View
            style={{
              // marginTop: 3,
              height: 8,
              backgroundColor: '#CFCFD5',
              opacity: 0.5,
            }}
          /> */
}
{
  /* <FlatList
            style={{backgroundColor: '#fff'}}
            data={gridData}
            renderItem={({item, index}) => {
              console.log('first', item);
              return (
                <View>
                  {item?.botomItem.map((item, index) => {
                    return (
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 30,
                            // marginVertical: 4,
                          }}>
                          <Text style={{fontSize: 18, color: '#000'}}>
                            {item?.name}
                          </Text>
                          {item?.image && (
                            <Image
                              style={{width: 20, height: 20}}
                              source={item.image}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            borderBottomColor: '#CFCFD5',
                            borderWidth: 0.3,
                            opacity: 0.8,
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            }}
          /> */
}
