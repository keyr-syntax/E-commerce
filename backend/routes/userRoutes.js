const express = require("express");
const router = express.Router();
const {
  createUser,
  login_user,
  logout_user,
  userVerification,
  getAllUsersByAdmin,
  getUserProfile,
  updateUserProfile,
  deleteUserByAdmin,
  getOneUserByAdmin,
  updateUserByIdByAdmin,
} = require("../controllers/userController.js");
const {
  verifyUsers,
  verifyAdmins,
  verifyId,
  userAuthentication,
} = require("../middleware/verificationMiddleware.js");

router.post("/userauthentication", userAuthentication);
router.post("/signup", createUser);
router.post("/login", login_user);
router.post("/logout", logout_user);
router.get("/dashboard", userVerification);
router.get("/profile", getUserProfile);
router.put("/update", updateUserProfile);
router.get("/getoneuser", verifyAdmins, getOneUserByAdmin);
router.get("/getallusers", verifyAdmins, getAllUsersByAdmin);
router.delete("/deleteuser/:_id", verifyAdmins, deleteUserByAdmin);
router.put("/updatebyid/:_id", verifyAdmins, updateUserByIdByAdmin);

module.exports = router;
