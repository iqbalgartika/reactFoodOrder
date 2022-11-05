import { useReducer } from "react";
import CartContext from "./cart-context";

const cartItemDefault = {
  items: [],
  amount: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const itemIdx = state.items.findIndex((item) => item.id === action.item.id);
    const newItems = state.items;
    if (itemIdx < 0) {
      newItems.push(action.item);
    } else {
      newItems[itemIdx].amount += action.item.amount;
    }

    return {
      items: newItems,
      amount: state.amount + action.item.amount,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }
  if (action.type === "REMOVE") {
    const itemIdx = state.items.findIndex((item) => item.id === action.id);
    const newItems = state.items;
    newItems[itemIdx].amount--;
    const price = newItems[itemIdx].price;

    if (newItems[itemIdx].amount <= 0) {
      newItems.splice(itemIdx, 1);
    }

    return {
      items: newItems,
      amount: state.amount - 1,
      totalAmount: state.totalAmount - price,
    };
  }
  return cartItemDefault;
};

const CartProvider = (props) => {
  const [cartState, dispatchState] = useReducer(cartReducer, cartItemDefault);

  const addItemHandler = (item) => {
    dispatchState({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchState({ type: "REMOVE", id: id });
  };
  const clearItemsHandler = () => {
    dispatchState({ type: "CLEAR" });
  };

  const cartContext = {
    ...cartState,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItems: clearItemsHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
