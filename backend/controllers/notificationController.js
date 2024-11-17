const Order = require("../models/orderModel.js");
const {
  NotificationForOrder,
  NotificationForUser,
} = require("../models/notificationModel.js");

const fetchNotificationForNewOrder = async (req, res) => {
  try {
    const allNotificationsForNewOrder = await NotificationForOrder.find({})
      .populate("user", "_id, username")
      .sort({
        createdAt: -1,
      });
    const allNotificationsForNewUserRegistration =
      await NotificationForUser.find({})
        .populate("user", "_id, username")
        .sort({
          createdAt: -1,
        });

    if (allNotificationsForNewOrder && allNotificationsForNewUserRegistration) {
      return res.json({
        success: true,
        message: "All notifications for order fetched successfully",
        allNotificationsForNewOrder: allNotificationsForNewOrder,
        allNotificationsForNewUserRegistration:
          allNotificationsForNewUserRegistration,
      });
    } else {
      res.status(404);
      throw new Error("No notifications for order found");
    }
  } catch (error) {
    console.log(
      `Error while fetching notification for new order: ${error.message}`
    );
  }
};
const markNotificationAsSeen = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findMessage = await NotificationForOrder.findById({
      _id: req.params._id,
    });
    if (findMessage) {
      findMessage.read = true;
      const messageMarkedAsSeen = await findMessage.save();

      return res.json({
        success: true,
        message: "Notification marked as seen successfully",
        messageMarkedAsSeen: messageMarkedAsSeen,
      });
    } else {
      res.status(404);
      throw new Error("Notification not found");
    }
  } catch (error) {
    console.log("Error while marking notification as seen", error);
  }
};
const markUserAsSeen = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findUserById = await NotificationForUser.findById({
      _id: req.params._id,
    });
    if (findUserById) {
      findUserById.read = true;
      const userMarkedAsSeen = await findUserById.save();
      return res.json({
        success: true,
        message: "user marked as seen",
        userMarkedAsSeen: userMarkedAsSeen,
      });
    } else {
      res.status(404);
      throw new Error("User notification not found");
    }
  } catch (error) {
    console.log("Error while marking user as seen", error);
  }
};

module.exports = {
  fetchNotificationForNewOrder,
  markNotificationAsSeen,
  markUserAsSeen,
};
