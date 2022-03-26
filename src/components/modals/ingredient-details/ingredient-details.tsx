import { FC } from "react";
import { IBurgerModel } from "../../../core/models/burger.model";
import styles from "./ingredient-details.module.css";

interface Props {
  selectIngredient: IBurgerModel;
}

const IngredientDetails: FC<Props> = ({ selectIngredient }) => {
  return (
    <div className={styles.container}>
      {selectIngredient && (
        <>
          <h4 className={styles.title}>Детали ингредиента</h4>
          <img
            className={styles.image}
            src={selectIngredient.image_large}
            alt={selectIngredient.name}
          />
          <p className={styles.text}>{selectIngredient.name}</p>
          <ul className={styles.wrap}>
            <li className={styles.item}>
              <p className={styles.item__text}>Калории,ккал</p>
              <span className={styles.item__count}>{selectIngredient.calories}</span>
            </li>
            <li className={styles.item}>
              <p className={styles.item__text}>Белки, г</p>
              <span className={styles.item__count}>{selectIngredient.proteins}</span>
            </li>
            <li className={styles.item}>
              <p className={styles.item__text}>Жиры, г</p>
              <span className={styles.item__count}>{selectIngredient.fat}</span>
            </li>
            <li className={styles.item}>
              <p className={styles.item__text}>Углеводы, г</p>
              <span className={styles.item__count}>{selectIngredient.carbohydrates}</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
