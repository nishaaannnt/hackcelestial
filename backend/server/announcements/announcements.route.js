const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const announcementController = require("./announcements.controller");

const router = express.Router();

router.post("/", jwtAuth, announcementController.createAnnouncements);
router.delete("/:id", jwtAuth, announcementController.deleteAnnouncements);
router.get("/", jwtAuth, announcementController.getAnnouncements);
router.put("/:id", jwtAuth, announcementController.updateAnnouncements);

module.exports = router;