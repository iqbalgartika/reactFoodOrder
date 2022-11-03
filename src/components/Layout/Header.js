import classes from "./Header.module.css";
import imageMeal from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Meal Order</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={imageMeal} alt="Deliciouso!" />
      </div>
    </>
  );
};

export default Header;
