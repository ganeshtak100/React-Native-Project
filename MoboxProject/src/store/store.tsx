import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, computed, makeObservable, observable} from 'mobx';
class TodoStore {
  idForTodo = 3;

  todos = [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: false,
    },
  ];
  constructor() {
    makeObservable(this, {
      todos: observable,
      idForTodo: observable,
      getData: action,
      addTodo: action,
      deleteTodo: action,
      todosCompletedCount: computed,
    });
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('TODOS');
    if (value !== null) {
      this.todos = JSON.parse(value);
      return this.todos;
    }
  };
  addTodo = async (todoInput: string) => {
    console.log('tofoinput', todoInput);
    this.todos.push({
      id: this.idForTodo,
      title: todoInput.trim(),
      completed: false,
    });
    await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos));
    this.idForTodo++;
  };

  deleteTodo = async (id: number) => {
    const index = this.todos.findIndex(item => item.id === id);
    this.todos.splice(index, 1);
    await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos));
  };

  get todosCompletedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
}

const store = new TodoStore();
export default store;
