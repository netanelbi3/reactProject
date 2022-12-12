import React from "react";
import Button from "@material-ui/core/Button";
import Rating from "@mui/material/Rating";

const Products = (props) => {
  const { id, name, img, description, price, currency, rating } = props.item;
  const handleAddToCart = props.handleAddToCart;
  console.log(props.item);
  return (
    <div className="card" key={id}>
      <div className="card_img">
        <img src={img} />
      </div>
      <div className="card_header">
        {<h2>{name}</h2>}
        <p>{description}</p>
        <p className="price">
          {price}
          {<span>{currency}</span>}
        </p>
        <Rating name="half-rating" value={rating} precision={0.5} readOnly />
        <Button onClick={() => handleAddToCart(props.item)}>Add to cart</Button>
      </div>
    </div>
  );
};
export default Products;
