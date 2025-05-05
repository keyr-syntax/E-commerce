import Table from "react-bootstrap/Table";
import { formatDistanceToNow } from "date-fns";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function AllCategory() {
  const { API_URL, fetchAllProductCategory, allCategories } =
    useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [_id, setId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/category/deletecategory/${_id}`);
      toast.success("Category deleted successfully");
      setConfirmDelete(false);
      fetchAllProductCategory();
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
      <p
        style={{
          border: "1px solid rgba(255, 255, 255, 0.1)",
          margin: " 20px auto 20px auto",
          display: "block",
          textAlign: "center",
          padding: "5px",
          fontSize: "20px",
          width: "85%",
          borderRadius: "8px",
        }}
      >
        List of All Product Categories
      </p>
      {allCategories && allCategories.length > 0 ? (
        <Table striped responsive style={{ width: "85%", margin: "auto" }}>
          <thead>
            <tr style={{ textAlign: "center", textWrap: "nowrap" }}>
              <th>ID</th>

              <th>Name</th>
              <th>Created/Updated</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((category) => (
              <tr
                style={{ textAlign: "center", textWrap: "nowrap" }}
                key={category._id}
              >
                <td>ID</td>

                <td>{category.category}</td>
                <td>{formatCreatedAt(category.createdAt)}</td>

                <td>
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
                    to={`/admin/updatecategory/${category._id}`}
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
                      setId(category._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
          No Category Found
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
          Are You Sure You want to delete this Category?
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

export default AllCategory;
