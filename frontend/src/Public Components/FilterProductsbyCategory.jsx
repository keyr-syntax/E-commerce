import Filterproducts from "./Filterproducts";
import Navbar from "./Navbar";
import PrductSlider from "./PrductSlider";

import FilteredProductDisplay from "./FilteredProductDisplay";

function FilterProductsbyCategory() {
  return (
    <>
      <Navbar />
      <PrductSlider />
      <Filterproducts />
      <FilteredProductDisplay />
    </>
  );
}

export default FilterProductsbyCategory;
