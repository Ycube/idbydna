import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import Select from 'react-select';
import { fetchOrganisms } from '../actions/index'

export class Organisms extends Component {
  constructor(props) {
    super(props);

    this.state = { virus: '' }
  }

  componentWillMount(){
    this.props.fetchOrganisms()
  }

  handleChange() {
    console.log('Selected: ', event.target.value)
    this.setState({virus: event.target.value})
  }

  render() {
    console.log('PROPS: ',this.props)

    const virus = (obj) => {
      var storage = [];
      for (var key in obj) {
        if (obj[key].Test_Organism) {
          storage.push({value: obj[key].Test_Organism, label: obj[key].Test_Organism})  
        }
      }
      return storage
    }
    
    let virusArr = virus(this.props.organisms)

    return(
      <div>
        <Select
            value={this.value}
            options={virusArr}
            onChange={this.handleChange.bind(this)}
        />

      </div>
    );
  }

}

function mapStateToProps({ organisms }) {
  return { organisms }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOrganisms }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Organisms)