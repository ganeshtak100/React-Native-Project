import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import FirstReducer from '../reducer';
import mySaga from '../sagas';

const sageMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({FirstReducer});
const store = createStore(rootReducer, applyMiddleware(sageMiddleware));

sageMiddleware.run(mySaga);
export default store;
