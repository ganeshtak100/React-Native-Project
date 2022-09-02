import {combineReducers, createStore} from 'redux';
import ListReducer from './reducers/listReducer';
import MidListReducer from './reducers/midListReducer';

const rootReducer = combineReducers({
  ListReducer,
  MidListReducer,
});

export const store = createStore(rootReducer);
