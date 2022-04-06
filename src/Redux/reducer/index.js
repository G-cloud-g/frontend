import { combineReducers } from 'redux';
import feedback from './snackbar.reducer';

const reducers = combineReducers({
  feedback: feedback,
});

export default reducers;
