import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SHELF" actions
function* fetchShelf() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };


    const response = yield axios.get('/api/shelf', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* addItem(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
    yield axios.post('/api/shelf', action.payload, config)
    yield put ({type: 'FETCH_SHELF'})
  } catch (error) {
    console.log("inside of addItem error", error);
  }
}

function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('ADD_ITEM', addItem);
}


export default shelfSaga;
