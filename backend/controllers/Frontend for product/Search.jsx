import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Navbar from "./Navbar";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

function Search() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (keyword) {
      fetchProductsByKeyword();
    }
  }, [keyword]);

  const fetchProductsByKeyword = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchproductbykeyword/${keyword}`,
      );
      if (response.data.success) {
        setProducts(response.data.products);
        setProductCount(response.data.products.length);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setError("Failed to search products. Please try again later.");
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/product/deleteproduct/${_id}`);
        fetchProductsByKeyword();
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
    <>
      <Navbar />
      <div className="product-list">
        <p>
          {keyword
            ? `Search results for keyword: ${keyword}`
            : "Search results"}
        </p>
        <p>Total products found: {productCount}</p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Created</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCreatedAt(product.createdAt)}</td>
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
    </>
  );
}

export default Search;
