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

  const sortObject = (o) => {
      let sorted = {},
      key, a = [];

      for (key in o) {
          if (o.hasOwnProperty(key)) {
              a.push(key);
          }
      }

      a.sort();

      for (key = 0; key < a.length; key++) {
          sorted[a[key]] = o[a[key]];
      }
      return sorted;
  }

  let sortedBacterial = sortObject(bacterialObj)
  let sortedViral = sortObject(viralObj)
  let sortedFungal = sortObject(fungalObj)
  
  const countOptions = (object) => {
    for (var name in object) {
      object[name].count = Object.keys(object[name]).length
    }
  }
  countOptions(sortedBacterial)
  countOptions(sortedViral)
  countOptions(sortedFungal)

  let bacterialData = []
  for(var i in sortedBacterial) {
    bacterialData.push(
      <tr>
        <td>{i}</td>,
        <td>{sortedBacterial[i].count}</td>
        <td>Bacterial</td>
      </tr>
     )
  }

  let viralData = []
  for(var i in sortedViral) {
    viralData.push(
      <tr>
        <td>{i}</td>,
        <td>{sortedViral[i].count}</td>
        <td>Viral</td>
      </tr>
     )
  }

  let fungalData = [];
  for(var i in sortedFungal) {
    fungalData.push(
      <tr>
        <td>{i}</td>,
        <td>{sortedFungal[i].count}</td>
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