const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('idbyDNA');

db.serialize(function() {
  
});

// db.close();
module.exports = db;