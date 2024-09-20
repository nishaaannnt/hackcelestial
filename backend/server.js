const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./server/middleware/passportConfig");
const cors = require("cors");
require("dotenv").config();
const { handleError } = require("./server/helpers/errorHandler");
const initRouter = require("./server/routes");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://shsasane22:Jilbh3mRvo1I56Z2@cluster0.98t0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// Create an Express application, set port for server
const app = express();
const port = 8000;

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
