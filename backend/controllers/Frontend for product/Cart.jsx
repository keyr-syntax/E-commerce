import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity, totalCost }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <span>
                {item.name} - ${item.price}
              </span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div className="total-cost">
            <strong>Total Cost: ${totalCost.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
          <Link to="/" className="back-to-cart">
            Back to Home
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
