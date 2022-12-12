import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../App";
// Styles
// import { Wrapper } from "./CartItem.styles";

// type Props = {
//   item: CartItemType;
//   addToCart: (clickedItem: CartItemType) => void;
//   removeFromCart: (id: number) => void;
// };

const CartItem = ({ item, addToCart, removeFromCart }) => (
  // <Wrapper>
  <div>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <img src={item.img} height="100" width="100"></img>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </div>
  // </Wrapper>
);

export default CartItem;
