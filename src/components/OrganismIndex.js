import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';;
import axios from 'axios';
import { fetchOrganisms } from '../actions/index'

export class Organisms extends Component{

  componentWillMount(){
    this.props.fetchOrganisms();
  }

  render() {
    console.log('PROPS: ',this.props)
    return(
      <div>Hello from OrganismsIndex</div>
    );
  }

}

function mapStateToProps({ organisms }) {
  return { organisms }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOrganisms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Organisms)