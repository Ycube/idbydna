import { FETCH_ORGANISMS } from '../actions';

const initialState = {

};

export default function(state = initialState, action){
  switch (action.type) {
    case FETCH_ORGANISMS : 
      return Object.assign({}, {...state, ...action.payload.data })
      }
  return state;
}