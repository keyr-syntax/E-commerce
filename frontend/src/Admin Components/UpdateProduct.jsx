import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
function UpdateProduct() {
  const { _id } = useParams();
  const { API_URL, allCategories, fetchAllProductsFordisplay, setIsLoading } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  //   const [preview, setPreview] = useState("");
  //   const handleCloudinaryFileUpload = (e) => {
  //     const image = e.target.files[0];
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(image);
  //   };
  useEffect(() => {
    if (_id) {
      fetchProductById();
    }
  }, [_id]);

  const fetchProductById = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `${API_URL}/api/product/fetchproductbyid/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        console.log("fetchProductById is working", response);
        const productById = response.product;
        setName(productById.name);
        setImage(productById.image);
        setBrand(productById.brand);
        setCategory(productById.category);
        setPrice(productById.price);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching product by ID", error);
    }
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetch(`${API_URL}/api/product/updateproduct/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          brand,
          price,
          category,
          image,
        }),
      });
      const response = await data.json();
      if (response.success === true) {
        console.log("product update", response.updatedProduct);
        toast.success("Product updated successfully");
        fetchAllProductsFordisplay();
        setIsLoading(false);
        setTimeout(() => {
          navigate("/admin/productlistforadmin");
        }, 2000);
      }
    } catch (error) {
      console.log("Error while updating product", error);
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
          }}
          onSubmit={handleUpdateProduct}
          className="mb-5"
        >
          <h4 className="text-center text-light">Update Product</h4>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="text-light">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of Product"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label className="text-light">Product Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Upload Image"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label className="text-light">Product Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              aria-label="product brand"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label className="text-light">Product Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              aria-label="product price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Product Category">
            <Form.Label className="text-light">Product Category</Form.Label>
            <Form.Select
              type="text"
              placeholder="Product Category"
              name="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value="">Select a category</option>
              {allCategories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            style={{
              backgroundColor: "#151533",
              border: "1px solid rgb(255,255,255,0.2)",
            }}
            type="submit"
            className="w-100"
          >
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UpdateProduct;
