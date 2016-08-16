import React from 'react'

const DisplayWindow = (props) => {

  const virus = props.props.virus
  const option = props.props.option
  const results = props.props.results
  let result = [];
  const flatten = (array) => {
    const results = []
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        results.push(array[i][j])
      }
    }
    return results
  }
  let trData = [];
  if (results) {
    result = flatten(results)
    console.log(result)
    result.map((obj) => {
      trData.push(
        <tr>
          <td>{obj.Sample_ID}</td>
          <td>{obj.Test_Name}</td>
          <td>{obj.Test_Month}</td>
          <td>{obj.Test_Year}</td>
        </tr>
      )      
    })

  }

  //no data comes back
  if (result.length === 0) {
    return (
      <div>
        <span>{virus}</span>
          <br />
        <span>{option}</span>
      </div>
    )
  }

    return (
    <div>
      <div>{virus}</div>
      <div>{option}</div>

      <table>
        <thead>
          <tr>
              <th data-field="id">Sample ID</th>
              <th data-field="name">Item Name</th>
              <th data-field="price">Month</th>
              <th data-field="price">Year</th>
          </tr>
        </thead>

        <tbody>
          {trData}
        </tbody>
      </table>

    </div>
  )
}

export default DisplayWindow