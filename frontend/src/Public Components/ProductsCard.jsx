import { useContext } from "react";
import { ProductContext } from "./ContextProvider";
import "./ProductsCard.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";

const ProductCard = () => {
  const {
    addToCart,
    // allProducts,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    renderStars,
    productsforhomepage,
  } = useContext(ProductContext);

  return (
    <>
      {productsforhomepage && productsforhomepage.length > 0 && (
        <div className="individualcard-container">
          {productsforhomepage.map(
            (product) =>
              product && (
                <div key={product._id} className="individualcard">
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
                    to={`/individualproduct`}
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
                      toast.success(`${product.name} added to the cart`);
                    }}
                    className="add-to-basket"
                  >
                    Add to Cart
                  </button>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default ProductCard;
