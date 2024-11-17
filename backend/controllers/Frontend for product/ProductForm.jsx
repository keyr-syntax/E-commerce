import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

// Define the list of categories
const categories = [
  "Mobile",
  "Laptop",
  "Headphone",
  "TV",
  "Radio",
  "Tablet",
  "Smart Watch",
  "Camera",
  "Gaming Console",
  "Speaker",
];

function ProductForm() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (_id) {
      fetchProduct();
    }
  }, [_id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchproductbyid/${_id}`,
      );
      const productById = response.data.productById;
      setName(productById.name);
      setImage(productById.image);
      setBrand(productById.brand);
      setCategory(productById.category);
      setPrice(productById.price);
      console.log(productById);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (_id) {
        const updatedProduct = await axios.put(
          `${API_URL}/api/product/updateproduct/${_id}`,
          { name, image, brand, category, price },
        );
        if (updatedProduct.data.success) {
          navigate(`/fetchproductbyid/${_id}`);
        }
      } else {
        const sentData = await axios.post(
          `${API_URL}/api/product/createproduct`,
          { name, image, brand, category, price },
        );
        if (sentData.data.success) {
          setName("");
          setImage("");
          setBrand("");
          setCategory("");
          setPrice("");
        }
        console.log(sentData);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (error) {
    return <div className="product-form error">{error}</div>;
  }

  return (
    <div className="product-form">
      <h2>{_id ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            required
          />
        </div>

        <button type="submit">
          {_id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
