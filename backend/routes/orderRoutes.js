const express = require("express");

const {
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
} = require("../controllers/orderController.js");
const router = express.Router();

const {
  verifyUsers,
  verifyAdmins,
} = require("../middleware/verificationMiddleware.js");
router.post("/testorder", verifyUsers, calculateTotalOrderPrice);
router.post("/createorder", verifyUsers, createOrder);
router.get("/", verifyUsers, testRoute);
router.get("/fetchallorders", verifyAdmins, fetchAllOrders);
router.get("/fetchorderforoneuser", verifyUsers, fetchOrderForOneUser);
router.get("/totalorders", verifyAdmins, countTotalOrders);
router.get("/totalsales", verifyAdmins, totalSales);
router.get("/salesbydate", verifyAdmins, totalSalesByDate);
router.get("/salesbyweek", verifyAdmins, totalSalesByWeek);
router.get("/salesbymonth", verifyAdmins, totalSalesByMonth);
router.get("/salesbyyear", verifyAdmins, totalSalesByYear);
router.get("/ordersbydate", verifyAdmins, totalOrdersByDate);
router.get("/orderbyid/:_id", verifyAdmins, findOrderDetailsById);
router.put(
  "/changeorderstatustopaid/:_id",
  verifyAdmins,
  changeOrderStatusToPaid
);
router.put(
  "/changeorderstatustodelivered/:_id",
  verifyAdmins,
  changeOrderStatusToDelivered
);
router.put(
  "/reversepaymentstatustounpaid/:_id",
  verifyAdmins,
  reversePaymentStatusToUnpaid
);
router.put(
  "/reversedeliverystatustonotdelivered/:_id",
  verifyAdmins,
  reverseDeliveryStatusToNotDelivered
);
router.delete("/deleteorderbyadmin/:_id", verifyAdmins, deleteOrdersByAdmin);

module.exports = router;
