const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const { isValidObjectId } = require("mongoose");

ACCESS_TOKEN_SECRET =
  "f7184f99b71a947afe96623b9811e04c455955c734ec1e7ddb917734e03128f2126b101e60d61e4ad7245295178378bf44fbc1e4b57092ba0e82faa73a76379c";
REFRESH_TOKEN_SECRET =
  "577483a3db3cb3a929081fd36dfe4db69b9ef25d975bfc2da48377c840480b92b3303d6c8b17f849341f12db80fc10b529c821f16ce870cfda28d7d2b10ef289";

const verifyUsers = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({
          success: false,
          isAuthenticated: false,
          message: err.message,
        });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          req.user = user;
          return next();
        } else {
          return res.json({
            success: false,
            isAuthenticated: false,
            message: "user data not found from DB",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};
const verifyAdmins = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({
          success: false,
          isAuthenticated: false,
          message: err.message,
        });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user.isAdmin) {
          req.user = user;
          return next();
        } else {
          return res.json({
            success: false,
            isAuthenticated: false,
            message: "You are not authorized to delete this product!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};
const verifyId = (req, res, next) => {
  if (!isValidObjectId(req.body._id)) {
    return res.json("Invalid ID!");
  }
  next();
};
const userAuthentication = (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      success: false,
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({
          success: false,
          isAuthenticated: false,
          message: err.message,
        });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          return res.json({
            success: true,
            message: "user authenticated successfully",
            isAuthenticated: true,
            user: user,
          });
        } else {
          return res.json({
            success: false,
            isAuthenticated: false,
            message: "user data not found from DB",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};

module.exports = {
  verifyUsers,
  verifyAdmins,
  verifyId,
  userAuthentication,
};
