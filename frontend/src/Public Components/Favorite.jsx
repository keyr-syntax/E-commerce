import { useContext } from "react";
import { ProductContext } from "./ContextProvider.jsx";
import { Link } from "react-router-dom";
import "./Favorite.css";
import toast from "react-hot-toast";

function Favorite() {
  const {
    favorites,
    addToCart,
    removeFromFavorites,
    isFavorite,
    addToFavorites,
    renderStars,
  } = useContext(ProductContext);

  return (
    <>
      {favorites && favorites.length > 0 ? (
        <div className="favorite-container">
          {favorites.map(
            (product) =>
              product && (
                <div key={product._id} className="favorite">
                  <div className="favorite-image-div">
                    <img
                      src={product.image}
                      alt={`Product Name: ${product.name}`}
                      className="favoritecard-image"
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
                    className="favorite-product-link"
                  >
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price-product-card">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="product-rating">
                      {renderStars(product.rating)}
                    </div>
                    <p className="favoriteproduct-description">
                      {product.description}
                    </p>
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="add-to-basket"
                  >
                    Add to Cart
                  </button>
                </div>
              )
          )}
        </div>
      ) : (
        <p
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            margin: " 200px auto",
            display: "block",
            textAlign: "center",
            padding: "30px",
            fontSize: "25px",
            width: "80vw",
            borderRadius: "8px",
          }}
        >
          No favorite products
        </p>
      )}
    </>
  );
}

export default Favorite;
