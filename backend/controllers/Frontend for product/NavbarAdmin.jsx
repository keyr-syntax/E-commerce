import { Link } from "react-router-dom";
import "./Header.css";
import Category from "./Category";
const Mobile = "Mobile";
const Laptop = "Laptop";
const Headphone = "Headphone";
const TV = "TV";
const Radio = "Radio";
const Tablet = "Tablet";
const SmartWatch = "Smart Watch";
function Navbar() {
  return (
    <>
      <div className="category-nav">
        <Link to="/productcategory" className="navbar-link">
          All Category
        </Link>
        <Link to={`/fetchproductbycategory/${Mobile}`} className="navbar-link">
          Mobile
        </Link>
        <Link to={`/fetchproductbycategory/${Laptop}`} className="navbar-link">
          Laptop
        </Link>
        <Link
          to={`/fetchproductbycategory/${Headphone}`}
          className="navbar-link"
        >
          Headphone
        </Link>
        <Link to={`/fetchproductbycategory/${TV}`} className="navbar-link">
          TV
        </Link>
        <Link to={`/fetchproductbycategory/${Radio}`} className="navbar-link">
          Radio
        </Link>
        <Link to={`/fetchproductbycategory/${Tablet}`} className="navbar-link">
          Tablet
        </Link>
        <Link
          to={`/fetchproductbycategory/${SmartWatch}`}
          className="navbar-link"
        >
          Smart Watch
        </Link>
      </div>
    </>
  );
}

export default Navbar;
