import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bump, setBump] = useState(false);
  const ctx = useContext(CartContext);
  useEffect(() => {
    if (ctx.amount === 0) {
      return;
    }
    setBump(true);
    const timerId = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [ctx.amount]);

  return (
    <div>
      <button
        className={`${classes.button} ${bump && classes.bump}`}
        onClick={props.onClick}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{ctx.amount}</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
