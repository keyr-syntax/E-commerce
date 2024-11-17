import { Routes, Route } from "react-router-dom";
import ContextProvider from "./Public Components/ContextProvider";
import Navbar from "./Public Components/Navbar";
import Filterproducts from "./Public Components/Filterproducts";
import PrductSlider from "./Public Components/PrductSlider";

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
              </>
            }
          />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
