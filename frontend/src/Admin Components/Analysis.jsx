import "./Analysis.css";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import { useContext } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
function Analysis() {
  const { allOrders, allProducts, allUsersByAdmin, totalSales } =
    useContext(ProductContext);
  return (
    <>
      <div className="analysis-main">
        {allOrders && (
          <div className="analysis-orders">
            <div className="analysis-h4">
              <h5>Total Orders</h5>
              <h4>{allOrders ? allOrders.length : ""}</h4>
            </div>
            <div className="analysis-icon">
              <BsCartCheckFill size={60} />
            </div>{" "}
          </div>
        )}
        <div className="analysis-sales">
          <div className="analysis-h4">
            <h5>Total Sales</h5>
            <h4>${totalSales ? totalSales : ""}</h4>
          </div>
          <div className="analysis-icon">
            <FaSackDollar size={60} />
          </div>{" "}
        </div>
        <div className="analysis-products">
          <div className="analysis-h4">
            <h5>Total Products</h5>
            <h4>{allProducts ? allProducts.length : ""}</h4>
          </div>
          <div className="analysis-icon">
            <FaProductHunt size={60} />
          </div>{" "}
        </div>
        <div className="analysis-customers">
          <div className="analysis-h4">
            <h5>Total Customers</h5>
            <h4>{allUsersByAdmin ? allUsersByAdmin.length : ""}</h4>
          </div>
          <div className="analysis-icon">
            <IoIosPeople size={60} />
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Analysis;
