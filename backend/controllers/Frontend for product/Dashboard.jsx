import { useState, useEffect } from "react";
import axios from "axios";
import "./Ecommerce.css";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Navbar from "./Navbar";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductCount();
  }, []);

  const fetchProductCount = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchallproducts`,
      );
      setProductCount(response.data.allProducts.length);
      setProductList(response.data.allProducts);
      console.log(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching product count:", error);
      setError("Failed to fetch product count. Please try again later.");
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/product/deleteproduct/${_id}`,
        );
        if (response.data.success) {
          fetchProductCount();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product. Please try again later.");
      }
    }
  };
  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  if (error) {
    return <div className="dashboard error">{error}</div>;
  }

  return (
    <>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p>Total Products: {productCount}</p>
      </div>
      <div className="container-dashboard">
        {productList?.map((item) => (
          <div className="display" key={item._id}>
            <img src={item.image} />
            <div>
              <h3>{item.name}</h3>
              <h3>Brand: {item.brand}</h3>
              <h3>Price: ${item.price}</h3>
              <h3>Updated:{formatCreatedAt(item.createdAt)}</h3>
              <Link to={`/product/edit/${item._id}`}>Edit</Link>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
