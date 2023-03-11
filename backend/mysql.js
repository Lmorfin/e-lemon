const mysql = require("mysql");

let _db = null;

function connect(url) {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "lemonbase",
    password: "",
  });

  _db = pool;
  if (_db !== null) {
    return Promise.resolve(_db);
  }
}

module.exports = {
  connect,
  connection: { db: () => _db },
};
