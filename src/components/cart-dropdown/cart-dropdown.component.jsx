import "./cart-dropdown.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
      <Link className="logo-container" to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
