const Product = require("../models/productModel.js");
const cloudinary = require("./cloudinary.js");
const User = require("../models/userModel.js");

const {
  verifyUsers,
  verifyAdmins,
  verifyId,
} = require("../middleware/verificationMiddleware.js");

// pass!
const createProductByAdmin = async (req, res) => {
  const { name, brand, price, category, image } = req.body;

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const newProduct = await Product.create({
      name,
      brand,
      price,
      category,
      image: result.secure_url,
      // image: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
    });

    if (newProduct) {
      console.log(newProduct);
      return res.json({
        success: true,
        message: "Product created successfully!",
        newProduct: newProduct,
      });
    } else {
      return res.json({ success: false, message: "Product not created!" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while creating product:",
      error: error.message,
    });
  }
};
// pass!
const getAllProducts = async (req, res) => {
  try {
    const fetchAllProducts = await Product.find({});

    if (fetchAllProducts) {
      return res.json({
        success: true,
        message: "All products fetched successfully!",
        allProducts: fetchAllProducts,
      });
    } else {
      return res.json("Failed to fetch products!");
    }
  } catch (error) {
    console.log("Error while fetching products:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// pass!
const updateProductByAdmin = async (req, res) => {
  const ID = req.params._id;
  const { name, image, brand, category, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      ID,
      { name, image, brand, category, price },
      {
        new: true,
      }
    );
    if (updatedProduct) {
      return res.json({
        success: true,
        message: "Product updated successfully!",
        updatedProduct: updatedProduct,
      });
    } else {
      return res.json("Product update failed!");
    }
  } catch (error) {
    res.json({
      message: "Error while updating product:",
      error: error.message,
    });
  }
};
// pass!
const deleteProductByAdmin = async (req, res) => {
  const _id = req.params._id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(_id);
    if (deleteProduct) {
      return res.json({
        success: true,
        message: "Product deleted successfully!",
      });
    } else {
      return res.json("Failed to delete product!");
    }
  } catch (error) {
    console.log("Error while deleting product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// pass!
const getProductByKeyword = async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;
    const keyword = req.params.keyword
      ? {
          name: {
            $regex: req.params.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      success: true,
      message: "Products fetched successfully!",
      products: products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page * pageSize < count,
    });
  } catch (error) {
    console.log("Error while fetching product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// pass!
const getProductByCategory = async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;
    const category = req.params.category
      ? {
          category: {
            $regex: req.params.category,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...category });
    const productByCategory = await Product.find({ ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      success: true,
      message: "Products fetched successfully!",
      category: productByCategory,
      count: count,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page * pageSize < count,
    });
  } catch (error) {
    console.log("Error while fetching product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
//pass!
const getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({}).sort({ createdAt: -1 });
    if (newProducts) {
      return res.json({
        message: "New products fetched successfully!",
        newProducts: newProducts,
      });
    } else {
      return res.json("Failed to fetch products");
    }
  } catch (error) {
    console.log("Error while fetching products:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// pass!
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ rating: -1 });
    if (topProducts) {
      return res.json({
        success: true,
        message: "Top products fetched successfully!",
        topProducts: topProducts,
      });
    } else {
      return res.json("Failed to fetch products");
    }
  } catch (error) {
    console.log("Error while fetching product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// The following controllers will be added in the future!
const getProductById = async (req, res) => {
  if (!req.params._id) {
    return res.json("Product id is required!");
  }
  try {
    const productById = await Product.findById({ _id: req.params._id });
    if (productById) {
      return res.json({
        success: true,
        message: "Product fetched successfully!",
        product: productById,
      });
    } else {
      return res.json("Failed to fetch product!");
    }
  } catch (error) {
    console.log("Error while fetching product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    const filteredProducts = await Product.find(args);

    if (filteredProducts) {
      return res.json({
        message: "Products filtered successfully!",
        products: filteredProducts,
      });
    } else {
      return res.json("Failed to filter products!");
    }
  } catch (error) {
    console.log("Error while filtering products:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const _id = req.params._id;
    const userId = req.user._id;
    const productToBeReviewed = await Product.findById(_id);

    if (productToBeReviewed) {
      const alreadyReviewed = productToBeReviewed.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.json("Product already reviewed!");
      }

      const productReview = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      productToBeReviewed.reviews.push(productReview);
      productToBeReviewed.numReviews = productToBeReviewed.reviews.length;
      productToBeReviewed.rating =
        productToBeReviewed.reviews.reduce(
          (acc, item) => item.rating + acc,
          0
        ) / productToBeReviewed.reviews.length;
      await productToBeReviewed.save();

      return res.json({
        message: "Product reviewed successfuly!",
        yourRating: productToBeReviewed.reviews.rating,
        totalRating: productToBeReviewed.rating,
        comment: productToBeReviewed.reviews.comment,
      });
    } else {
      return res.json("Product not found!");
    }
  } catch (error) {
    console.log("Error while reviewing product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
const reviewProducts = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const findProductForComment = await Product.findById({
      _id: req.params._id,
    });

    if (findProductForComment) {
      const isReviewed = findProductForComment.comments.find(
        (comment) => comment.userID.toString() === req.user._id.toString()
      );
      if (isReviewed) {
        return res.json({
          success: false,
          message: "You have reviewed the product",
          comment: isReviewed.comment,
          rating: isReviewed.rating,
        });
      }

      const newComment = {
        userID: req.user._id,
        username: req.user.username,
        email: req.user.email,
        comment: comment,
        rating: rating,
        createdAt: new Date(),
      };
      findProductForComment.comments.push(newComment);
      findProductForComment.numReviews = findProductForComment.comments.length;
      findProductForComment.rating =
        findProductForComment.comments.reduce(
          (acc, item) => acc + item.rating,
          0
        ) / findProductForComment.comments.length;

      const productReviewedandRated = await findProductForComment.save();
      return res.json({
        success: true,
        message: "Comment added successully",
        comment: productReviewedandRated,
      });
    } else {
      return res.json({
        success: false,
        message: "Product or user not found",
      });
    }
  } catch (error) {
    console.log("Error while adding comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
