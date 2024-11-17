const express = require("express");
const router = express.Router();

const {
  verifyUsers,
  verifyAdmins,
  verifyId,
} = require("../middleware/verificationMiddleware.js");
const formidable = require("express-formidable");
const {
  createProductByAdmin,
  updateProductByAdmin,
  getAllProducts,
  deleteProductByAdmin,
  getProductByKeyword,
  getProductById,
  addProductReview,
  getTopProducts,
  getNewProducts,
  filterProducts,
  getProductByCategory,
  reviewProducts,
} = require("../controllers/productController.js");

router.get("/fetchallproducts", getAllProducts);
router.get("/fetchproductbykeyword/:keyword", getProductByKeyword);
router.get("/fetchproductbycategory/:category", getProductByCategory);
router.get("/fetchproductbyid/:_id", getProductById);
router.get("/fetchtopproducts", getTopProducts);
router.get("/fetchnewproducts", getNewProducts);
router.get("/filterproducts", filterProducts);
router.post("/createproduct", createProductByAdmin);
router.put("/updateproduct/:_id", updateProductByAdmin);
router.delete("/deleteproduct/:_id", deleteProductByAdmin);
router.post("/review/:_id", verifyUsers, addProductReview);
router.post("/addcomment/:_id", verifyUsers, reviewProducts);

module.exports = router;
