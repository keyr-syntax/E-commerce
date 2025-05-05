import { useContext } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import { Link } from "react-router-dom";

import "./Filterproducts.css";
export default function Filterproducts() {
  const {
    allCategories,
    filterProductsByCategory,
    fetchAllProductsFordisplay,
  } = useContext(ProductContext);

  return (
    <>
      {allCategories && allCategories.length > 0 && (
        <div className="filter-link-container">
          <Link className="filter-products-fixed">Filter </Link>
          <Link
            onClick={() => {
              fetchAllProductsFordisplay();
            }}
            className="filter-products-link"
          >
            All
          </Link>
          {allCategories.map((category) => (
            <Link
              className="filter-products-link"
              key={category._id}
              onClick={() => {
                filterProductsByCategory(category.category);
              }}
            >
              {category.category}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
