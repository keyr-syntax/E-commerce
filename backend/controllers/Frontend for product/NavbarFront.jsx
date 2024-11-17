import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ totalItems, totalCost }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        E-commerce Store
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link">
          <span className="basket-icon">🛒</span>
          <span className="basket-count">{totalItems}</span>
          <span className="basket-total">
            Total cost :${totalCost.toFixed(2)}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
