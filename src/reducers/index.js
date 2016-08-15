import { combineReducers } from 'redux';
import Reducer from './reducer';

const rootReducer = combineReducers({
  organisms: Reducer
});

export default rootReducer;
