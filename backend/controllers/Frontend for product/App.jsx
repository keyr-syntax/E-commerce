import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={totalItems} totalCost={totalCost} />
        <Header />
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                totalCost={totalCost}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                totalCost={totalCost}
              />
            }
          />
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/fetchnewproducts" element={<NewProducts />} />
          <Route path="/fetchtopproducts" element={<TopProducts />} />
          <Route path="/product/new" element={<ProductForm />} />
          <Route path="/product/edit/:_id" element={<ProductForm />} />
          <Route path="/fetchproductbyid/:_id" element={<UpdatedProduct />} />
          <Route path="/productcategory" element={<Category />} />
          <Route
            path="/fetchproductbycategory/:categoryword"
            element={<Category />}
          />
          <Route path="/fetchproductbykeyword/:keyword" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
