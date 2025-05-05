import { useState, useContext } from "react";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import toast from "react-hot-toast";

function CreateProduct() {
  const { API_URL, allCategories, fetchAllProductsFordisplay } =
    useContext(ProductContext);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");
  //
  const handleCloudinaryFileUpload = (e) => {
    const image = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setPreview(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${API_URL}/api/product/createproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          brand,
          price,
          category,
          image: preview,
        }),
      });
      const response = await data.json();
      if (response.success) {
        setName("");
        setPreview("");
        setBrand("");
        setCategory("");
        setPrice("");
        toast.success("Product created successfully");
        fetchAllProductsFordisplay();
      }
    } catch (error) {
      console.log("Error while creating product", error);
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
          onSubmit={handleCreateProduct}
          className="mb-5"
        >
          <h4 className="text-center text-light">Create Product</h4>
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
              type="file"
              name="image"
              onChange={handleCloudinaryFileUpload}
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
            Create Product
          </Button>
        </Form>
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "80%",
        }}
      >
        <h4>Image Preview</h4>
        <img src={preview} />
      </div>
    </>
  );
}

export default CreateProduct;
