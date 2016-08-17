import { FETCH_ORGANISMS, FETCH_DATA, FETCH_CALENDAR } from '../actions';

const initialState = {
}

export default function(state = initialState, action){
  switch (action.type) {
    case FETCH_ORGANISMS : 
      return Object.assign({}, {...state, ...action.payload.data })
      
    case FETCH_DATA:
      return Object.assign({}, {...state, ...action.payload.data })
    }

  return state;
}