import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
// const API_URL = 'http://localhost:5000/api/product';
const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

function UpdatedProduct() {
  const { _id } = useParams();
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (_id) {
      fetchUpdatedProduct();
    }
  }, [_id]);
  const fetchUpdatedProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchproductbyid/${_id}`,
      );

      if (response.data.success) {
        setProductList(response.data.productById);
        document.getElementById("container").style.display = "block";
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product. Please try again later.");
    }
  };
  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/product/deleteproduct/${_id}`,
        );
        if (response.data.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  // if (error) {
  //   return <div className="dashboard error">{error}</div>;
  // }
  return (
    <>
      <div className="dashboard">
        <h2>Updated Product</h2>
      </div>

      <div className="container" id="container">
        <div className="display" key={productList._id}>
          <img src={productList.image} />
          <div>
            <h3>Name:{productList.name}</h3>
            <h3>Updated at: {productList.updatedAt}</h3>
            <h3>Brand: {productList.brand}</h3>
            <h3>Price: ${productList.price}</h3>
            <h3>Category: {productList._id}</h3>
            <h3>InStock: {productList.countInStock}</h3>
            <h3>Description: {productList.description}</h3>
            <h3>Reviews: ${productList.numReviews}</h3>
            <Link to={`/product/edit/${productList._id}`}>Edit</Link>
            <button onClick={() => handleDelete(productList._id)}>
              Delete
            </button>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdatedProduct;
