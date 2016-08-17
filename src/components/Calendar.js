import 'rc-calendar/assets/index.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import axios from 'axios';

import Calendar from 'rc-calendar'
import moment from 'moment';
import enUS from 'rc-calendar/lib/locale/en_US';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import { fetchCalendar } from '../actions/index'
import OrganismsForm from './OrganismsForm'
import CalendarDisplay from './CalendarDisplay'

const format = 'MM-YYYY';
const now = moment()
now.locale('en-gb').utcOffset(0)
const defaultCalendarValue = now.clone()
// defaultCalendarValue.add(-1, 'month')
defaultCalendarValue.add(-1, 'year')

export class CalendarPicker extends Component {
    constructor(props) {
    super(props)

    this.state = { 
      startDate: null,
      endDate: null,
      option : ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(e) {
    e.preventDefault()
    const params = {
      startDate: this.state.startDate.format(format),
      endDate: this.state.startDate.format(format),
      option: this.state.option
    };

    this.props.fetchCalendar(params)
      .then( (data) => {
        this.setState({ results: data.payload.data })
        }
      )
  }

  render() {
    const state = this.state;
    const calendar = (
      <MonthCalendar
        locale={enUS}
        style={{ zIndex: 1000 }}
        defaultValue={defaultCalendarValue}
      />
    );   

    return (

      <div>  
        <button className="btn btn-default #e3f2fd blue lighten-5"> 
          <Link to='/'>Back to Home</Link>
        </button>

        <form onSubmit={this.handleFormSubmit}>
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
                value={state.startDate}
                onChange={this.onChange('startDate')}
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
                value={state.endDate}
                onChange={this.onChange('endDate')}
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

        <CalendarDisplay data={this.state}/>
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