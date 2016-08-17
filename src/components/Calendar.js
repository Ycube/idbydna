import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Calendar from 'rc-calendar'
import axios from 'axios';
import moment from 'moment';
import enUS from 'rc-calendar/lib/locale/en_US';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import { fetchCalendar } from '../actions/index'
import OrganismsForm from './OrganismsForm'
import DisplayWindow from './DisplayWindow'

const format = 'MM-YYYY';
const now = moment()
now.locale('en-gb').utcOffset(0)
const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

export class CalendarPicker extends Component {
    constructor(props) {
    super(props)

    this.state = { 
      startValue: null,
      endValue: null,
      option : ''
    }
    this.onChange = this.onChange.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  onChange(modifier) {
    return (value) => {
      this.setState({
        [modifier]: value
      });
    }
  }

  handleOptionChange(changeEvent) {
    this.setState({
      option: changeEvent
    })
  }

  // handleFormSubmit(event) {
  //   event.preventDefault()

  //   this.props.fetchCalendar(this.state)
  //     .then( (data) => {
  //       this.setState({ results: data.payload.data })
  //       }
  //     )
  // }

  render() {
    const state = this.state;
    const calendar = (<MonthCalendar
      locale={enUS}
      style={{ zIndex: 1000 }}
    />);   
    return (

      <div>   
        <h2> Calendar "Page" </h2>
        <form>
        {/*<form onSubmit={this.handleFormSubmit(this)}>*/}
          <div>


            {/*Calendar*/}
            <div className='col md-4' style={{
              boxSizing: 'border-box',
              position: 'relative',
              display: 'block',
              lineHeight: 1.5,
              marginBottom: 22,
            }}>
              <DatePicker
                animation="slide-up"
                calendar={calendar}
                value={state.startValue}
                onChange={this.onChange('startValue')}
              >
                {
                  ({ value }) => {
                    return (<input
                      style={{ width: 200 }}
                      readOnly
                      value={value && value.format(format)}
                      placeholder="Start Date"
                    />)
                  }
                }
              </DatePicker>

              <DatePicker
                animation="slide-up"
                calendar={calendar}
                value={state.endValue}
                onChange={this.onChange('endValue')}
              >
                {
                  ({ value }) => {
                    return (<input
                      style={{ width: 200 }}
                      readOnly
                      value={value && value.format(format)}
                      placeholder="End Date"
                    />)
                  }
                }

              </DatePicker>
            </div>

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

          </div>

          <button className="btn btn-default" type="submit">Submit</button>
        </form>


        <DisplayWindow props={this.state} />
      </div>
    )
  }

}

function mapStateToProps({ calendar }) {
  return { calendar }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCalendar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPicker)