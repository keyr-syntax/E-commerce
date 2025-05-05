import "./Checkout.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "./ContextProvider";
import { FcGoogle } from "react-icons/fc";
import { ImPaypal } from "react-icons/im";
import { FaApple } from "react-icons/fa6";
import toast from "react-hot-toast";
import Loader from "./Loader.jsx";
function Checkout() {
  const {
    API_URL,
    totalItems,
    subtotal,
    shippingPrice,
    tax,
    totalPrice,
    setSubtotal,
    setShippingPrice,
    setTax,
    setTotalPrice,
    isLoading,
    setIsLoading,
    error,
    clearError,
  } = useContext(ProductContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const { _id } = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (error) {
      setTimeout(() => {
        clearError();
      }, 4000);
    }
  }, [error]);

  useEffect(() => {
    fetchOrderById();
  }, []);

  const fetchOrderById = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(`${API_URL}/api/order/fetchorderbyid/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setSubtotal(response.orderById.itemsPrice);
        setTax(response.orderById.taxPrice);
        setShippingPrice(response.orderById.shippingPrice);
        setTotalPrice(response.orderById.totalPrice);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading === true && <Loader />}
      {isLoading === false && (
        <div className="checkout-container">
          <div className="form-container">
            <form>
              <h4 className="checkout-header">Checkout</h4>
              <label htmlFor="Contact Information">Contact Information</label>
              <input
                className="form-input"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                className="form-input"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <input
                className="form-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="Shipping Address">Shipping Address</label>
              <input
                className="form-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Postal Code"
                value={postalcode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />
              <label htmlFor="Payment Method">Payment Method</label>
              <div className="form-button-container">
                <button
                  onClick={() => {
                    setPayment("paypal");
                  }}
                  className="form-button"
                >
                  <ImPaypal size={30} />
                  <span>Paypal</span>
                </button>
                <button
                  onClick={() => {
                    setPayment("Google pay");
                  }}
                  className="form-button"
                >
                  <FcGoogle size={30} />
                  <span>Pay</span>
                </button>
                <button
                  onClick={() => {
                    setPayment("Apple Pay");
                  }}
                  className="form-button"
                >
                  <FaApple size={30} />
                  <span>Pay</span>
                </button>
              </div>
            </form>
          </div>
          <div className="payment-navbar-links">
            <Link className="payment-navbar-link-header">Purchase Details</Link>
            <Link className="payment-navbar-link">
              Total Number of Items: <span>{totalItems}</span>{" "}
            </Link>
            <Link className="payment-navbar-link">
              Subtotal: <span>${subtotal}</span>{" "}
            </Link>
            <Link className="payment-navbar-link">
              Shipping Price: <span>${shippingPrice}</span>{" "}
            </Link>
            <Link className="payment-navbar-link">
              Tax (15%): <span>${tax}</span>{" "}
            </Link>
            <Link className="payment-navbar-link-total">
              Total Cost: <span>${totalPrice}</span>{" "}
            </Link>
            <button className="payment-button">Pay Now</button>
            <button
              style={{ marginBottom: "30px" }}
              to="/cart"
              className="payment-button"
            >
              Back to Shopping Cart
            </button>
          </div>
        </div>
      )}
      {isLoading === false && (
        <div className="checkout-container-mobile">
          <div className="form-container-mobile">
            <form>
              <h4 className="checkout-header-mobile">Checkout</h4>
              <label htmlFor="Contact Information-mobile">
                Contact Information
              </label>
              <input
                className="form-input-mobile"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="form-input-mobile"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                className="form-input-mobile"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <input
                className="form-input-mobile"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="Shipping Address">Shipping Address</label>
              <input
                className="form-input-mobile"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                className="form-input-mobile"
                type="text"
                placeholder="Postal Code"
                value={postalcode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />
              <label htmlFor="Payment Method-mobile">Payment Method</label>
              <div className="form-button-container">
                <button
                  onClick={() => {
                    setPayment("paypal");
                  }}
                  className="form-button-mobile"
                >
                  <ImPaypal size={30} />
                  <span>Paypal</span>
                </button>
                <button
                  onClick={() => {
                    setPayment("Google pay");
                  }}
                  className="form-button-mobile"
                >
                  <FcGoogle size={30} />
                  <span>Pay</span>
                </button>
                <button
                  onClick={() => {
                    setPayment("Apple Pay");
                  }}
                  className="form-button-mobile"
                >
                  <FaApple size={30} />
                  <span>Pay</span>
                </button>
              </div>
            </form>
          </div>
          <div className="payment-navbar-links-mobile">
            <Link className="payment-navbar-link-header-mobile">
              Purchase Details
            </Link>
            <Link className="payment-navbar-link-mobile">
              Total Number of Items: <span>{totalItems}</span>{" "}
            </Link>
            <Link className="payment-navbar-link-mobile">
              Subtotal: <span>${subtotal}</span>{" "}
            </Link>
            <Link className="payment-navbar-link-mobile">
              Shipping Price: <span>${shippingPrice}</span>{" "}
            </Link>
            <Link className="payment-navbar-link-mobile">
              Tax (15%): <span>${tax}</span>{" "}
            </Link>
            <Link className="payment-navbar-link-total-mobile">
              Total Cost: <span>${totalPrice}</span>{" "}
            </Link>
            <button className="payment-button-mobile">Pay Now</button>
            <button
              style={{ marginBottom: "30px" }}
              to="/cart"
              className="payment-button-mobile"
            >
              Back to Shopping Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
