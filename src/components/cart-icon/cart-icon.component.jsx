import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggle = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggle} />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
