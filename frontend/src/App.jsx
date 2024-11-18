import { Routes, Route } from "react-router-dom";
import ContextProvider from "./Public Components/ContextProvider";
import Navbar from "./Public Components/Navbar";
import Filterproducts from "./Public Components/Filterproducts";
import PrductSlider from "./Public Components/PrductSlider";
import ProductCard from "./Public Components/ProductsCard";
import ProductSearchResult from "./Public Components/ProductSearchResult";
import FilterProductsbyCategory from "./Public Components/FilterProductsbyCategory";

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <PrductSlider />
                <Filterproducts />
                <ProductCard />
              </>
            }
          />
          <Route
            exact
            path="/fetchproductbykeyword/:keyword"
            element={<ProductSearchResult />}
          />
          <Route
            exact
            path="/filterproductlistbycategory/:category"
            element={<FilterProductsbyCategory />}
          />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
