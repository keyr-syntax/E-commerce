import Navbar from "./Navbar";
import Loader from "./Loader.jsx";
import "./ProductSearchResult.css";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductSearchResult() {
  const {
    API_URL,
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    renderStars,
    isLoading,
    setIsLoading,
  } = useContext(ProductContext);
  const { keyword } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    console.log("useEffect isLoading", isLoading);
    fetchProductsByKeyword();
  }, [keyword]);
  const fetchProductsByKeyword = async () => {
    setIsLoading(true);
    console.log("function isLoading", isLoading);
    try {
      const data = await fetch(
        `${API_URL}/api/product/fetchproductbykeyword/${keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        setSearchResult(response.products);
        setProductCount(response.products.length);
        setIsLoading(false);
        console.log("response", response.products);
      }
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };
  return (
    <>
      <Navbar />
      {isLoading === true && <Loader />}
      {isLoading === false && searchResult && productCount && (
        <div className="search-result-div">
          <span>{productCount}</span>
          Products found for your search : <span>{keyword}</span>
        </div>
      )}
      {isLoading === false && searchResult.length > 0 && (
        <div className="product-search-result-container">
          {searchResult.map(
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

export default ProductSearchResult;
