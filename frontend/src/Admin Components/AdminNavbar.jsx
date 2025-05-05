import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./AdminNavbar.css";
import { useState } from "react";
import toast from "react-hot-toast";

function AdminNavbar() {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "#151533",
          color: "white",
          border: "1px solid rgb(255,255,255,0.2)",
        }}
        expand="md"
        className=" mb-3"
      >
        <Container fluid>
          <Navbar.Brand className="fs-4 text-light" as={Link} to="/">
            Syntax
          </Navbar.Brand>
          <Navbar.Toggle
            className="toggler"
            aria-controls="offcanvasNavbar-expand-md"
          />
          <Navbar.Offcanvas
            style={{ backgroundColor: "#151533", color: "white" }}
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                style={{ color: "white" }}
                id="offcanvasNavbarLabel-expand-md"
              >
                Syntax
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <NavDropdown
                  className="dropdown"
                  title="Products"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item as={Link} to="/admin/productlistforadmin">
                    Manage Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/createproduct">
                    Create Product
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="dropdown"
                  title="Category"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item as={Link} to="/admin/allcategory">
                    Manage Category
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/createcategory">
                    Create Category
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="dropdown"
                  title="Orders"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item as={Link} to="/admin/allorders">
                    All Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/paidorders">
                    Paid Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/unpaidorders">
                    Payment Pending Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/deliverypending">
                    Delivery Pending Orders
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  style={{ color: "white", fontSize: "18px" }}
                  as={Link}
                  to="/admin/customers"
                >
                  Customers
                </Nav.Link>
                <Nav.Link
                  style={{ color: "white", fontSize: "18px" }}
                  as={Link}
                  to="/admin/analytics"
                >
                  Analytics
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  value={searchWord}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                  }}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button
                  onClick={() => {
                    if (!searchWord) {
                      toast.error("Please write something...");
                    } else {
                      navigate(`/fetchproductbykeyword/${searchWord}`);
                    }
                  }}
                  variant="outline-success"
                >
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default AdminNavbar;
