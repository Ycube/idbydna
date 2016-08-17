import Promise from 'bluebird'
import { includes, omitBy, merge, assign } from 'lodash'
import uuid from 'node-uuid'

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
    console.log('in routes')
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
            console.log("RESULT: ",result)
            //TODO: refactor to promise
            setTimeout(() => {res.send(result)}, 1000);
          })
        }
       })
    })
  })

  router.get('/api/calendar', (req, res) => {
    let [startMonth, startYear] = req.query.startDate.split('-');
    let [endMonth, endYear] = req.query.endDate.split('-');
    let option = req.query.option;
    let oppositeOption = option === 'Positive' ? 'Negative' : 'Positive';

    let query = `select * from testResults where CAST(Test_Month AS INT) between ${startMonth} and ${endMonth} AND CAST(Test_Year AS INT) between ${startYear} and ${endYear};`;

    db.serialize( () => {
      db.all(query, (err, data) => {
        if (err) {
          console.log('ERROR: ', err)
        } else {
          let newData = data.filter((row) => includes(row, option))
              .map( (row) => omitBy(row, (val) => val.length === 0 || val === oppositeOption))

          let testOrgQuery = `select organismClass.Organism_Class, testOrganisms.Test_Organism from testOrganisms inner join organismClass where testOrganisms.Test_Organism = organismClass.Test_Organism;`;

          db.all(testOrgQuery, (err, organisms) => {
            const returnData = newData.reduce( (prev, curr) => {
              const info = Object.keys(curr).reduce(
                (previous, currentKey) => {
                  if (currentKey.includes('result')) {
                    const index = Number(currentKey.split('_')[1]) - 1;
                    const {Organism_Class, Test_Organism} = organisms[index];

                    const newCount = previous[Organism_Class] && Test_Organism in previous[Organism_Class]
                      ? assign({}, previous[Organism_Class][Test_Organism], {
                        [uuid.v4()]: curr['Sample_ID']
                      })
                      : { [uuid.v4()]: curr['Sample_ID'] };

                    return assign({}, previous, {
                      [Organism_Class]: assign({}, previous[Organism_Class], {
                        [Test_Organism]: newCount
                      })
                    });
                  } else {
                    return previous;
                  }
                }, {}
              )
              return merge({}, prev, info);
            }, {});
            res.json(returnData);
          })
        }
      })
    })
  })
}