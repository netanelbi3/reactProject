import React, { useState, useEffect } from "react";
import Products from "./Products";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./Home.css";
import products from "../data/products_data";

function valuetext(value) {
  return `${value}°C`;
}
function Home({ handleAddToCart }) {
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = React.useState([0, 500]);
  const [productslis, setProductlis] = useState(products);
  const [prodInit, setProdinit] = useState(products);
  const [selectedCategory, setCategory] = useState(null);

  useEffect(() => {
    filterCombined();
  }, [selectedCategory, value]);

  function filterCombined() {
    let newProducts = prodInit;
    if (selectedCategory != null) {
      newProducts = prodInit.filter((item) => {
        return (
          item.type === selectedCategory &&
          item.price >= value[0] &&
          item.price <= value[1]
        );
      });
    } else {
      newProducts = prodInit.filter((item) => {
        return item.price >= value[0] && item.price <= value[1];
      });
    }
    setProductlis(newProducts);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // priceLimit();
  };
  return (
    <div className="conteiner_home">
      <Container className="p-3 mb-2 bg-light text-dark">
        <nav>
          <div className="select">
            <Form.Select
              onChange={(e) => setCategory(e.target.value)}
              size="sm"
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="mobile">all-mobile</option>
              <option value="Accessories">Accessories</option>
              <option value="price">price high to low</option>
            </Form.Select>
          </div>
          <Box sx={{ width: 140 }}>
            <h6>sort by price</h6>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              max={500}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
        </nav>
      </Container>
      <div className="main_content">
        {productslis.map((item) => {
          return (
            <Products item={item} handleAddToCart={handleAddToCart}></Products>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
