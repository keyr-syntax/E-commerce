import { Link, Outlet } from "react-router-dom";
import { MenuIcon, SearchIcon, ShoppingCartIcon, X } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import "./Navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import toast from "react-hot-toast";
function Navbar() {
  const { totalItems, isAdmin, isLoggedIn, Logout } =
    useContext(ProductContext);
  const [searchWord, setSearchWord] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <nav className="navbar-container">
        <Link to="/" className="logo-navbar">
          Syntax
        </Link>
        <div className="search-container">
          <input
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            type="text"
            placeholder="Search products"
          />
          <Link
            onClick={() => {
              if (!searchWord) {
                alert("Please write something...");
                toast.error("Please write something...");
              }
            }}
            to={`/fetchproductbykeyword/${searchWord}`}
          >
            <SearchIcon className="search-icon-desktop" />
          </Link>
        </div>
        <div className="navbar-options">
          {isAdmin && (
            <Link className="navbar-options-link" to="/admin">
              Dashboard
            </Link>
          )}
          {!isAdmin && (
            <Link className="navbar-options-link" to="/profile">
              Dashboard
            </Link>
          )}
          <Link to="/favorites" className="navbar-options-link">
            Favorites
          </Link>
          {isLoggedIn === false && (
            <Link className="navbar-options-link" to="/login">
              Login
            </Link>
          )}
          {isLoggedIn === true && (
            <Link
              onClick={() => {
                Logout();
                toast.success("Logout successful");
              }}
              className="navbar-options-link"
            >
              Logout
            </Link>
          )}
          <Link className="navbar-options-link" to="/cart">
            Cart
          </Link>
          <Link to="/cart">
            <ShoppingCartIcon className="shopping-cart-icon" />
          </Link>
          <span className="cart-counter">{totalItems}</span>
          <span className="cart-counter-mobile">{totalItems}</span>
          <Link to="/profile">
            <CircleUserRound className="account-icon-navbar" />
          </Link>
          {!menuOpen && (
            <MenuIcon
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              size={30}
              className="menu-icon"
            />
          )}
          {menuOpen && (
            <X
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              size={30}
              className="x-icon"
            />
          )}
        </div>
      </nav>
      {menuOpen && (
        <div ref={menuRef} className="navbar-mobile">
          <div className="navbar-options-mobile">
            {isAdmin && <Link to="/admin">Dashboard</Link>}
            {!isAdmin && <Link to="/profile">Dashboard</Link>}
            <Link>Favorites</Link>
            {isLoggedIn === false && (
              <Link className="navbar-options-link-mobile" to="/login">
                Login
              </Link>
            )}
            {isLoggedIn === true && (
              <Link
                onClick={() => {
                  Logout();
                  toast.success("Logout successful");
                }}
                className="navbar-options-link-mobile"
              >
                Logout
              </Link>
            )}
            <Link to="/cart" style={{ border: "none" }}>
              Cart
            </Link>
          </div>
          <div className="search-container-mobile">
            <input
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              type="text"
              placeholder="Search products"
            />
            <Link to={`/fetchproductbykeyword/${searchWord}`}>
              <SearchIcon size={35} className="search-icon-mobile" />
            </Link>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Navbar;
