import "./ProductSearchResult.css";
import { useContext, useEffect } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader.jsx";
function FilteredProductDisplay() {
  const {
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    renderStars,
    filterByCategory,
    filterProductsByCategory,
    isLoading,
  } = useContext(ProductContext);
  const { category } = useParams();

  useEffect(() => {
    filterProductsByCategory(category);
  }, [category]);

  return (
    <>
      {isLoading === true && <Loader />}
      {isLoading === false &&
        filterByCategory &&
        filterByCategory.length > 0 && (
          <div className="product-search-result-container">
            {filterByCategory.map(
              (product) =>
                product &&
                product.image &&
                product.name &&
                product.rating &&
                product.description && (
                  <div key={product._id} className="product-search-result">
                    <div className="product-image-div">
                      <img
                        src={product.image}
                        alt={`Product Name: ${product.name}`}
                        className="productcard-image"
                      />
                      <span
                        onClick={() => {
                          if (isFavorite(product._id)) {
                            removeFromFavorites(product._id);
                          } else {
                            addToFavorites(product);
                          }
                        }}
                        className="favorite-icon"
                      >
                        {isFavorite(product._id) ? <>❤️</> : <>🤍</>}
                      </span>
                    </div>
                    <Link
                      to={`/individualproduct/${product._id}`}
                      className="individual-product-link"
                    >
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price-product-card">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="product-rating">
                        {renderStars(product.rating)}
                      </div>
                      <p className="individualproduct-description">
                        {product.description}
                      </p>
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(product);

                        toast.success(
                          `${product.name} added to Cart! 
                  `,
                          {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          }
                        );
                      }}
                      className="add-to-basket"
                    >
                      Add to Cart
                    </button>
                  </div>
                )
            )}
            <ToastContainer limit={3} />
          </div>
        )}
    </>
  );
}

export default FilteredProductDisplay;
