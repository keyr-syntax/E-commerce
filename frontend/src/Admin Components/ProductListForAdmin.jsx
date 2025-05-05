import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import Loader from "../Public Components/Loader.jsx";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ProductListForAdmin() {
  const { API_URL, allProducts, fetchAllProductsFordisplay, isLoading } =
    useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [_id, setId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/product/deleteproduct/${_id}`);
      setConfirmDelete(false);
      fetchAllProductsFordisplay();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };
  {
    confirmDelete === true && show === false && handleDelete();
  }

  return (
    <>
      {isLoading === true && <Loader />}
      {isLoading === false && allProducts && allProducts.length > 0 ? (
        <>
          <p
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              margin: " 80px auto 20px auto",
              display: "block",
              textAlign: "center",
              padding: "5px",
              fontSize: "20px",
              width: "85%",
              borderRadius: "8px",
            }}
          >
            Total Numbers of Products <MoveRight /> {allProducts.length}
          </p>
          <Table striped responsive style={{ width: "85%", margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Created/Updated</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr
                  style={{ textAlign: "center", textWrap: "nowrap" }}
                  key={product._id}
                >
                  <td>ID</td>
                  <td>
                    <img
                      style={{ width: " 50px", height: "40px" }}
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{formatCreatedAt(product.createdAt)}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Link
                      style={{
                        textDecoration: "none",
                        border: "1px solid white",
                        backgroundColor: "purple",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        marginRight: "5px",
                      }}
                      to={`/productdetails/${product._id}`}
                    >
                      Open
                    </Link>
                    <Link
                      style={{
                        textDecoration: "none",
                        border: "1px solid white",
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        marginRight: "5px",
                      }}
                      to={`/admin/fetchproductbyid/${product._id}`}
                    >
                      Update
                    </Link>
                    <button
                      style={{
                        textDecoration: "none",
                        border: "1px solid white",
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "6px",
                      }}
                      onClick={() => {
                        setShow(true);
                        setId(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
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
          No products
        </p>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          Are You Sure You want to delete this Product?
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setConfirmDelete(true);
              setShow(false);
            }}
          >
            Yes
          </Button>
          <Button
            style={{ backgroundColor: "green" }}
            onClick={() => {
              setConfirmDelete(false);
              setShow(false);
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductListForAdmin;
