import { FC, useContext } from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuid } from "uuid";
import styles from "./burger-constructor-items.module.css";
import { SelectedIngredientsContext } from "../../../services/context/appContext";

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

const BurgerConstructorItems: FC = () => {
  const { selectedIngredients, removeSelectedIngredientsItemHandler } = useContext(
    SelectedIngredientsContext,
  );

  const ingredientsShowHandler = (
    ingredient: AppBurger,
    position: "top" | "bottom" | undefined,
    index?: number,
    locked: boolean = true,
  ) => (
    <ConstructorElement
      type={position}
      isLocked={locked}
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={() => {
        if (removeSelectedIngredientsItemHandler) removeSelectedIngredientsItemHandler(index);
      }}
      key={uuid()}
    />
  );

  return (
    <>
      {selectedIngredients && (
        <>
          <div className={styles.item_ban}>
            {selectedIngredients.bun.map((v) => ingredientsShowHandler(v, "top"))}
          </div>
          <ul className={styles.items}>
            {selectedIngredients.ingredients.map((value, index) => (
              <li className={styles.item} key={uuid()}>
                <DragIcon type="primary" />
                <div className={styles.item__container}>
                  {ingredientsShowHandler(value, undefined, index, false)}
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.item_ban_bottom}>
            {selectedIngredients.bun.map((v) => ingredientsShowHandler(v, "bottom"))}
          </div>
        </>
      )}
    </>
  );
};

export default BurgerConstructorItems;
