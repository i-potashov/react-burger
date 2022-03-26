/* eslint-disable no-underscore-dangle */
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useContext } from "react";
import { v4 as uuid } from "uuid";
import burgerIngredientItemsStyle from "./burger-ingredient-items.module.css";
import sortArray from "../../../utils/helpers/sortArray.helpers";
import {
  IngredientsContext,
  SelectedIngredientsContext,
} from "../../../services/context/appContext";
import Modal from "../../modals/modal/modal";
import IngredientDetails from "../../modals/ingredient-details/ingredient-details";

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
  const { selectedIngredients, setSelectedIngredientsHandler } = useContext(
    SelectedIngredientsContext,
  );
  const { bun, main, sauce } = ingredients;
  const [selectIngredient, setSelectIngredient] = React.useState<AppBurger>();
  const [isOpen, setOpen] = React.useState(false);

  const handleOpenModal = (value: AppBurger): void => {
    setOpen(true);
    setSelectIngredient(value);
  };

  const handleCloseModal = () => setOpen(false);

  const countCheckHandler = (value: AppBurger) => {
    if (value.type === "bun") {
      const tmpCount = selectedIngredients?.bun.filter((v) => v._id === value._id).length;
      if (tmpCount) {
        return <Counter count={tmpCount} size="default" />;
      }
    } else {
      const tmpCount = selectedIngredients?.ingredients.filter((v) => v._id === value._id).length;
      if (tmpCount) {
        return <Counter count={tmpCount} size="default" />;
      }
    }
    return null;
  };

  const ingredientItemsHandler = (arr: AppBurger[]) => {
    return sortArray(arr).map((value: AppBurger) => (
      <li key={uuid()}>
        <div
          role="presentation"
          className={burgerIngredientItemsStyle.item}
          key={value._id}
          onContextMenu={(e) =>
            setSelectedIngredientsHandler ? setSelectedIngredientsHandler(value, e) : null
          }
          onClick={() => handleOpenModal(value)}
        >
          <img className={burgerIngredientItemsStyle.image} src={value.image} alt="" />
          {countCheckHandler(value)}
          <div className={`${burgerIngredientItemsStyle.wrap} ${burgerIngredientItemsStyle.icon}`}>
            <span className={burgerIngredientItemsStyle.price}>{value.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <h3 className={burgerIngredientItemsStyle.name}>{value.name}</h3>
        </div>
      </li>
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
          <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(bun)}</ul>
          <h2 id="sauce_header" ref={sauceHeaderRef}>
            Соусы
          </h2>
          <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(sauce)}</ul>
          <h2 id="main_header" ref={mainHeaderRef}>
            Начинки
          </h2>
          <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(main)}</ul>
        </>
      )}
    </>
  );
};

export default BurgerIngredientItems;
