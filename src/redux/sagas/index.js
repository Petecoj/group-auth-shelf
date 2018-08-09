import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import { takeEvery, call, put as dispatch } from '../../../node_modules/redux-saga/effects/'
import axios from '../../../node_modules/axios';


export default function* rootSaga() {
  yield  takeEvery('GET_LIST',fetchList)
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

function* fetchList(){
  try{
    console.log('fectchlist');
    
    const listResponse = yield call(axios.get, '/api/shelf')
    yield dispatch({
      type:'GET_ITEM',
      payload: listResponse.data
    })
  }catch(err){
    yield console.log(err);
  }
}
