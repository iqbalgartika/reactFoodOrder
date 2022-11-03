import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const cartItems = ctx.items.map((item) => (
    <CartItem
      {...item}
      key={item.id}
      onRemove={() => {
        ctx.removeItem(item.id);
      }}
      onAdd={() => {
        ctx.addItem({ ...item, amount: 1 });
      }}
    />
  ));

  return (
    <Modal onClick={props.onCloseCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {ctx.amount > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
