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
        </Route>
      </Routes>
    </>
  );
}

export default App;
