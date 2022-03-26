import { FC } from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";

type AppBurger = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

interface Props {
  selectIngredient: AppBurger;
}

const IngredientDetails: FC<Props> = ({ selectIngredient }) => {
  return (
    <div className={ingredientDetailsStyles.container}>
      {selectIngredient && (
        <>
          <h4 className={ingredientDetailsStyles.title}>Детали ингредиента</h4>
          <img
            className={ingredientDetailsStyles.image}
            src={selectIngredient.image_large}
            alt={selectIngredient.name}
          />
          <p className={ingredientDetailsStyles.text}>{selectIngredient.name}</p>
          <ul className={ingredientDetailsStyles.wrap}>
            <li className={ingredientDetailsStyles.item}>
              <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
              <span className={ingredientDetailsStyles.item__count}>
                {selectIngredient.calories}
              </span>
            </li>
            <li className={ingredientDetailsStyles.item}>
              <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
              <span className={ingredientDetailsStyles.item__count}>
                {selectIngredient.proteins}
              </span>
            </li>
            <li className={ingredientDetailsStyles.item}>
              <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
              <span className={ingredientDetailsStyles.item__count}>{selectIngredient.fat}</span>
            </li>
            <li className={ingredientDetailsStyles.item}>
              <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
              <span className={ingredientDetailsStyles.item__count}>
                {selectIngredient.carbohydrates}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
