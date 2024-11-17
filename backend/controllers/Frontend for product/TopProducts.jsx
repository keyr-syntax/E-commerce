import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { formatDistanceToNow } from "date-fns";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

function TopProducts() {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchtopproducts`,
      );
      setProducts(response.data.topProducts);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchproductbykeyword/${searchKeyword}`,
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error searching products:", error);
      setError("Failed to search products. Please try again later.");
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/product/deleteproduct/${_id}`);
        fetchTopProducts();
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
    return <div className="product-list error">{error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Top Products</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Rating</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{formatCreatedAt(product.createdAt)}</td>
              <td>{product.rating}</td>
              <td>{product.brand}</td>
              <td>${product.price}</td>
              <td>
                <Link to={`/product/edit/${product._id}`}>Edit</Link>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopProducts;
