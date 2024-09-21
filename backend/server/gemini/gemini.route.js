const express = require("express");
const { getGeminiResponse } = require('./gemini.controller')
const router = express.Router()
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname,"../../store/gemini"));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage: storage}).single("img");

router.route("/").post(upload, getGeminiResponse)

module.exports = router