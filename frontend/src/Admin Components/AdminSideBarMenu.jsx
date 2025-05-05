import { Link, Outlet, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./AdminSideBarMenu.css";
import {
  ChartLine,
  CircleUserRound,
  MenuIcon,
  SearchIcon,
  X,
  Settings,
  HousePlug,
  Target,
  ChartBarStacked,
  Bell,
  Contact,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
// import NotificationMenu from "./NotificationMenu";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import toast from "react-hot-toast";

function AdminSideBarMenu() {
  const { notifications, unreadNotifications } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();
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
      <div className="top-navbar-admin-dashboard">
        <Link to="/" className="logo-admin-dashboard">
          Syntax
        </Link>
        <div className="search-container-admin-dashboard">
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
                toast.error("Please write something...");
              } else {
                navigate(`/fetchproductbykeyword/${searchWord}`);
              }
            }}
          >
            <SearchIcon className="search-icon-admin-dashboard" />
          </Link>
        </div>
        <Link to="/">
          <Bell className="account-icon-admin-dashboard" />
        </Link>
        <Link to="/profile">
          <CircleUserRound className="account-icon-admin-dashboard" />
        </Link>
        {!menuOpen && (
          <MenuIcon
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={30}
            className="menu-icon-admin-dashboard"
          />
        )}
        {menuOpen && (
          <X
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={30}
            className="x-icon-admin-dashboard"
          />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div className="navbar-main">
          <div className="navbar-products">
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
              }}
              to="/"
              className="navbar-menu"
            >
              <HousePlug size={20} />
              Home
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              to="/admin"
              className="navbar-menu"
            >
              <Target size={20} />
              Overview
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <ShoppingCart size={20} />
              Products
              {!isOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {isOpen && (
              <div className="navbar-product-submenu">
                <Link to="/admin/productlistforadmin">All Products</Link>
                <Link to="/admin/createproduct">Create Products</Link>
                <Link to="/admin/productlistforadmin">Delete Products</Link>
                <Link to="/admin/productlistforadmin">
                  Update Products
                </Link>{" "}
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
              onClick={() => {
                setCategoryOpen(!categoryOpen);
              }}
            >
              <ChartBarStacked size={20} />
              Category{" "}
              {!categoryOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {categoryOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/updateanddeletecategory">All Categories</Link>
                <Link to="/admin/createproductcategory">Create Category</Link>
                <Link to="/admin/updateanddeletecategory">Delete Category</Link>
                <Link to="/admin/updateanddeletecategory">Update Category</Link>
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setOrderOpen(!orderOpen);
              }}
              className="navbar-menu"
            >
              <ClipboardList size={20} />
              Orders{" "}
              {!orderOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {orderOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/order">All orders</Link>
                <Link to="/admin/paidorder">Paid Orders</Link>
                <Link to="/admin/unpaidorder">Payment Pending Orders</Link>
                <Link to="/admin/deliveredorder">Delivered Orders</Link>
                <Link to="/admin/notdeliveredorder">
                  Delivery Pending Orders
                </Link>
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setUserOpen(!userOpen);
              }}
              className="navbar-menu"
            >
              <Contact size={20} />
              Users{" "}
              {!userOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {userOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/managecustomers">Manage Customers</Link>
                <Link>Manage Employees</Link>
                <Link>Promote Employess to Admin</Link>
              </div>
            )}

            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              to="/admin/analytics"
              className="navbar-menu"
            >
              <ChartLine size={20} />
              Analytics
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
            >
              <Settings />
              Settings
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setNotificationOpen(!notificationOpen);
              }}
              className="navbar-menu"
            >
              {/* <NotificationMenu /> */}
              <Bell size={20} />
              Notifications
              {notificationOpen ? (
                <FaAngleUp className="arrow-icon" />
              ) : (
                <FaAngleDown className="arrow-icon" />
              )}
            </Link>
            {notificationOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/newmessage">
                  New Messages
                  {unreadNotifications > 0 && (
                    <span className="notification-badge-new-message">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
                <Link to="/admin/allmessage">
                  All Messages
                  {notifications.length > 0 && (
                    <span className="notification-badge-all-message">
                      {notifications.length}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 12 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
      {menuOpen && (
        <div ref={menuRef} className="navbar-main-mobile">
          <div className="navbar-products">
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
              }}
              to="/"
              className="navbar-menu"
            >
              <HousePlug size={20} />
              Home
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              to="/admin"
              className="navbar-menu"
            >
              <Target size={20} />
              Overview
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <ShoppingCart size={20} />
              Products
              {!isOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {isOpen && (
              <div className="navbar-product-submenu">
                <Link to="/admin/productlistforadmin">All Products</Link>
                <Link to="/admin/createproduct">Create Products</Link>
                <Link to="/admin/productlistforadmin">Delete Products</Link>
                <Link to="/admin/productlistforadmin">
                  Update Products
                </Link>{" "}
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
              onClick={() => {
                setCategoryOpen(!categoryOpen);
              }}
            >
              <ChartBarStacked size={20} />
              Category{" "}
              {!categoryOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {categoryOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/updateanddeletecategory">All Categories</Link>
                <Link to="/admin/createproductcategory">Create Category</Link>
                <Link to="/admin/updateanddeletecategory">Delete Category</Link>
                <Link to="/admin/updateanddeletecategory">Update Category</Link>
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setOrderOpen(!orderOpen);
              }}
              className="navbar-menu"
            >
              <ClipboardList size={20} />
              Orders{" "}
              {!orderOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {orderOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/order">All orders</Link>
                <Link to="/admin/paidorder">Paid Orders</Link>
                <Link to="/admin/unpaidorder">Payment Pending Orders</Link>
                <Link to="/admin/deliveredorder">Delivered Orders</Link>
                <Link to="/admin/notdeliveredorder">
                  Delivery Pending Orders
                </Link>
              </div>
            )}
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setUserOpen(!userOpen);
              }}
              className="navbar-menu"
            >
              <Contact size={20} />
              Users{" "}
              {!userOpen ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </Link>
            {userOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/managecustomers">Manage Customers</Link>
                <Link>Manage Employees</Link>
                <Link>Promote Employess to Admin</Link>
              </div>
            )}

            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              to="/admin/analytics"
              className="navbar-menu"
            >
              <ChartLine size={20} />
              Analytics
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              className="navbar-menu"
            >
              <Settings />
              Settings
            </Link>
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                setNotificationOpen(!notificationOpen);
              }}
              className="navbar-menu"
            >
              {/* <NotificationMenu /> */}
              <Bell size={20} />
              Notifications
              {notificationOpen ? (
                <FaAngleUp className="arrow-icon" />
              ) : (
                <FaAngleDown className="arrow-icon" />
              )}
            </Link>
            {notificationOpen && (
              <div className="navbar-category-submenu">
                <Link to="/admin/newmessage">
                  New Messages
                  {unreadNotifications > 0 && (
                    <span className="notification-badge-new-message">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
                <Link to="/admin/allmessage">
                  All Messages
                  {notifications.length > 0 && (
                    <span className="notification-badge-all-message">
                      {notifications.length}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default AdminSideBarMenu;
