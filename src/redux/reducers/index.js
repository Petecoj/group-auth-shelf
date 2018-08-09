import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';


const itemList = (state = [], action) => {
  switch (action.type) {
    case 'GET_LIST':
      return state
    case 'POST_ITEM':
      return [...state, action.payload]
    default:
      return state;
  }
};

const store = combineReducers({
  user,
  login,
  itemList
});

export default store;
