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
      });
    });
  })
}