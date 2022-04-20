import { combineReducers } from 'redux';
import feedback from './snackbar.reducer';
import userData from './userdata.reducer';

const reducers = combineReducers({
  feedback,
  userData,
});

export default reducers;
