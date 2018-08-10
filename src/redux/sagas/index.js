import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';

export default function* rootSaga() {
  yield takeEvery('POST_ITEM', postItem)
  yield takeEvery('DELETE_ITEM', deleteItem)
  yield takeEvery('GET_LIST', fetchList)
  yield takeEvery('GET_USERS', getUsers)
  yield takeEvery('UPDATE_ITEM', updateItem)
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

function* updateItem(action) {
  console.log('sage update', action.payload, action.id)
  try {
    yield call(axios.put, `/api/shelf/${action.id}`, action.payload);
    // yield dispatch({
    //   type: 'GET_LIST'
    // })
  } catch (err) {
    yield console.log(err);

  }
}

function* deleteItem(action) {
  console.log('deleteItem', action.payload);

  try {
    yield call(axios.delete, `/api/shelf/${action.payload}`);
    yield dispatch({
      type: 'GET_LIST'
    })
  } catch (err) {
    yield console.log(err);

  }
}

function* fetchList() {
  try {
    console.log('fectchlist');

    const listResponse = yield call(axios.get, '/api/shelf')
    yield dispatch({
      type: 'GET_ITEM',
      payload: listResponse.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* postItem(action) {
  try {
    console.log('in post saga', action.payload);

    yield call(axios.post, '/api/shelf', action.payload)
    // yield put ({
    //   type: 'GET_ITEM',  
    // })
  } catch (error) {
    console.log(error);
  }
}
function* getUsers() {
  try {
    console.log('made it to GET users');
    const userInfo = yield call(axios.get, '/api/shelf/count')
    yield dispatch({
      type: 'GET_USER_INFO',
      payload: userInfo.data
    })

  } catch (error) {
    console.log(error);

  }

}
