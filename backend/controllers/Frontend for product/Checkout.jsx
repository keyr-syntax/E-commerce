import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({ cart, removeFromCart, updateQuantity, totalCost }) => {
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <span>
                {item.name} - ${item.price}
              </span>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div className="total-cost">
            <strong>Total Cost: ${totalCost.toFixed(2)}</strong>
          </div>
          <button className="place-order-button">Place Order</button>
          <Link to="/cart" className="back-to-cart">
            Back to Cart
          </Link>
        </>
      )}
    </div>
  );
};

export default Checkout;
