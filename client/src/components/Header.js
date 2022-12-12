import React from "react";
import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Drawer from "@material-ui/core/Drawer";
import Cart from "./Cart";
import Badge from "@material-ui/core/Badge";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleRemoveFromCart = (id) => {
    console.log("cartItems: ", cartItems);
    let indexToDelete = cartItems.findIndex((product) => product.id === id);
    let newArr = [];
    if (cartItems[indexToDelete].amount > 1) {
      newArr = [...cartItems];
      newArr[indexToDelete].amount--;
    } else {
      newArr = [...cartItems];
      newArr.splice(indexToDelete, 1);
    }
    setCartItems(newArr);
  };
  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const getTotalItems = (items) =>
    items.reduce((ack, item) => ack + item.amount, 0);

  return (
    <Router>
      <Drawer
        className="drawer_container"
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">WendyLand</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to={"/home"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/About"}>
                  About
                </Nav.Link>
                <Nav.Link as={Link} to={"/Contact"}>
                  Contact
                </Nav.Link>
                <NavDropdown title="sortBy" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    everyThing
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">price</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">name</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
            <div className="bas_logo">
              {/* <IconContext.Provider value={{ color: "black" }}> */}
              {/* <FaShoppingCart /> */}
              {/* <Button onClick={() => setCartOpen(true)}> */}

              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCartIcon
                  className="cart_buttom"
                  color="black"
                  onClick={() => setCartOpen(true)}
                />
              </Badge>
              {/* </Button> */}
              {/* </IconContext.Provider> */}
            </div>
          </Container>
        </Navbar>
      </div>

      <div>
        <Routes>
          <Route
            exact
            path="/Home"
            element={<Home handleAddToCart={handleAddToCart} />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route
            exact
            path="*"
            element={<Home handleAddToCart={handleAddToCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
