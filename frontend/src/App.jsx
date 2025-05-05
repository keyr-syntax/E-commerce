import { Routes, Route } from "react-router-dom";
import Navbar from "./Public Components/Navbar";
import Filterproducts from "./Public Components/Filterproducts";
import PrductSlider from "./Public Components/PrductSlider";
import ProductCard from "./Public Components/ProductsCard";
import ProductSearchResult from "./Public Components/ProductSearchResult";
import { useContext } from "react";
import { ProductContext } from "./Public Components/ContextProvider.jsx";
import Loader from "./Public Components/Loader.jsx";
import Login from "./Public Components/Login.jsx";
import Favorite from "./Public Components/Favorite.jsx";
import Signup from "./Public Components/Signup.jsx";
import Cart from "./Public Components/Cart.jsx";
import Checkout from "./Public Components/Checkout.jsx";
import LoginForCheckoutPage from "./Public Components/LoginForCheckoutPage.jsx";
import IndividualProduct from "./Public Components/IndividualProduct.jsx";
import Chart from "./Admin Components/Chart.jsx";
import Analysis from "./Admin Components/Analysis.jsx";
import ProductListForAdmin from "./Admin Components/ProductListForAdmin.jsx";
import AdminNavbar from "./Admin Components/AdminNavbar.jsx";
import CreateProduct from "./Admin Components/CreateProduct.jsx";
import UpdateProduct from "./Admin Components/UpdateProduct.jsx";
import CreateCategory from "./Admin Components/CreateCategory.jsx";
import UpdateCategory from "./Admin Components/UpdateCategory.jsx";
import AllCategory from "./Admin Components/AllCategory.jsx";
import OrderListForAdmin from "./Admin Components/OrderListForAdmin.jsx";

function App() {
  const { isLoading } = useContext(ProductContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navbar />}>
          <Route
            index
            element={
              <>
                {isLoading === true && <Loader />}
                {isLoading === false && (
                  <>
                    <PrductSlider />
                    <Filterproducts />
                    <ProductCard />
                  </>
                )}
              </>
            }
          />
          <Route
            exact
            path="/fetchproductbykeyword/:keyword"
            element={<ProductSearchResult />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/favorites" element={<Favorite />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout/:_id" element={<Checkout />} />
          <Route
            exact
            path="/loginforcheckout"
            element={<LoginForCheckoutPage />}
          />
          <Route
            exact
            path="/individualproduct/"
            element={<IndividualProduct />}
          />
        </Route>
        <Route path="/admin" element={<AdminNavbar />}>
          <Route
            index
            element={
              <>
                <Analysis />
                <Chart />
              </>
            }
          />
          <Route
            path="/admin/productlistforadmin"
            element={<ProductListForAdmin />}
          />
          <Route path="/admin/createproduct" element={<CreateProduct />} />
          <Route
            path="/admin/fetchproductbyid/:_id"
            element={<UpdateProduct />}
          />
          <Route path="/admin/createcategory" element={<CreateCategory />} />
          <Route
            path="/admin/updatecategory/:_id"
            element={<UpdateCategory />}
          />
          <Route exact path="/admin/allcategory" element={<AllCategory />} />
          <Route
            exact
            path="/admin/allorders"
            element={<OrderListForAdmin />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
