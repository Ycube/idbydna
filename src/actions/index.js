import axios from 'axios';

const rootURL = 'http://localhost:3333/api';


export const FETCH_ORGANISMS = 'FETCH_ORGANISMS';
export const FETCH_DATA = 'FETCH_DATA';


export function fetchOrganisms() {

  const url = `${rootURL}/organismClass` 
  const request = axios.get(url);
  
  return {
    type: FETCH_ORGANISMS,
    payload: request
  }
}

export function fetchData(params) {
  console.log('Params: ', params)
  const url = `${rootURL}/${params.virus}/${params.option}` 
  const request = axios.get(url);

    return {
    type: FETCH_DATA,
    payload: request
  }
}