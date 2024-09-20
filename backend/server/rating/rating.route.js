const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const ratingCtrl = require("./rating.controller");

const router = express.Router();

router.put("/", jwtAuth, ratingCtrl.addRating);
router.get("/", jwtAuth, ratingCtrl.getPersonalRating);

module.exports = router;
