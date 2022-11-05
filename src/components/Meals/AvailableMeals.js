import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://movies-b1f65-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );
        const data = await res.json();

        const fetchedMeals = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            fetchedMeals.push({
              id: key,
              ...data[key],
            });
          }
        }

        setMeals(fetchedMeals);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  let content = <p className={classes['meals-loading']}>No meals found</p>;
  if (meals.length > 0) {
    content = (
      <div className={classes.meals}>
        <Card>
          <ul>
            {meals.map((meal) => {
              return <MealItem key={meal.id} {...meal} />;
            })}
          </ul>
        </Card>
      </div>
    );
  }
  if (error) {
    content = <p className={classes['meals-error']}>{error}</p>;
  }
  if (isLoading) {
    content = <p className={classes['meals-loading']}>Loading...</p>;
  }

  return content;
};

export default AvailableMeals;
