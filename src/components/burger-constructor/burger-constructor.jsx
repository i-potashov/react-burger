import React, { useContext } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ADD, REFRESH, CLEAR } from '../../utils/names';
import BurgerConstructorItems from '../burger-constructor-items/burger-constructor-items';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';
import { SelectedIngredientsContext, TotalPriceContext, ReceivedDataContext } from '../../services/appContext';

export default function BurgerConstructor() {
  const [loadingState, setLoadingState] = React.useState({
    isLoading: false,
    hasError: false,
  });

  const { selectedIngredients } = useContext(SelectedIngredientsContext);
  const [isOpen, setOpen] = React.useState(false);

  const { totalPrice, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { receivedDataDispatcher } = useContext(ReceivedDataContext);

  const loadingHandler = () => setLoadingState({ hasError: false, isLoading: true });
  const loadedHandler = () => setLoadingState({ ...loadingState, isLoading: false });
  const errorHandler = () => setLoadingState({ hasError: true, isLoading: false });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    receivedDataDispatcher(CLEAR);
    setOpen(false);
  };

  const sendData = async () => {
    loadingHandler();
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(selectedIngredients),
      });
      const data = await res.json();
      loadedHandler();
      return data;
    } catch (error) {
      errorHandler();
      console.log(`Error: ${error.message}`);
    }
  };

  const setData = () => {
    sendData()
      .then((data) => {
        receivedDataDispatcher({ type: ADD, data });
      })
      .then(() => handleOpenModal())
      .catch((error) => {
        errorHandler();
        console.log(`Error: ${error.message}`);
      });
  };

  React.useEffect(() => {
    const totalPriceHandler = () => {
      const bunPrice = selectedIngredients.bun ? selectedIngredients.bun.price * 2 : 0;
      let ingredientsPrice = 0;
      if (selectedIngredients.ingredients.length)
        ingredientsPrice = selectedIngredients.ingredients.reduce((prev, next) => {
          return prev + next.price;
        }, 0);
      return totalPriceDispatcher({
        type: REFRESH,
        price: ingredientsPrice + bunPrice,
      });
    };
    totalPriceHandler();
  }, [selectedIngredients]);

  return (
    <>
      <Modal onClose={handleCloseModal} isOpen={isOpen}>
        <OrderDetails />
      </Modal>
      <div className={burgerConstructorStyles.container}>
        <BurgerConstructorItems />
        <div className={burgerConstructorStyles.result}>
          <div className={burgerConstructorStyles.result__wrap}>
            <p className={burgerConstructorStyles.result_price}>{totalPrice.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            disabled={!selectedIngredients.bun || !selectedIngredients.ingredients.length}
            type="primary"
            size="medium"
            onClick={() => setData()}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}
