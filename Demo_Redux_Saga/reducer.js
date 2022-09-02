import {GET_USERS_SUCCESS} from './types';

export default FirstReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {...state, users: action.users};
    default:
      return state;
  }
};
