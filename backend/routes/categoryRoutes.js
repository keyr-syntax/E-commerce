const express = require("express");
const router = express.Router();
const {
  createCategoryByAdmin,
  updateCategoryByAdmin,
  deleteCategoryByAdmin,
  listAllCategory,
  fetchOneCategory,
  fetchCategoryById,
} = require("../controllers/categoryController.js");
const {
  verifyUsers,
  verifyAdmins,
  verifyId,
} = require("../middleware/verificationMiddleware.js");

router.post("/createcategory", createCategoryByAdmin);
router.put("/updatecategory/:_id", updateCategoryByAdmin);
router.delete("/deletecategory/:_id", deleteCategoryByAdmin);
router.get("/listallcategory", listAllCategory);
router.get("/fetchonecategory", fetchOneCategory);
router.get("/fetchcategorybyid/:_id", fetchCategoryById);

module.exports = router;
