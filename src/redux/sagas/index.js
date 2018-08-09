import { all, takeEvery, call, put } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from 'axios';











function* postItem(action){
  try{
    console.log('in post saga', action.payload);
    
    yield call (axios.post, '/api/shelf', action.payload)
    // yield put ({
    //   type: 'GET_ITEM',  
    // })
  } catch(error){
    console.log(error);
  }
}



export default function* rootSaga() {
  yield takeEvery('POST_ITEM', postItem )
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

