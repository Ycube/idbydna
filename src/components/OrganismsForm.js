import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router';

import { fetchOrganisms, fetchData } from '../actions/index'
import DisplayWindow from './DisplayWindow'
import OptionButton from './OptionButton'

export class Organisms extends Component {
  constructor(props) {
    super(props);

    this.state = { virus: '', option: '' }
  }

  componentWillMount(){
    this.props.fetchOrganisms()
  }

  handleChange() {
    this.setState({virus: event.target.innerText})
  }

  handleOptionChange(changeEvent) {
    this.setState({
      option: changeEvent
    })
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault()

    this.props.fetchData(this.state)
      .then( (data) => {
        this.setState({ results: data.payload.data })
        }
      )
  }

  render() {
    // console.log('PROPS: ',this.props)

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
        <Link to="calendar" className="btn btn-primary">
          Find By Calendar
        </Link>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <Select
              value={this.state.virus}
              options={virusArr}
              onChange={this.handleChange.bind(this)}
          />
          
            <input 
              type="radio"
              value="Positive"
              id="Positive"
              checked={this.state.option === "Positive"}
              onChange={this.handleOptionChange.bind(this, 'Positive')}
            />
            <label htmlFor="Positive">Positive</label>
         
            <input 
              type="radio"
              value="Negative"
              id="Negative"
              checked={this.state.option === "Negative"}
              onChange={this.handleOptionChange.bind(this, 'Negative')}
            /> 
            <label htmlFor="Negative">Negative</label>

            <button className="btn btn-default" type="submit">Submit</button>
        </form>
        
        <div> <DisplayWindow props={this.state} /> </div>

      </div>
    );
  }

}

function mapStateToProps({ organisms }) {
  return { organisms }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOrganisms,fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Organisms)