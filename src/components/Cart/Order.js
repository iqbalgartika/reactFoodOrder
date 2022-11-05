import { useRef, useState } from "react";
import classes from "./Order.module.css";

const isNotEmpty = (val) => val.trim() !== "";
const isNotFiveChar = (val) => val.trim().length === 5;

const Order = (props) => {
  const [isFormValid, setIsFormValid] = useState({
    nameValid: true,
    streetValid: true,
    postalValid: true,
    cityValid: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameValid = isNotEmpty(name);
    const streetValid = isNotEmpty(street);
    const postalValid = isNotFiveChar(postal);
    const cityValid = isNotEmpty(city);

    setIsFormValid({
      nameValid: nameValid,
      streetValid: streetValid,
      postalValid: postalValid,
      cityValid: cityValid,
    });

    const formValidation = nameValid && streetValid && postalValid && cityValid;
    if (!formValidation) {
      return;
    }

    props.onSubmit({ name, street, postal, city });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !isFormValid.nameValid && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!isFormValid.nameValid && <p>Name field is not valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.streetValid && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!isFormValid.streetValid && <p>Street field is not valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.postalValid && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!isFormValid.postalValid && <p>Postal Code must be 5 chars</p>}
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.cityValid && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!isFormValid.cityValid && <p>City field is not valid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Order;
