import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {default as CodePush, default as codePush} from 'react-native-code-push';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import store from './store/store';
const {width} = Dimensions.get('window');
const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};
const App = () => {
  const [tasks, setTasks] = useState<[] | any>();
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    CodePush.sync(
      {
        updateDialog: true,
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      syncWithCodePush,
    );
  }, []);
  const syncWithCodePush = (status: any) => {
    console.log('status of codepush', status);
  };
  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    store.getData();
    setTasks(store.todos);
    // setTasks(...store.todos);
  }, []);
  // console.log(first)
  console.log('store data', tasks);
  store.todos.map((item, index) => {
    console.log('-----------', item.title);
  });
  const addTask = (task: null) => {
    console.log('new task for adding==', task);
    if (task == null) return;
    store.addTodo(task);
    setTasks(store.todos);
    // setTasks([...tasks, task]);
    Keyboard.dismiss();
  };
  const editTask = (index: any, title: string) => {
    setModalVisible(true);
    setInputValue(title);
    console.log('index value for edit task', index, title);
  };
  const newToDo = (newTitle: string) => {
    console.log('new title', newTitle);
  };

  const deleteTask = (deleteIndex: any) => {
    Alert.alert('Delete', 'Are You Sure You Want to Delete this list', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
          store.deleteTodo(deleteIndex);
          setTasks(store.todos);
        },
      },
    ]);
    console.log('delete itemindex--', deleteIndex);
    // store.deleteTodo(deleteIndex);
    // setTasks(store.todos);
    // setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO LIST </Text>
      <ScrollView style={styles.scrollView}>
        {store.todos.map((task: {title: any; id: any}, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem
                index={index}
                task={task.title}
                deleteTask={() => deleteTask(task.id)}
                // editTask={() => editTask(task?.id, task?.title)}
              />
            </View>
          );
        })}
      </ScrollView>
      <TaskInputField addTask={addTask} />
      {/* {isModalVisible && (
        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Edit ToDo..."
                value={inputValue}
                style={styles.textInput}
                onChangeText={value => setInputValue(value)}
              />

              <Button title="Close" onPress={toggleModalVisibility} />
              <Button title="Edit" onPress={() => newToDo(inputValue)} />
            </View>
          </View>
        </Modal>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A6a',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 180,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
});
export default codePush(CODE_PUSH_OPTIONS)(App);
