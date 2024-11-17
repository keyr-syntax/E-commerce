const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchemaForOrder = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
const notificationSchemaForUser = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const NotificationForOrder = mongoose.model(
  "NotificationForOrder",
  notificationSchemaForOrder
);
const NotificationForUser = mongoose.model(
  "NotificationForUser",
  notificationSchemaForUser
);

module.exports = {
  NotificationForOrder,
  NotificationForUser,
};
