import { Routes, Route } from "react-router-dom";
import Navbar from "./Public Components/Navbar";
import Filterproducts from "./Public Components/Filterproducts";
import PrductSlider from "./Public Components/PrductSlider";
import ProductCard from "./Public Components/ProductsCard";
import ProductSearchResult from "./Public Components/ProductSearchResult";
import { useContext } from "react";
import { ProductContext } from "./Public Components/ContextProvider.jsx";
import Loader from "./Public Components/Loader.jsx";
function App() {
  const { isLoading } = useContext(ProductContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
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
      </Routes>
    </>
  );
}

export default App;
