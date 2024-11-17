const express = require("express");

const router = express.Router();
const {
  fetchNotificationForNewOrder,
  markNotificationAsSeen,
  markUserAsSeen,
} = require("../controllers/notificationController.js");
const { verifyAdmins } = require("../middleware/verificationMiddleware.js");

router.get(
  "/allordernotifications",

  fetchNotificationForNewOrder
);
router.put("/markmessageasseen/:_id", verifyAdmins, markNotificationAsSeen);
router.put("/markuserasseen/:_id", verifyAdmins, markUserAsSeen);
module.exports = router;
