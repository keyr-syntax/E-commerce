import { useContext, useEffect } from "react";
import { ProductContext } from "./ContextProvider";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./IndividualProduct.css";
import Navbar from "./Navbar";
function IndividualProduct() {
  const { _id } = useParams();

  const {
    filterProductsById,
    renderStars,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToCart,
    allProducts,
    filteredById,
  } = useContext(ProductContext);

  useEffect(() => {
    if (_id) {
      filterProductsById(_id);
    }
  }, [_id, allProducts]);

  return (
    <>
      <Navbar />
      <div className="individual-product-container">
        <div className="individual-product-image-div" key={filteredById?._id}>
          <img
            className="individual-product-image"
            src={filteredById?.image}
            alt={filteredById?.name}
          />
        </div>
        <div className="individual-product-description">
          <h4 className="individual-product-h4">Name:{filteredById?.name}</h4>
          <p className="individual-product-p">Price: ${filteredById?.price}</p>
          <p className="individual-product-p">Brand: ${filteredById?.brand}</p>
          <p className="individual-product-p">
            Rating: {renderStars(filteredById?.rating)}{" "}
          </p>
          <p className="individual-product-p">
            Category: {filteredById?.category}
          </p>
          <p className="individual-product-p">
            Description: {filteredById?.description}
          </p>
          <p className="individual-product-p">
            In-Stock: {filteredById?.countInStock}
          </p>
          <p className="individual-product-p">
            Reviews: {filteredById?.numReviews}
          </p>
          {filteredById &&
            filteredById.comments &&
            filteredById.comments.map((comment) => (
              <div key={comment._id}>
                <p>Name: {comment.username}</p>
                <p>Email: {comment.email}</p>
                <p>Review: {comment.comment}</p>
                <p>Rating: {renderStars(comment.rating)}</p>
                <hr />
              </div>
            ))}

          <button
            onClick={() => {
              addToCart(filteredById);

              toast.success(
                `${filteredById?.name} added to Cart! 
                  `,
                {
                  position: "top-right",
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
            className="add-to-basket-individual"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              if (isFavorite(filteredById?._id)) {
                removeFromFavorites(filteredById?._id);
              } else {
                addToFavorites(filteredById);
              }
            }}
          >
            {isFavorite(filteredById?._id) ? (
              <button className="remove-from-favorite-individual">
                Remove from Favorites 🤍
              </button>
            ) : (
              <button className="add-to-favorite-individual">
                Add to Favorites ❤️
              </button>
            )}{" "}
          </button>
          <Link to={`/addcomment/${filteredById?._id}`}>
            <button className="add-to-basket">Add Comment</button>
          </Link>
        </div>
        <ToastContainer limit={1} />
      </div>
    </>
  );
}
export default IndividualProduct;
