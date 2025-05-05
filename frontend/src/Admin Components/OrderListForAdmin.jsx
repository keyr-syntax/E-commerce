import Table from "react-bootstrap/Table";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import { FcPaid } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./OrderListForAdmin.css";
function OrderListForAdmin() {
  const {
    allOrders,
    orderDetails,
    confirmDelete,
    setConfirmDelete,
    API_URL,
    fetchAllOrdersForAdmin,
    setOrderDetails,
    fetchTotalSalesByAdmin,
  } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [_id, setId] = useState("");
  const [key, setKey] = useState("All Orders");

  const handleClose = () => setShow(false);

  const markAsPaid = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/changeorderstatustopaid/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Payment status changed to Paid");
        fetchAllOrdersForAdmin();
        setOrderDetails(response.orderStatusChangedToPaid);
      }
    } catch (error) {
      console.log("Error while marking as paid", error.message);
    }
  };
  const markAsDelivered = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/changeorderstatustodelivered/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Delivery status changed to Delivered");
        fetchAllOrdersForAdmin();
        setOrderDetails(response.orderDelivered);
      }
    } catch (error) {
      console.log("Error while marking as delivered", error.message);
    }
  };
  const reversePaymentStatusToUnpaid = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/reversepaymentstatustounpaid/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const response = await data.json();
      if (response.success) {
        toast.success("Payment status changed to Pending");
        fetchAllOrdersForAdmin();
        setOrderDetails(response.reversedPaymentStatus);
      }
    } catch (error) {
      console.log("Error while reversing payment status", error.message);
    }
  };
  const reverseDeliveryStatusToNotDelivered = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/reversedeliverystatustonotdelivered/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Delivery status changed to Pending");
        fetchAllOrdersForAdmin();
        setOrderDetails(response.reversedDeliveryStatus);
      }
    } catch (error) {
      console.log("Error while reversing delivery status", error.message);
    }
  };
  const deleteOrdersByAdmin = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/deleteorderbyadmin/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success === true) {
        toast.success("Order deleted successfully");
        setConfirmDelete(false);
        fetchAllOrdersForAdmin();
        fetchTotalSalesByAdmin();
        // navigate("/admin/order");
      }
    } catch (error) {
      console.log("Error while deleting orders", error.message);
    }
  };

  {
    confirmDelete === true && show === false && deleteOrdersByAdmin(_id);
  }

  return (
    <>
      <Tabs
        defaultActiveKey="All Orders"
        id="justify-tab-example"
        style={{ margin: "80px auto 5px auto", width: "85%" }}
        justify
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab
          style={{ textWrap: "nowrap" }}
          eventKey="All Orders"
          title="All Orders"
        >
          {allOrders && allOrders.length > 0 ? (
            <>
              {" "}
              <Table
                striped
                responsive
                style={{ width: "85%", margin: "5px auto 200px auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                    <th>Order ID</th>
                    <th>Customer name</th>
                    <th>Order Date/Time</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(
                    (order) =>
                      order &&
                      order.user &&
                      order.user.username &&
                      order.orderItems &&
                      order.totalPrice && (
                        <tr
                          style={{ textAlign: "center", textWrap: "nowrap" }}
                          key={order._id}
                        >
                          <td>ORD-{order._id.toString().slice(4, 8)}</td>
                          <td>
                            <img
                              className="img-for-allorders"
                              // src={order.user.image.url}
                              alt={order.user.username}
                            />
                            {order.user.username}
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Paid <FcPaid size={20} />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Delivered <IoHome />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            <Dropdown drop="down-centered" autoClose="outside">
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "purple",
                                  border: "none",
                                }}
                                id="dropdown-basic"
                              >
                                Manage Order
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="">
                                  See Order Details
                                </Dropdown.Item>
                                {orderDetails.isPaid === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reversePaymentStatusToUnpaid(order._id);
                                    }}
                                  >
                                    Mark as Unpaid
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsPaid(order._id);
                                    }}
                                  >
                                    Mark as Paid
                                  </Dropdown.Item>
                                )}
                                {orderDetails.isDelivered === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reverseDeliveryStatusToNotDelivered(
                                        order._id
                                      );
                                    }}
                                  >
                                    Mark as Undelivered
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsDelivered(order._id);
                                    }}
                                  >
                                    Mark as Delivered
                                  </Dropdown.Item>
                                )}
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                    setId(order._id);
                                  }}
                                >
                                  Delete Order
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <p
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                margin: " 200px auto",
                display: "block",
                textAlign: "center",
                padding: "30px",
                fontSize: "25px",
                width: "80vw",
                borderRadius: "8px",
              }}
            >
              No Orders Available
            </p>
          )}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
              Are You Sure You want to delete this Order?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setShow(false);
                }}
              >
                Yes
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  setConfirmDelete(false);
                  setShow(false);
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab
          style={{ textWrap: "nowrap" }}
          eventKey="Payment Pending"
          title="Payment Pending"
        >
          {allOrders && allOrders.length > 0 ? (
            <>
              {" "}
              <Table
                striped
                responsive
                style={{ width: "85%", margin: "5px auto 200px auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                    <th>Order ID</th>
                    <th>Customer name</th>
                    <th>Order Date/Time</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(
                    (order) =>
                      order &&
                      order.user &&
                      order.user.username &&
                      order.orderItems &&
                      order.totalPrice &&
                      order.isPaid === false && (
                        <tr
                          style={{ textAlign: "center", textWrap: "nowrap" }}
                          key={order._id}
                        >
                          <td>ORD-{order._id.toString().slice(4, 8)}</td>
                          <td>
                            <img
                              className="img-for-allorders"
                              // src={order.user.image.url}
                              alt={order.user.username}
                            />
                            {order.user.username}
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Paid <FcPaid size={20} />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Delivered <IoHome />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            <Dropdown
                              drop="down-centered"
                              id="dropdown-autoclose-inside"
                            >
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "purple",
                                  border: "none",
                                }}
                              >
                                Manage Order
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="">
                                  See Order Details
                                </Dropdown.Item>
                                {orderDetails.isPaid === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reversePaymentStatusToUnpaid(order._id);
                                    }}
                                  >
                                    Mark as Unpaid
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsPaid(order._id);
                                    }}
                                  >
                                    Mark as Paid
                                  </Dropdown.Item>
                                )}
                                {orderDetails.isDelivered === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reverseDeliveryStatusToNotDelivered(
                                        order._id
                                      );
                                    }}
                                  >
                                    Mark as Undelivered
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsDelivered(order._id);
                                    }}
                                  >
                                    Mark as Delivered
                                  </Dropdown.Item>
                                )}
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                    setId(order._id);
                                  }}
                                >
                                  Delete Order
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <p
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                margin: " 200px auto",
                display: "block",
                textAlign: "center",
                padding: "30px",
                fontSize: "25px",
                width: "80vw",
                borderRadius: "8px",
              }}
            >
              No Orders Available
            </p>
          )}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
              Are You Sure You want to delete this Order?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setShow(false);
                }}
              >
                Yes
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  setConfirmDelete(false);
                  setShow(false);
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab style={{ textWrap: "nowrap" }} eventKey="Paid" title="Paid">
          {allOrders && allOrders.length > 0 ? (
            <>
              {" "}
              <Table
                striped
                responsive
                style={{ width: "85%", margin: "5px auto 200px auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                    <th>Order ID</th>
                    <th>Customer name</th>
                    <th>Order Date/Time</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(
                    (order) =>
                      order &&
                      order.user &&
                      order.user.username &&
                      order.orderItems &&
                      order.totalPrice &&
                      order.isPaid === true && (
                        <tr
                          style={{ textAlign: "center", textWrap: "nowrap" }}
                          key={order._id}
                        >
                          <td>ORD-{order._id.toString().slice(4, 8)}</td>
                          <td>
                            <img
                              className="img-for-allorders"
                              // src={order.user.image.url}
                              alt={order.user.username}
                            />
                            {order.user.username}
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Paid <FcPaid size={20} />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Delivered <IoHome />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            <Dropdown drop="down-centered" autoClose="outside">
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "purple",
                                  border: "none",
                                }}
                                id="dropdown-basic"
                              >
                                Manage Order
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="">
                                  See Order Details
                                </Dropdown.Item>
                                {orderDetails.isPaid === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reversePaymentStatusToUnpaid(order._id);
                                    }}
                                  >
                                    Mark as Unpaid
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsPaid(order._id);
                                    }}
                                  >
                                    Mark as Paid
                                  </Dropdown.Item>
                                )}
                                {orderDetails.isDelivered === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reverseDeliveryStatusToNotDelivered(
                                        order._id
                                      );
                                    }}
                                  >
                                    Mark as Undelivered
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsDelivered(order._id);
                                    }}
                                  >
                                    Mark as Delivered
                                  </Dropdown.Item>
                                )}
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                    setId(order._id);
                                  }}
                                >
                                  Delete Order
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <p
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                margin: " 200px auto",
                display: "block",
                textAlign: "center",
                padding: "30px",
                fontSize: "25px",
                width: "80vw",
                borderRadius: "8px",
              }}
            >
              No Orders Available
            </p>
          )}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
              Are You Sure You want to delete this Order?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setShow(false);
                }}
              >
                Yes
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  setConfirmDelete(false);
                  setShow(false);
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab
          style={{ textWrap: "nowrap" }}
          eventKey="Delivery Pending"
          title="Delivery Pending"
        >
          {allOrders && allOrders.length > 0 ? (
            <>
              {" "}
              <Table
                striped
                responsive
                style={{ width: "85%", margin: "5px auto 200px auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                    <th>Order ID</th>
                    <th>Customer name</th>
                    <th>Order Date/Time</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(
                    (order) =>
                      order &&
                      order.user &&
                      order.user.username &&
                      order.orderItems &&
                      order.totalPrice &&
                      order.isDelivered === false && (
                        <tr
                          style={{ textAlign: "center", textWrap: "nowrap" }}
                          key={order._id}
                        >
                          <td>ORD-{order._id.toString().slice(4, 8)}</td>
                          <td>
                            <img
                              className="img-for-allorders"
                              // src={order.user.image.url}
                              alt={order.user.username}
                            />
                            {order.user.username}
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Paid <FcPaid size={20} />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Delivered <IoHome />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            <Dropdown drop="down-centered" autoClose="outside">
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "purple",
                                  border: "none",
                                }}
                                id="dropdown-basic"
                              >
                                Manage Order
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="">
                                  See Order Details
                                </Dropdown.Item>
                                {orderDetails.isPaid === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reversePaymentStatusToUnpaid(order._id);
                                    }}
                                  >
                                    Mark as Unpaid
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsPaid(order._id);
                                    }}
                                  >
                                    Mark as Paid
                                  </Dropdown.Item>
                                )}
                                {orderDetails.isDelivered === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reverseDeliveryStatusToNotDelivered(
                                        order._id
                                      );
                                    }}
                                  >
                                    Mark as Undelivered
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsDelivered(order._id);
                                    }}
                                  >
                                    Mark as Delivered
                                  </Dropdown.Item>
                                )}
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                    setId(order._id);
                                  }}
                                >
                                  Delete Order
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <p
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                margin: " 200px auto",
                display: "block",
                textAlign: "center",
                padding: "30px",
                fontSize: "25px",
                width: "80vw",
                borderRadius: "8px",
              }}
            >
              No Orders Available
            </p>
          )}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
              Are You Sure You want to delete this Order?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setShow(false);
                }}
              >
                Yes
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  setConfirmDelete(false);
                  setShow(false);
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab
          style={{ textWrap: "nowrap" }}
          eventKey="Delivered"
          title="Delivered"
        >
          {allOrders && allOrders.length > 0 ? (
            <>
              {" "}
              <Table
                striped
                responsive
                style={{ width: "85%", margin: "5px auto 200px auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                    <th>Order ID</th>
                    <th>Customer name</th>
                    <th>Order Date/Time</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(
                    (order) =>
                      order &&
                      order.user &&
                      order.user.username &&
                      order.orderItems &&
                      order.totalPrice &&
                      order.isDelivered === true && (
                        <tr
                          style={{ textAlign: "center", textWrap: "nowrap" }}
                          key={order._id}
                        >
                          <td>ORD-{order._id.toString().slice(4, 8)}</td>
                          <td>
                            <img
                              className="img-for-allorders"
                              // src={order.user.image.url}
                              alt={order.user.username}
                            />
                            {order.user.username}
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Paid <FcPaid size={20} />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                Delivered <IoHome />{" "}
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>Pending</span>
                            )}
                          </td>
                          <td>
                            <Dropdown drop="down-centered" autoClose="outside">
                              <Dropdown.Toggle
                                style={{
                                  backgroundColor: "purple",
                                  border: "none",
                                }}
                                id="dropdown-basic"
                              >
                                Manage Order
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="">
                                  See Order Details
                                </Dropdown.Item>
                                {orderDetails.isPaid === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reversePaymentStatusToUnpaid(order._id);
                                    }}
                                  >
                                    Mark as Unpaid
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsPaid(order._id);
                                    }}
                                  >
                                    Mark as Paid
                                  </Dropdown.Item>
                                )}
                                {orderDetails.isDelivered === true ? (
                                  <Dropdown.Item
                                    onClick={() => {
                                      reverseDeliveryStatusToNotDelivered(
                                        order._id
                                      );
                                    }}
                                  >
                                    Mark as Undelivered
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={() => {
                                      markAsDelivered(order._id);
                                    }}
                                  >
                                    Mark as Delivered
                                  </Dropdown.Item>
                                )}
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                    setId(order._id);
                                  }}
                                >
                                  Delete Order
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <p
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                margin: " 200px auto",
                display: "block",
                textAlign: "center",
                padding: "30px",
                fontSize: "25px",
                width: "80vw",
                borderRadius: "8px",
              }}
            >
              No Orders Available
            </p>
          )}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
              Are You Sure You want to delete this Order?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setShow(false);
                }}
              >
                Yes
              </Button>
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  setConfirmDelete(false);
                  setShow(false);
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </>
  );
}

export default OrderListForAdmin;
