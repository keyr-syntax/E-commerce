import { useContext, useEffect } from "react";
import { ProductContext } from "./ContextProvider";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import toast from "react-hot-toast";
function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalCost,
    totalItems,
    API_URL,
    fetchAllOrdersForAdmin,
    isLoggedIn,
    fetchAllNotificationsForNewOrder,
    error,
    clearError,
  } = useContext(ProductContext);
  const navigate = useNavigate();

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

  const handleSendOrder = async () => {
    if (!isLoggedIn) {
      toast.error("You are not logged in. Please Login to send orders");
      setTimeout(() => {
        navigate("/loginforcheckout");
      }, 3000);
    }

    const cart = localStorage.getItem("cart");
    const orderItems = JSON.parse(cart);
    if (!orderItems.length) {
      toast.error("Cart is empty, cannot send order.");
      return;
    }
    try {
      console.log("order Items", orderItems);
      const data = await fetch(`${API_URL}/api/order/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderItems }),
      });
      const response = await data.json();
      console.log("response created", response);
      if (response.success) {
        toast.success("Order created successfully");
        fetchAllNotificationsForNewOrder();
        fetchAllOrdersForAdmin();
        setTimeout(() => {
          navigate(`/checkout/${response.createdOrder._id}`);
        }, 2000);
        console.log("Order created successfully!", response.createdOrder);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while sending order:", error.message);
    }
  };
  return (
    <>
      {cart && cart.length > 0 ? (
        <>
          <div className="shopping-cart">
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
                padding: "5px",
              }}
            >
              Shopping Cart
            </p>
            <p>Total Items: {totalItems}</p>
            <p>Subtotal: ${totalCost}</p>
            <button
              onClick={() => {
                handleSendOrder();
              }}
            >
              Proceed to checkout
            </button>
          </div>
          <div className="cart-page-wrapper">
            {" "}
            <div className="cart-product-container">
              {cart.map(
                (product) =>
                  product && (
                    <div key={product._id} className="cart-product">
                      <div className="cart-image-div">
                        <img
                          src={product.image}
                          alt={`Product Name: ${product.name}`}
                          className="cart-card-image"
                        />
                        <span className="favorite-icon"></span>
                      </div>
                      <div className="cart-detail-container">
                        <div
                          to={`/individualproduct/${product._id}`}
                          className="cart-title-price"
                        >
                          <p style={{ fontWeight: "bold" }}>{product.name}</p>
                        </div>
                        <div
                          to={`/individualproduct/${product._id}`}
                          className="cart-title-price"
                        >
                          Price: <p>${product.price.toFixed(2)}</p>
                        </div>
                        <div className="cart-quantity-container">
                          <p>Quantity :</p>
                          <Plus
                            size={28}
                            className="quantity-icon"
                            onClick={() => {
                              updateQuantity(
                                product._id,
                                product.quantity + 1,
                                product.countInStock
                              );
                            }}
                          />
                          <input
                            className="cart-input-field"
                            type="number"
                            min={1}
                            max={product.countInStock}
                            placeholder="Adjust quantity"
                            value={product.quantity}
                            onChange={(e) => {
                              updateQuantity(
                                product._id,
                                parseInt(e.target.value),
                                product.countInStock
                              );
                            }}
                          />
                          <Minus
                            size={28}
                            className="quantity-icon"
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                product.quantity - 1,
                                product.countInStock
                              )
                            }
                          />
                        </div>
                        <div className="cart-quantity-container">
                          <p>Subtotal:</p>
                          <p>${product.subtotal}</p>
                        </div>
                        <button
                          className="remove-from-cart"
                          onClick={() => {
                            removeFromCart(product._id);
                          }}
                        >
                          Remove from cart
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
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
          Your cart is empty
        </p>
      )}
    </>
  );
}

export default Cart;
