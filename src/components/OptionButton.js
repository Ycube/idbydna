import React from 'react'

const OptionButton = (props) => {
  return (
    <div>
      <input 
        type="radio"
        value="Positive"
        checked={props.option}
        id={props.value}
      /> 
      <label htmlFor={props.value}> {props.value} </label>
    </div>
  )
}

export default OptionButton