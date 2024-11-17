const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const {
  NotificationForOrder,
  NotificationForUser,
} = require("../models/notificationModel.js");
ACCESS_TOKEN_SECRET =
  "f7184f99b71a947afe96623b9811e04c455955c734ec1e7ddb917734e03128f2126b101e60d61e4ad7245295178378bf44fbc1e4b57092ba0e82faa73a76379c";
REFRESH_TOKEN_SECRET =
  "577483a3db3cb3a929081fd36dfe4db69b9ef25d975bfc2da48377c840480b92b3303d6c8b17f849341f12db80fc10b529c821f16ce870cfda28d7d2b10ef289";

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.json({ success: false, message: "All fields must be filled" });
      return;
    }
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Email is not valid" });
      return;
    }
    if (!validator.isStrongPassword(password)) {
      res.json({ success: false, message: "password is not strong" });
      return;
    }
    const exists = await User.findOne({ email });

    if (exists) {
      res.json({
        success: false,
        message: "You already have an account, please try to login",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hash });
    const findUserId = await User.findById({
      _id: user._id,
    });
    const accessToken = jwt.sign(
      { username: user.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );
    const newRegistered = await NotificationForUser.create({
      user: findUserId._id,
      message: "New user has been registered",
    });

    const io = req.app.get("socketio");
    io.emit("notification", {
      user: findUserId._id,
      message: "New user has been registered",
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({
      message: "Signup successful!",
      success: true,
      user: user,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Signup failed!",
      error: error.message,
    });
    console.log(error);
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json("All fields must be filled");
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.json("Email not found, please sign-up");
      return;
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          { username: user.username },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "3d",
          }
        );
        const refreshToken = jwt.sign(
          { username: user.username },
          REFRESH_TOKEN_SECRET,
          {
            expiresIn: "3d",
          }
        );

        res.cookie("token", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        return res.json({
          message: "Login successful!",
          success: true,
          user: user,
          token: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.json("Incorrect password");
        return;
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Login failed!", error: error.message });
    console.log(error);
  }
};

const logout_user = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expries: new Date(0),
  });
  return res.json({
    success: true,
    message: "Logout successful!",
  });
};

const userVerification = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({ isAuthenticated: false, message: err.message });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          return res.json({
            isAuthenticated: true,
            username: data.username,
            message: "Dashboard access authorized!",
          });
        } else {
          return res.json({
            isAuthenticated: false,
            message: "user data not found from DB",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};

const getUserProfile = async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({ isAuthenticated: false, message: err.message });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          return res.json({
            isAuthenticated: true,
            username: user.username,
            email: user.email,
            ID: user._id,
          });
        } else {
          return res.json({
            isAuthenticated: false,
            message: "You are not authorized to access user profile!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};

const updateUserProfile = async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({ isAuthenticated: false, message: err.message });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          if (req.body.username) {
            user.username = req.body.username;
          }
          if (req.body.email) {
            user.email = req.body.email;
          }
          if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            user.password = hash;
          }
          const updatedUser = await user.save();
          const accessToken = jwt.sign(
            { username: user.username },
            ACCESS_TOKEN_SECRET,
            {
              expiresIn: "3d",
            }
          );
          const refreshToken = jwt.sign(
            { username: user.username },
            REFRESH_TOKEN_SECRET,
            {
              expiresIn: "3d",
            }
          );

          res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          return res.json({
            message: "Profile updated successfully!",
            username: updatedUser.username,
            email: updatedUser.email,
            ID: updatedUser._id,
            isAdmin: updatedUser.isAdmin,
            token: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          return res.json({
            isAuthenticated: false,
            message: "Profile updated failed!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};
const getAllUsersByAdmin = async (req, res) => {
  try {
    const fetchAllUsers = await User.find({});
    if (fetchAllUsers) {
      return res.json({
        success: true,
        message: "All users fetched successfully!",
        fetchAllUsers: fetchAllUsers,
      });
    } else {
      res.status(404);
      throw new Error("No users found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Error while fetching users: ${error.message}`,
    });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const userToBeDeleted = await User.findByIdAndDelete({
      _id: req.params._id,
    });
    if (userToBeDeleted) {
      return res.json({
        success: true,
        message: "user deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Error while deleting user: ${error.message}`,
    });
    console.log("Error while deleting user:", error);
  }
};
const updateUserByIdByAdmin = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const userToBeUpdated = await User.findById({
      _id: req.params._id,
    });
    if (userToBeUpdated) {
      if (req.body.username) {
        userToBeUpdated.username = req.body.username;
      }
      if (req.body.email) {
        userToBeUpdated.email = req.body.email;
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        userToBeUpdated.password = hash;
      }
      const updatedUser = await userToBeUpdated.save();
      return res.json({
        message: "User updated successfully!",
        updatedUser: updatedUser,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Error while updating user ${error.message}`,
    });
    console.log("Error while updating user:", error);
  }
};

// const getOneUserByAdmin = async (req, res) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     console.log("Token was not found from cookies");
//     return res.json({
//       isAuthenticated: false,
//       message: "Token was not found from cookies",
//     });
//   }

//   const [bearer, token] = authHeader.split(" ");

//   if (bearer !== "Bearer" || !token) {
//     return res.json({
//       isAuthenticated: false,
//       message: "Invalid token format!",
//     });
//   }

//   try {
//     jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
//       if (err) {
//         console.log("Error during JWT token verification:", err);
//         return res.json({ isAuthenticated: false, message: err.message });
//       } else {
//         const user = await User.findOne({ username: data.username });

//         if (user.isAdmin) {
//           const ID = req.body._id
//           const fetchOneUser = await User.findById(ID).select("-password");
//           return res.json({
//             success: true,
//             message:"A user fetched successfully!",
//             fetchOneUser: fetchOneUser,
//           });
//         } else {
//           return res.json({
//             isAuthenticated: false,
//             message: "You are not authorized to access users data!",
//           });
//         }
//       }
//     });
//   } catch (error) {
//     res.json({
//       isAuthenticated: false,
//       message: "catch error from JWT verification middleware!",
//     });
//     console.log("Error during JWT token verification:", error);
//   }
// };

const verifyUsers = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Token was not found from cookies");
    return res.json({
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({ isAuthenticated: false, message: err.message });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user) {
          return next();
        } else {
          return res.json({
            isAuthenticated: false,
            message: "user data not found from DB",
          });
        }
      }
    });
  } catch (error) {
    res.json({
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
      isAuthenticated: false,
      message: "Token was not found from cookies",
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.json({
      isAuthenticated: false,
      message: "Invalid token format!",
    });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        console.log("Error during JWT token verification:", err);
        return res.json({ isAuthenticated: false, message: err.message });
      } else {
        const user = await User.findOne({ username: data.username });
        if (user.isAdmin) {
          return next();
        } else {
          return res.json({
            isAuthenticated: false,
            message: "user data not found from DB",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      isAuthenticated: false,
      message: "catch error from JWT verification middleware!",
    });
    console.log("Error during JWT token verification:", error);
  }
};

const getOneUserByAdmin = async (req, res) => {
  const ID = req.body._id;
  if (!ID) {
    return res.json("ID is required!");
  }
  const fetchOneUser = await User.findById(ID).select("-password");
  if (fetchOneUser) {
    return res.json({
      success: true,
      message: "A user fetched successfully!",
      fetchOneUser: fetchOneUser,
    });
  } else {
    return res.json("user doesn't exist!");
  }
};

module.exports = {
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
};
