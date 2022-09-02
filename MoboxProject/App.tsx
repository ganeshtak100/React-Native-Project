import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import store from './src/store/store';

// @inject('store');
// @observer;

const App = observer(() => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState('');
  console.log('text that is typing:--', text);
  useEffect(() => {
    store.getData();
    // setTodoList(store.todos);
  }, []);
  const onChangeText = (text: React.SetStateAction<string>) => {
    if (text) {
      setText(text);
    }
  };
  console.log('store fdata', store.todos);

  const SubmitData = () => {
    // alert();
    try {
      if (text && !!text) {
        store.addTodo(text);
        setText('');
      } else {
        alert('Please enter todo title!');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };
  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);

    store.deleteTodo(rowKey);
  };
  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const HiddenItemWithActionas = (props: {onClose: any; onDelete: any}) => {
    const {onClose, onDelete} = props;

    return (
      <View style={styles.rowBack}>
        <Text>left</Text>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}>
          <Text>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderHiddenItems = (data: any, rowMap: any) => {
    return (
      <HiddenItemWithActionas
        // data={data}
        // rowMap={rowMap}
        onClose={() => closeRow(rowMap, data?.item?.id)}
        onDelete={() => deleteRow(rowMap, data?.item?.id)}
      />
    );
  };
  const VisibleItem = (props: {data: any}) => {
    const {data} = props;
    console.log('data invisible item', data?.item?.title);
    return (
      <View style={styles.rowFront}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text
              style={{
                fontSize: 24,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                color: '#000',
                borderBottomColor: 'gray',
                marginHorizontal: 5,
              }}>
              {data?.item?.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  const renderItem = (data: any, rowMap: any) => {
    // console.log('visible data--', data);

    return <VisibleItem data={data} />;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TextInput
          value={text}
          placeholder={'Add Todo'}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Add" onPress={() => SubmitData()} />
      </View>
      {store.todos.length > 0 && (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.todomaintitle}>My Todos</Text>
          </View>
          {store.todos.map((data, index) => {
            // console.log('store data--'.data);
            return (
              // <View style={{flex: 1, marginTop: 5}}>
              <SwipeListView
                data={store.todos}
                disableRightSwipe={true}
                keyExtractor={item => item?.id}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItems}
                leftOpenValue={75}
                rightOpenValue={-120}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
            );
          })}
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  SafeAreaViewcontainer: {flex: 1, width: '100%'},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 55,
    marginTop: 10,
    backgroundColor: 'white',
  },
  swipcercell: {
    alignSelf: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 10,
  },
  swipeContentContainerStyle: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  listiem: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 10,
    width: '98%',
    paddingLeft: 10,
  },
  buttonsubmit: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonrow: {
    flexDirection: 'row',
    // top: 40,
  },
  todomaintitle: {fontSize: 20, fontWeight: 'bold', marginLeft: 10},
  container: {
    backgroundColor: 'white',
    flex: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
export default App;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
