import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_USERS, GET_USERS_SUCCESS} from './types';

async function usersFetch() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // console.log('rersponse=', res);
  return await res.json();
}

function* getUsersFetch() {
  const users = yield call(usersFetch);
  yield put({type: GET_USERS_SUCCESS, users});
}

function* mySaga() {
  yield takeLatest(GET_USERS, getUsersFetch);
}
export default mySaga;
