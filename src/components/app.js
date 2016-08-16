import React, { Component } from 'react'

import OrganismsForm from './OrganismsForm'
import Calendar from './Calendar'


//TODO: Implement React Router
export default class App extends Component {
  render() {
    return (
      <div>
        <div> <OrganismsForm /> </div>
        <div> <Calendar /> </div>
      </div>
    );
  }
}
