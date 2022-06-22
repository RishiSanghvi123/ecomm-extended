import { createContext, useReducer } from "react";

//import { createAction } from "../utils/reducer/reducer";

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cartItems, { ...product, quantity: 1 }];
  }
};

// const decrementItemHelper = (cartItems, product) => {
//   return cartItems.map((item) =>
//     item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
//   );
// };

const removeItemHelper = (cartItems, product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

const decrementItemHelper = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== product.id);
  } else {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  decrementItem: () => {},
  removeItem: () => {},
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartTotal: 0,
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_ISCART_OPEN: "TOGGLE_ISCART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_ISCART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type pf ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_ISCART_OPEN, payload: bool });
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const decrementItem = (product) => {
    const newCartItems = decrementItemHelper(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItem = (product) => {
    const newCartItems = removeItemHelper(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    decrementItem,
    removeItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
