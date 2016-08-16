import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Calendar from 'rc-calendar'
import axios from 'axios';
import moment from 'moment';
import enUS from 'rc-calendar/lib/locale/en_US';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import { fetchOrganisms, fetchData } from '../actions/index'
import OrganismsForm from './OrganismsForm'

const format = 'YYYY-MM';
const now = moment()
now.locale('en-gb').utcOffset(0)
const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

export class CalendarPicker extends Component {
    constructor(props) {
    super(props)

    this.state = { 
      startValue: this.props.defaultValue,
      endValue: this.props.defaultValue 
    }

    this.onChangeStart = this.onChangeStart.bind(this)
    this.onChangeEnd = this.onChangeEnd.bind(this)
  }

  onChangeStart(startValue) {
    console.log(`DatePicker change: ${startValue && startValue.format(format)}`)
    this.setState({
      startValue
    })
  }
  
  onChangeEnd(endValue) {
    console.log(`DatePicker change: ${endValue && endValue.format(format)}`)
    this.setState({
      endValue
    })
  }
  render() {
    const state = this.state;
    const calendar = (<MonthCalendar
      locale={enUS}
      // style={{ zIndex: 1000 }}
    />);   
    return (
      <div style={{ width: 240, margin: 20 }}>
        <OrganismsForm />
        <div style={{
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
            onChange={this.onChangeStart}
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
            onChange={this.onChangeEnd}
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
    </div>
    )
  }

}

function mapStateToProps({ calendar }) {
  return { calendar }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOrganisms,fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPicker)