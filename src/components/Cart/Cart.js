import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Order from "./Order";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");
  const ctx = useContext(CartContext);

  const submitHandler = async (userData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:9000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          meals: ctx.items,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      console.log(data);

      setIsSubmitting(false);
      setResult("Meals ordered!");
      ctx.clearItems();
    } catch (error) {
      setIsSubmitting(false);
      setResult(error.message);
    }
  };

  //contents
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

  let action = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {ctx.amount > 0 && (
        <button className={classes.button} onClick={() => setIsOrdering(true)}>
          Order
        </button>
      )}
    </div>
  );
  if (isOrdering) {
    action = <Order onClose={props.onCloseCart} onSubmit={submitHandler} />;
  }

  let modalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {action}
    </>
  );

  if (isSubmitting) {
    modalContent = <p>Submitting...</p>;
  }

  if (result !== "") {
    modalContent = (
      <>
        <p>{result}</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onCloseCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal onClick={props.onCloseCart}>{modalContent}</Modal>;
};

export default Cart;
