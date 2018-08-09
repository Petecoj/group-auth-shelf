import { all, takeEvery, call, put as dispatch} from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';





export default function* rootSaga() {
  yield takeEvery('POST_ITEM', postItem )
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
