import { useContext } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import { Link } from "react-router-dom";

import "./Filterproducts.css";
export default function Filterproducts() {
  const { allCategories } = useContext(ProductContext);

  return (
    <>
      <div className="filter-link-container">
        <Link className="filter-products-fixed">Filter Products</Link>
        {allCategories?.map((category) => (
          <Link
            className="filter-products-link"
            key={category._id}
            to={`/filterproducts/${category.category}`}
          >
            {category.category}
          </Link>
        ))}
      </div>
    </>
  );
}
