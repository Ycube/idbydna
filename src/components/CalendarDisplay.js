import React from 'react'

const CalendarDiplay = (prop) => {
  
  // do some spread operator on porps
  console.log('props', prop)
  const option = 'Positive'

  return (
    <div>
      <table>
        <thead>
          <tr>
              <th data-field="id">Organism Name</th>
              <th data-field="name">Class</th>
              <th data-field="price">Count</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Metapneumovirus</td>
            <td>Viral</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Legionella pneumophila</td>
            <td>Bacterial</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Pneumocystis jirovecii</td>
            <td>Fungal</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default CalendarDiplay