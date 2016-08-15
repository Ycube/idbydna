import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import Select from 'react-select';
import { fetchOrganisms } from '../actions/index'

export class Organisms extends Component {
  constructor(props) {
    super(props);

    this.state = { virus: '', option: 'Positive' }
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

    console.log('You have selected:', this.state)
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
    const clicked = () => {
      console.log('clicked')
    }
    return(
      <div>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <Select
              value={this.state.virus}
              options={virusArr}
              onChange={this.handleChange.bind(this)}
          />
          
            <input 
              type="radio"
              value="positive"
              checked={this.state.option === "positive"}
              onChange={this.handleOptionChange.bind(this, 'positive')}
            /> 
            <label>Positive</label>
          

            <input 
              type="radio"
              value="negative"
              checked={this.state.option === "negative"}
              onChange={this.handleOptionChange.bind(this, 'negative')}
            /> 
            <label>Negative</label>

            <button className="btn btn-default" type="submit">Save</button>

        </form>

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