const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Category = require("../models/categoryModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
// Pass
const createCategoryByAdmin = async (req, res) => {
  const category = req.body.category;
  if (!category) {
    return res.json({ message: "Category name is required!" });
  }
  try {
    const category = req.body.category;
    const categoryExists = await Category.findOne({ category: category });
    if (categoryExists) {
      return res.json({ message: "Category already exists!" });
    } else {
      const newCategory = await Category.create({ category: category });
      if (newCategory) {
        return res.json({
          success: true,
          message: "Category created successfully!",
          newCategory: newCategory,
        });
        console.log(newCategory);
      } else {
        return res.json({ message: "Category not created!" });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};
// pass
const listAllCategory = async (req, res) => {
  try {
    const fetchAllCategory = await Category.find({});
    if (fetchAllCategory) {
      return res.json({
        success: true,
        message: "All categories fetched successfully!",
        fetchAllCategory: fetchAllCategory,
      });
    }
  } catch (error) {
    console.log("Error whie fetching category", error.message);
  }
};
// pass
const updateCategoryByAdmin = async (req, res) => {
  try {
    const ID = req.params._id;
    const category = req.body.category;
    const categoryToBeUpdated = await Category.findByIdAndUpdate(
      ID,
      { category },
      {
        new: true,
      }
    );

    if (categoryToBeUpdated) {
      return res.json({
        success: true,
        message: "Category updated successfully!",
        updatedCategory: categoryToBeUpdated,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log("Error while updating category", error.message);
  }
};
// pass
const deleteCategoryByAdmin = async (req, res) => {
  try {
    const ID = req.params._id;
    const categoryToBeDeleted = await Category.findById(ID);

    if (!categoryToBeDeleted) {
      return res.json("Category doesnot exist!");
    }
    const deletedCategory = await Category.findByIdAndDelete({ _id: ID });

    if (deletedCategory) {
      return res.json({
        success: true,
        message: "Category deleted successfully!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log("Error while deleting category", error.message);
  }
};
const fetchCategoryById = async (req, res) => {
  try {
    const ID = req.params._id;
    const findCategoryById = await Category.findById(ID);
    if (findCategoryById) {
      res.json({
        success: true,
        message: "Category fetched successfully!",
        category: findCategoryById,
      });
    } else {
      res.json({
        success: false,
        message: "Category doesnot exist!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log("Error while fetching category", error.message);
  }
};

const fetchOneCategory = async (req, res) => {
  try {
    const fetchOneCategory = await Category.findOne({
      category: req.body.category,
    });
    if (fetchOneCategory) {
      return res.json({
        message: "All categories fetched successfully!",
        category: fetchOneCategory,
      });
    }
  } catch (error) {}
};

module.exports = {
  createCategoryByAdmin,
  updateCategoryByAdmin,
  deleteCategoryByAdmin,
  listAllCategory,
  fetchOneCategory,
  fetchCategoryById,
};
