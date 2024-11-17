import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "./Navbar";
import { useState } from "react";
import { useStateValue } from "../StateProvider";

function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <div className="main">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>Admin Dashboard</h1>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/product/new">Create Product</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/fetchnewproducts">New Products</Link>
              </li>
              <li>
                <Link to="/fetchtopproducts">Top Products</Link>
              </li>
              <li>
                <Link to="/productcategory">Product Category</Link>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Link to={`/fetchproductbykeyword/${searchKeyword}`}>
                  <button>Search</button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
