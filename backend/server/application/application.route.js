const express = require("express");
const applicationCtrl = require("../application/application.controller");

// Middleware xác thực JWT (JSON Web Token)
const jwtAuth = require("../middleware/jwtAuth");

// Create a router object from Express
const router = express.Router();

// Get all applications , protected by JWT authentication
router.get("/", jwtAuth, applicationCtrl.getAllApplications);
router.get("/getUserApplications", jwtAuth, applicationCtrl.getApplicationsByUserId);
// Update the status of an applications, protected by JWT authentication
router.put("/:id", jwtAuth, applicationCtrl.updateStatusApplication);

module.exports = router;

