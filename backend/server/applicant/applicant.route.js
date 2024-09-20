const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const userCtrl = require("../user/user.controller");

const router = express.Router();

router.get("/", jwtAuth, userCtrl.getAList);

module.exports = router;