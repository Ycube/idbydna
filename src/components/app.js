import React, { Component } from 'react';


import Organisms from './OrganismIndex';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>React simple starter</div>
        <div> <Organisms /> </div>
      </div>
    );
  }
}
