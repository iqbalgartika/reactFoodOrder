import React from "react";

const CartContext = React.createContext({
  items: [],
  amount: 0,
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
});

export default CartContext;
