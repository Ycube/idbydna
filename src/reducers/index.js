import { combineReducers } from 'redux';
import Reducer from './reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  organisms: Reducer,
  form: formReducer 
});

export default rootReducer;
