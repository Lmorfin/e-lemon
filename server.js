const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = require("./backend/routes");
const mysql = require("./backend/mysql");
const cookieParser = require("cookie-parser");

// initialize dotenv
dotenv.config();

// set our port
const port = process.env.PORT || 8082;
app.use(cookieParser());

// get all data/stuff of the body (POST) parameters
// parse application/jsonock
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8085",
    "http://localhost:3001",
  ];
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  //res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Cookie, x-access-token, OP-USER-TOKEN"
  );
  next();
});

// register routes
app.use(router);

mysql
  .connect()
  .then(() => app.listen(port, "127.0.0.1"))
  .then(() =>
    console.log(`Node server is running and listening on port: ${port}`)
  )
  .catch((err) => {
    console.error("MySQL Error :: " + JSON.stringify(err));
    process.exit(1);
  })
  .catch((err2) => {});
