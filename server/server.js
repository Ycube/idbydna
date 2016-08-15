const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dnaDB');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.set('port', PORT)
app.use(allowCrossDomain);

app.get('/api/organismClass', (req, res) => {

  db.serialize( () => {
    db.all('SELECT * FROM organismClass', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });
});

app.listen(PORT);
console.log('App listening on port: ', PORT);