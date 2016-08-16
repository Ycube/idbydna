const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('dnaDB')

export default function(router) {
  
  router.get('/api/organismClass', (req, res) => {

    db.serialize( () => {
      db.all('SELECT * FROM organismClass', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
        }
      })
    })
  })

  router.get('/api/testOrganisms', (req, res) => {

    db.serialize( () => {
      db.all('SELECT * FROM testOrganisms', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
        }
      })
    })
  })

  router.get('/api/testResults', (req, res) => {

    db.serialize( () => {
      db.all('SELECT * FROM testResults', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
        }
      })
    })
  })

  router.get('/api/:organism/:option', (req, res) => {
    let organism = req.params.organism
    let option =  req.params.option
    let query = `SELECT Test_Result FROM testOrganisms where Test_Organism="${organism}"`
    db.serialize( () => {
      db.all(query, (err, data) => {
        if (err) {
          console.log('ERROR: ', err)
        } else {
          let testResultsQuery = []
          data.forEach((el) => { 
            query = `SELECT Sample_ID, Test_Name, Test_Month, Test_Year from testResults where ${el.Test_Result}="${option}"`
            testResultsQuery.push(query) 
            console.log(testResultsQuery)
          })
          db.serialize( () => {
            let result = []
            testResultsQuery.forEach((el)=> {
              db.all(el, (err, data) => {
                if (err) {
                  console.log('ERROR: ', err)
                } else {
                  console.log('DATA: ', data)
                  result.push(data);
                }
              })
            })
            res.send(result);
          })
        }
       })
    })
  })
}