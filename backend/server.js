const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./server/middleware/passportConfig");
const cors = require("cors");
require("dotenv").config();
const expressWinston = require('express-winston');
const winston = require('winston');
const { handleError } = require("./server/helpers/errorHandler");
const initRouter = require("./server/routes");

const app = express();
const port = 8000;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
  ]
});

// this is for logging 
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false, // optional: log meta data about the request (default: true)
  msg: "HTTP {{req.method}} {{req.url}} {{req.statusCode}} {{req.responseTime}}ms {{req.ip}}", // optional: customize the logging message
  // expressFormat: true, // optional: use the default Express/morgan format
  colorize: false, // optional: colorize the log output
}));
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://shsasane22:Jilbh3mRvo1I56Z2@cluster0.98t0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// Create an Express application, set port for server

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Initialize routes
initRouter(app);

app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
