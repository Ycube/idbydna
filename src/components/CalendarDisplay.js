import React from 'react'

const CalendarDiplay = (props) => {
  
  // console.log(props.data.results)
  if(!props.data.results){
    return (
      <div>
        <h5>Input Dates</h5>
      </div>
    )
  }

  const bacterialObj = props.data.results.Bacterial
  const viralObj = props.data.results.Viral
  const fungalObj = props.data.results.Fungal

  const countOptions = (object) => {
    for (var name in object) {
      object[name].count = Object.keys(object[name]).length
    }
  }
  countOptions(bacterialObj)
  countOptions(viralObj)
  countOptions(fungalObj)

  let bacterialData = []
  for(var i in bacterialObj) {
    bacterialData.push(
      <tr>
        <td>{i}</td>,
        <td>{bacterialObj[i].count}</td>
        <td>Bacterial</td>
      </tr>
     )
  }

  let viralData = []
  for(var i in viralObj) {
    viralData.push(
      <tr>
        <td>{i}</td>,
        <td>{viralObj[i].count}</td>
        <td>Viral</td>
      </tr>
     )
  }

  let fungalData = [];
  for(var i in fungalObj) {
    fungalData.push(
      <tr>
        <td>{i}</td>,
        <td>{fungalObj[i].count}</td>
        <td>Fungal</td>
      </tr>
     )
  }  

  return (
    <div>
      <table>
        <thead>
          <tr>
              <th data-field="id">Organism Name</th>
              <th data-field="price"># of {props.data.option}</th>
              <th data-field="name">Class</th>
          </tr>
        </thead>

        <tbody>
          {viralData}          
          {bacterialData}
          {fungalData}
        </tbody>
      </table>

    </div>
  )
}

export default CalendarDiplay