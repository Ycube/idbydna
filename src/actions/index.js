import axios from 'axios';

const rootURL = 'http://localhost:3333/api/organismClass';


export const FETCH_ORGANISMS = 'FETCH_ORGANISMS';


export function fetchOrganisms() {

  const url = `${rootURL}` 
  const request = axios.get(url);
  
  return {
    type: FETCH_ORGANISMS,
    payload: request
  }
}