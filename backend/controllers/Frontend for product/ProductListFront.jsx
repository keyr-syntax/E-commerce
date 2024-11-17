import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const API_URL =
  "https://aadaa2dc-a735-4340-adb4-e5f51080faab-00-33dm8l0i53owa.kirk.replit.dev";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    const response = await axios.get(`${API_URL}/api/product/fetchallproducts`);
    if (response.data.success) {
      setProducts(response.data.allProducts);
      setProductCount(response.data.allProducts.length);
      console.log(response.data);
    }
  };
  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };
  return (
    <div className="product-list">
      <h3>All Products</h3>
      <p>Total products:{productCount}</p>
      {products.map((product) => (
        <div key={product._id} className="product">
          <img className="product-image" src={product.image} alt="" />
          <span>
            {product.name} - ${product.price}
          </span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <Link to="/cart">
            <button>Go to Shopping cart</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
