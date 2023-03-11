const mysql = require("mysql");

let _db = null;

let connection;

function connect(url) {
  connection = mysql.createConnection(url);
  connection.connect();
  connection.query;
  _db = connection;
  if (_db !== null) {
    return Promise.resolve(_db);
  }
}

function handleDisconnect(url) {
  connection = mysql.createConnection(url);

  connection.connect(function (err) {
    console.log("Error when connecting to DB:::: " + JSON.stringify(err));
    setTimeout(handleDisconnect, 2000);
  });

  connection.on("error", function (err) {
    console.log("Error inside Handle Disconnect::: " + JSON.stringify(err));
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

module.exports = {
  connect,
  handleDisconnect,
  connection: { db: () => _db },
};

mysql
  .connect(process.env.MYSQL_URL)
  .then(() => app.listen(port, "127.0.0.1"))
  .then(() =>
    console.log(`Node server is running and listening on port: ${port}`)
  )
  .catch((err) => {
    console.error("MySQL Error :: " + JSON.stringify(err));
    // mysql.handleDisconnect(process.env.MYSQL_URL)
    process.exit(1);
  });
