/* eslint-disable no-underscore-dangle */
// import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useContext } from "react";
import { v4 as uuid } from "uuid";
import styles from "./burger-ingredient-items.module.css";
import sortArray from "../../../core/utils/sortArray";
import Modal from "../../modals/modal/modal";
import IngredientDetails from "../../modals/ingredient-details/ingredient-details";
import IngredientsContext from "../../../core/store/context/ingredients";
// import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";
import { IBurgerModel } from "../../../core/models/burger.model";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

type AppIngredients = {
  bunHeaderRef: React.RefObject<HTMLHeadingElement>;
  sauceHeaderRef: React.RefObject<HTMLHeadingElement>;
  mainHeaderRef: React.RefObject<HTMLHeadingElement>;
};

const BurgerIngredientItems: FC<AppIngredients> = ({
  bunHeaderRef,
  sauceHeaderRef,
  mainHeaderRef,
}) => {
  const ingredients = useContext(IngredientsContext);
  // const { selectedIngredients, setSelectedIngredientsHandler } = useContext(
  //   SelectedIngredientsContext,
  // );
  const [selectIngredient, setSelectIngredient] = React.useState<IBurgerModel>();
  const [isOpen, setOpen] = React.useState(false);
  const { bun, main, sauce } = ingredients;

  const handleOpenModal = (value: IBurgerModel): void => {
    setOpen(true);
    setSelectIngredient(value);
  };

  const handleCloseModal = () => setOpen(false);

  // const countCheckHandler = (value: IBurgerModel) => {
  //   if (value.type === "bun") {
  //     const tmpCount = selectedIngredients?.bun.filter((v) => v._id === value._id).length;
  //     if (tmpCount) {
  //       return <Counter count={tmpCount} size="default" />;
  //     }
  //   } else {
  //     const tmpCount = selectedIngredients?.ingredients.filter((v) => v._id === value._id).length;
  //     if (tmpCount) {
  //       return <Counter count={tmpCount} size="default" />;
  //     }
  //   }
  //   return null;
  // };

  const ingredientItemsHandler = (arr: IBurgerModel[]) => {
    return sortArray(arr).map((value: IBurgerModel, index: number) => (
      <BurgerIngredient
        value={value}
        handleOpenModal={handleOpenModal}
        key={uuid()}
        index={index}
      />
    ));
  };

  return (
    <>
      {selectIngredient && (
        <Modal onClose={handleCloseModal} isOpen={isOpen}>
          <IngredientDetails selectIngredient={selectIngredient} />
        </Modal>
      )}

      {bun && sauce && main && (
        <>
          <h2 id="bun_header" ref={bunHeaderRef}>
            Булки
          </h2>
          <ul className={styles.items}>{ingredientItemsHandler(bun)}</ul>
          <h2 id="sauce_header" ref={sauceHeaderRef}>
            Соусы
          </h2>
          <ul className={styles.items}>{ingredientItemsHandler(sauce)}</ul>
          <h2 id="main_header" ref={mainHeaderRef}>
            Начинки
          </h2>
          <ul className={styles.items}>{ingredientItemsHandler(main)}</ul>
        </>
      )}
    </>
  );
};

export default BurgerIngredientItems;
