import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import ListGroup from "react-bootstrap/ListGroup";
function IndividualProduct() {
  return (
    <>
      <CardGroup style={{ marginTop: "80px" }}>
        <Card style={{ maxWidth: "18rem", margin: "5px 20px" }}>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
            fluid
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ maxWidth: "18rem", margin: "5px 20px" }}>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
            fluid
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}
export default IndividualProduct;

//

//

// import { useContext, useEffect } from "react";
// import { ProductContext } from "./ContextProvider";
// import { Link, useParams } from "react-router-dom";
// import "./IndividualProduct.css";
// import Loader from "./Loader";
// import toast from "react-hot-toast";
// function IndividualProduct() {
//   const { _id } = useParams();

//   const {
//     fetchProductById,
//     renderStars,
//     addToFavorites,
//     removeFromFavorites,
//     isFavorite,
//     addToCart,
//     filteredById,
//     isLoading,
//   } = useContext(ProductContext);

//   useEffect(() => {
//     if (_id) {
//       fetchProductById(_id);
//     }
//   }, [_id]);

//   return (
//     <>
//       {isLoading === true && <Loader />}
//       {isLoading === false && filteredById ? (
//         <div className="individual-product-container">
//           <div className="individual-product-image-div" key={filteredById._id}>
//             <img
//               className="individual-product-image"
//               src={filteredById.image}
//               alt={filteredById.name}
//             />
//           </div>
//           <div className="individual-product-description">
//             <h4 className="individual-product-h4">Name:{filteredById.name}</h4>
//             <p className="individual-product-p">Price: ${filteredById.price}</p>
//             <p className="individual-product-p">Brand: ${filteredById.brand}</p>
//             <p className="individual-product-p">
//               Rating: {renderStars(filteredById.rating)}{" "}
//             </p>
//             <p className="individual-product-p">
//               Category: {filteredById.category}
//             </p>
//             <p className="individual-product-p">
//               Description: {filteredById.description}
//             </p>
//             <p className="individual-product-p">
//               In-Stock: {filteredById.countInStock}
//             </p>
//             <p className="individual-product-p">
//               Reviews: {filteredById.numReviews}
//             </p>
//             {filteredById &&
//               filteredById.comments &&
//               filteredById.comments.map(
//                 (comment) =>
//                   comment &&
//                   comment.username &&
//                   comment.email &&
//                   comment.comment &&
//                   comment.rating && (
//                     <div key={comment._id}>
//                       <p>Name: {comment.username}</p>
//                       <p>Email: {comment.email}</p>
//                       <p>Review: {comment.comment}</p>
//                       <p>Rating: {renderStars(comment.rating)}</p>
//                       <hr />
//                     </div>
//                   )
//               )}

//             <button
//               onClick={() => {
//                 addToCart(filteredById);
//                 toast.success(`${filteredById.name} added to cart`);
//               }}
//               className="add-to-basket-individual"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => {
//                 if (isFavorite(filteredById?._id)) {
//                   removeFromFavorites(filteredById?._id);
//                 } else {
//                   addToFavorites(filteredById);
//                 }
//               }}
//             >
//               {isFavorite(filteredById?._id) ? (
//                 <button className="remove-from-favorite-individual">
//                   Remove from Favorites 🤍
//                 </button>
//               ) : (
//                 <button className="add-to-favorite-individual">
//                   Add to Favorites ❤️
//                 </button>
//               )}{" "}
//             </button>
//             <Link to={`/addcomment/${filteredById?._id}`}>
//               <button className="add-to-basket">Add Comment</button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }
// export default IndividualProduct;
