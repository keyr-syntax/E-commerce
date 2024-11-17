import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Navbar from "./Navbar";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

function Category() {
  const { categoryword } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryword) {
      fetchProductsByCategory();
    }
    fetchAllProducts();
  }, [categoryword]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchproductbycategory/${categoryword}`,
      );
      if (response.data.success) {
        setProducts(response.data.category);
        setProductCount(response.data.category.length);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setError("Failed to search products. Please try again later.");
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchallproducts`,
      );
      if (response.data.success) {
        setProducts(response.data.allProducts);
        setProductCount(response.data.allProducts.length);
        console.log(response.data.allProducts);
      }
    } catch (error) {
      console.error("Error fetching product count:", error);
      setError("Failed to fetch product count. Please try again later.");
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
        fetchProductsByCategory();
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
          {categoryword
            ? `List of Products from ${categoryword} category`
            : "List of Products from All  categories"}
        </p>
        <p>
          {categoryword
            ? `Total products in ${categoryword} category : ${productCount}`
            : `Total products in All categories : ${productCount}`}
        </p>
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

export default Category;
