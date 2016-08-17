import axios from 'axios'

const rootURL = 'http://localhost:3333/api'


export const FETCH_ORGANISMS = 'FETCH_ORGANISMS'
export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_CALENDAR = 'FETCH_CALENDAR'


export function fetchOrganisms() {

  const url = `${rootURL}/organismClass` 
  const request = axios.get(url);
  
  return {
    type: FETCH_ORGANISMS,
    payload: request
  }
}

export function fetchData(params) {
  
  const url = `${rootURL}/${params.virus}/${params.option}` 
  const request = axios.get(url);

    return {
    type: FETCH_DATA,
    payload: request
  }
}

export function fetchCalendar(params) {
  
  const url = `${rootURL}/calendar?startDate=${params.startDate}&endDate=${params.endDate}&option=${params.option}` 
  const request = axios.get(url);

    return {
    type: FETCH_CALENDAR,
    payload: request
  }
}