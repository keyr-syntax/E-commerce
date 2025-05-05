import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {
  const { API_URL, fetchAllProductCategory } = useContext(ProductContext);
  const [category, setCategory] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      fetchCategoryById();
    }
  }, [_id]);
  const fetchCategoryById = async () => {
    try {
      const data = await fetch(
        `${API_URL}/api/category/fetchcategorybyid/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();

      if (response.success === true) {
        setCategory(response.category.category);
      }
    } catch (error) {
      console.log("Error while fetching category", error.message);
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `${API_URL}/api/category/updatecategory/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ category }),
        }
      );
      const response = await data.json();
      if (response.success === true) {
        console.log("Category created", response);
        toast.success("Category updated successfully");
        setCategory("");
        fetchAllProductCategory();
        setTimeout(() => {
          navigate("/admin/allcategory");
        }, 2000);
      }
    } catch (error) {
      console.log("Error while creating category", error.message);
    }
  };
  return (
    <>
      <Container
        className="mx-auto"
        style={{ maxWidth: "500px", marginTop: "70px" }}
      >
        <Form
          style={{
            backgroundColor: "#151533",
            border: "1px solid rgb(255,255,255,0.2)",
            padding: "10px 20px",
            minWidth: "250px",
          }}
          onSubmit={handleUpdateCategory}
          className="mb-5"
        >
          <p className="text-center text-light">Update Category</p>
          <Form.Group className="mb-3" controlId="category name">
            <Form.Label style={{ textWrap: "nowrap" }} className="text-light">
              Category Name
            </Form.Label>
            <Form.Control
              style={{
                border: "1px solid rgb(255,255,255,0.2)",
                minWidth: "50%",
                textWrap: "nowrap",
              }}
              type="text"
              placeholder="Name of Category"
              name="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Button
            style={{
              display: "block",
              margin: "10px auto",
              backgroundColor: "#151533",
              border: "1px solid rgb(255,255,255,0.2)",
              minWidth: "50%",
              textWrap: "nowrap",
            }}
            type="submit"
          >
            Update Category
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UpdateCategory;
