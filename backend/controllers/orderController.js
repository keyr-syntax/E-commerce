const Order = require("../models/orderModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const {
  createNotificationForNewOrder,
} = require("./notificationController.js");
const { NotificationForOrder } = require("../models/notificationModel.js");

function calculatePrice(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };
}
const calculateTotalOrderPrice = async (req, res) => {
  try {
    const findUser = await User.findById({ _id: req.user._id });

    const { orderItems } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.json({
        success: false,
        message: "No order Items",
      });
    }

    const itemsFromDatabase = await Product.find({
      _id: {
        $in: orderItems.map((item) => item._id),
      },
    });
    const databaseOrderItems = orderItems.map((itemFromUser) => {
      const matchOrderItems = itemsFromDatabase.find(
        (itemFromDatabase) =>
          itemFromDatabase._id.toString() === itemFromUser._id
      );

      if (!matchOrderItems) {
        res.status(404);
        throw new Error(`This Item is not found:${itemFromUser._id}`);
      }
      return {
        success: true,
        ...itemFromUser,
        productID: itemFromUser._id,
        price: matchOrderItems.price,
      };
    });

    const { itemsPrice, taxPrice, totalPrice, shippingPrice } =
      calculatePrice(databaseOrderItems);

    const order = new Order({
      user: findUser,
      orderItems: databaseOrderItems,
      shippingPrice: shippingPrice,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });

    const createdOrder = await order.save();
    // Logic to save Notification for new order is written below
    const orderId = createdOrder._id;
    const user = findUser._id;
    const message = "You have new order";
    const newOrderNotification = await NotificationForOrder.create({
      orderId,
      user,
      message,
    });
    const io = req.app.get("socketio");
    io.emit("notification", {
      user: user,
      message: message,
      orderId: orderId,
      newOrderNotification: newOrderNotification,
    });

    return res.json({
      success: true,
      message: "Order created successfully",
      createdOrder: createdOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.json({
        success: false,
        message: "No order Items",
      });
    }

    const itemsFromDatabase = await Product.find({
      _id: {
        $in: orderItems.map((item) => item._id),
      },
    });
    const databaseOrderItems = orderItems.map((itemFromUser) => {
      const matchOrderItems = itemsFromDatabase.find(
        (itemFromDatabase) =>
          itemFromDatabase._id.toString() === itemFromUser._id
      );

      if (!matchOrderItems) {
        res.status(404);
        throw new Error(`This Item is not found:${itemFromUser._id}`);
      }
      return {
        success: true,
        ...itemFromUser,
        productID: itemFromUser._id,
        price: matchOrderItems.price,
      };
    });

    const { itemsPrice, taxPrice, totalPrice, shippingPrice } =
      calculatePrice(databaseOrderItems);

    const order = new Order({
      user: req.user._id,
      orderItems: databaseOrderItems,
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
      shippingPrice: shippingPrice,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });

    const createdOrder = await order.save();

    return res.json({
      success: true,
      message: "Order created successfully",
      createdOrder: createdOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({}).populate(
      "user",
      "_id username email"
    );

    if (allOrders) {
      return res.json({
        success: true,
        message: "All orders fetched successfully",
        allOrders: allOrders,
      });
    } else {
      res.status(404);
      throw new Error("No orders found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const fetchOrderForOneUser = async (req, res) => {
  try {
    const orderForOneUser = await Order.find({
      user: req.user._id,
    }).populate("user", "_id username email");

    if (!orderForOneUser) {
      res.status(404);
      throw new Error("No orders found");
    } else {
      return res.json({
        success: true,
        orderForOneUser: orderForOneUser,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const testRoute = async (req, res) => {
  const verifiedUser = await User.findById(req.user._id);
  res.json({
    success: true,
    verifiedUser: verifiedUser,
  });
};
const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    if (!totalOrders) {
      res.status(404);
      throw new Error("No orders found");
    } else {
      return res.json({
        success: true,
        message: "Orders counted successfully",
        totalOrders: totalOrders,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalSales = async (req, res) => {
  try {
    const totalOrders = await Order.find();
    const paidOrders = totalOrders.filter((paid) => paid.isPaid === true);
    const totalSales = paidOrders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );
    if (!totalSales) {
      res.status(404);
      throw new Error("can't get total sales");
    } else {
      return res.json({
        success: true,
        message: "Total sales fetched successfully",
        totalSales: totalSales,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalSalesByDate = async (req, res) => {
  try {
    const fetchSalesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$paidAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const sortedSalesByDate = fetchSalesByDate.sort(
      (a, b) => new Date(a._id) - new Date(b._id)
    );

    if (!fetchSalesByDate) {
      res.status(404);
      throw new Error("can't get sales by date");
    } else {
      return res.json({
        success: true,
        message: "Total sales by date fetched successfully",
        fetchSalesByDate: sortedSalesByDate,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalSalesByWeek = async (req, res) => {
  try {
    const fetchSalesByWeek = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%U",
              date: "$paidAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const sortedSalesByWeek = fetchSalesByWeek.sort(
      (a, b) => new Date(a._id) - new Date(b._id)
    );

    if (!fetchSalesByWeek) {
      res.status(404);
      throw new Error("can't get sales by week");
    } else {
      return res.json({
        success: true,
        message: "Total sales by week fetched successfully",
        fetchSalesByWeek: sortedSalesByWeek,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalSalesByMonth = async (req, res) => {
  try {
    const fetchSalesByMonth = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$paidAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const sortedSalesByMonth = fetchSalesByMonth.sort(
      (a, b) => new Date(a._id) - new Date(b._id)
    );

    if (!fetchSalesByMonth) {
      res.status(404);
      throw new Error("can't get sales by month");
    } else {
      return res.json({
        success: true,
        message: "Total sales by month fetched successfully",
        fetchSalesByMonth: sortedSalesByMonth,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalSalesByYear = async (req, res) => {
  try {
    const fetchSalesByYear = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y",
              date: "$paidAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const sortedSalesByYear = fetchSalesByYear.sort(
      (a, b) => new Date(a._id) - new Date(b._id)
    );

    if (!fetchSalesByYear) {
      res.status(404);
      throw new Error("can't get sales by year");
    } else {
      return res.json({
        success: true,
        message: "Total sales by year fetched successfully",
        fetchSalesByYear: sortedSalesByYear,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const totalOrdersByDate = async (req, res) => {
  try {
    const fetchOrdersByDate = await Order.aggregate([
      {
        $match: {
          orderItems: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const sortedOrdersByDate = fetchOrdersByDate.sort(
      (a, b) => new Date(a._id) - new Date(b._id)
    );

    if (!sortedOrdersByDate) {
      res.status(404);
      throw new Error("can't get Orders by date");
    } else {
      // console.log("Orders by date check from backend", fetchOrdersByDate);
      return res.json({
        success: true,
        message: "Total Orders by date fetched successfully",
        OrdersByDate: sortedOrdersByDate,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const findOrderDetailsById = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const orderById = await Order.findById({ _id: req.params._id }).populate(
      "user",
      "username email"
    );
    if (orderById) {
      return res.json({
        success: true,
        message: "Order fetched successfully",
        orderById: orderById,
      });
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const changeOrderStatusToPaid = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const fetchOrderById = await Order.findById({
      _id: req.params._id,
    }).populate("user", "username email");
    if (fetchOrderById) {
      fetchOrderById.isPaid = true;
      fetchOrderById.paidAt = Date.now();
      // fetchOrderById.paymentResult = {
      //   ID: req.body.ID,
      //   status: req.body.status,
      //   update_time: req.body.update_time,
      //   email_address: req.body.email_address,
      // };
      const orderStatusChangedToPaid = await fetchOrderById.save();
      return res.json({
        success: true,
        message: "order status changed to paid",
        orderStatusChangedToPaid: orderStatusChangedToPaid,
      });
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const changeOrderStatusToDelivered = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const fetchOrderById = await Order.findById({
      _id: req.params._id,
    }).populate("user", "username email");

    if (fetchOrderById) {
      fetchOrderById.isDelivered = true;
      fetchOrderById.deliveredAt = Date.now();
      const orderDelivered = await fetchOrderById.save();

      return res.json({
        success: true,
        message: "order status changed to delivered",
        orderDelivered: orderDelivered,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const reversePaymentStatusToUnpaid = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findOrderById = await Order.findById({
      _id: req.params._id,
    }).populate("user", "username email");

    if (findOrderById) {
      findOrderById.isPaid = false;
      findOrderById.paidAt = null;
      const reversedPaymentStatus = await findOrderById.save();

      return res.json({
        success: true,
        message: "Payment status updated successfully",
        reversedPaymentStatus: reversedPaymentStatus,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const reverseDeliveryStatusToNotDelivered = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findOrderById = await Order.findById({
      _id: req.params._id,
    }).populate("user", "username email");

    if (findOrderById) {
      findOrderById.isDelivered = false;
      findOrderById.deliveredAt = null;
      const reversedDeliveryStatus = await findOrderById.save();
      return res.json({
        success: true,
        message: "Delivery status updated successfully",
        reversedDeliveryStatus: reversedDeliveryStatus,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const deleteOrdersByAdmin = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const deleteOrderByAdmin = await Order.findByIdAndDelete({
      _id: req.params._id,
    });
    if (deleteOrderByAdmin) {
      return res.json({
        success: true,
        message: "order deleted successfully",
        deleteOrderByAdmin: deleteOrderByAdmin,
      });
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  testRoute,
  fetchAllOrders,
  fetchOrderForOneUser,
  countTotalOrders,
  totalSales,
  totalSalesByDate,
  findOrderDetailsById,
  changeOrderStatusToPaid,
  changeOrderStatusToDelivered,
  calculateTotalOrderPrice,
  reversePaymentStatusToUnpaid,
  reverseDeliveryStatusToNotDelivered,
  deleteOrdersByAdmin,
  totalOrdersByDate,
  totalSalesByWeek,
  totalSalesByMonth,
  totalSalesByYear,
};
