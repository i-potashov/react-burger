import React, { useContext } from 'react';
import burgerIngredientItemsStyle from './burger-ingredient-items.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';

import { IngredientsContext, SelectedIngredientsContext } from '../../services/appContext';

export default function BurgerIngredientItems() {
  const { ingredients } = useContext(IngredientsContext);
  const { selectedIngredients, setSelectedIngredientsHandler } = useContext(SelectedIngredientsContext);

  const bunHeaderRef = React.useRef(null);
  const sauceHeaderRef = React.useRef(null);
  const mainHeaderRef = React.useRef(null);

  const [selectIngredient, setSelectIngredient] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);

  const setSelectIngredientHandler = (data) => setSelectIngredient(data);

  const handleOpenModal = (value) => {
    setOpen(true);
    setSelectIngredientHandler(value);
  };

  const handleCloseModal = () => setOpen(false);

  const countCheckHandler = (value) => {
    if (value.type === 'bun') {
      if (selectedIngredients.bun && value.type === 'bun' && selectedIngredients.bun._id === value._id)
        return <Counter count={1} size="default" />;
    }
    if (value.type !== 'bun') {
      let ingredientsCount = selectedIngredients.ingredients.filter((item) => item._id === value._id).length;
      return ingredientsCount > 0 && <Counter count={ingredientsCount} size="default" />;
    }
  };

  const ingredientItemsHandler = (arr) =>
    arr.map((value) => (
      <li
        className={burgerIngredientItemsStyle.item}
        key={value._id}
        onContextMenu={(e) => setSelectedIngredientsHandler(value, e)}
        onClick={() => handleOpenModal(value)}>
        <img className={burgerIngredientItemsStyle.image} src={value.image} alt="" />
        {countCheckHandler(value)}
        <div className={`${burgerIngredientItemsStyle.wrap} ${burgerIngredientItemsStyle.icon}`}>
          <span className={burgerIngredientItemsStyle.price}>{value.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={burgerIngredientItemsStyle.name}>{value.name}</h3>
      </li>
    ));

  return (
    <>
      <Modal onClose={handleCloseModal} isOpen={isOpen}>
        <IngredientDetails selectIngredient={selectIngredient} />
      </Modal>
      <h2 id={'bun_header'} ref={bunHeaderRef}>
        {'Булки'}
      </h2>
      <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(ingredients.bun)}</ul>
      <h2 id={'sauce_header'} ref={sauceHeaderRef}>
        {'Соусы'}
      </h2>
      <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(ingredients.sauce)}</ul>
      <h2 id={'main_header'} ref={mainHeaderRef}>
        {'Начинки'}
      </h2>
      <ul className={burgerIngredientItemsStyle.items}>{ingredientItemsHandler(ingredients.main)}</ul>
    </>
  );
}
