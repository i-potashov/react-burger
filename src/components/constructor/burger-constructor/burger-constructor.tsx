import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useContext, useState } from "react";
import { updatePrice } from "../../../core/store/actions/total-price";
import ReceivedDataContext from "../../../core/store/context/received-data";
import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";
import TotalPriceContext from "../../../core/store/context/total-price";
import Modal from "../../modals/modal/modal";
import OrderDetails from "../../modals/order-details/order-details";
import BurgerConstructorItems from "../burger-constructor-items/burger-constructor-items";
import BurgerConstructorSendData from "../burger-constructor-send-data/burger-constructor-send-data";
import styles from "./burger-constructor.module.css";

const BurgerConstructor: FC = () => {
  const { selectedIngredients } = useContext(SelectedIngredientsContext);
  const { totalPrice, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { receivedDataDispatcher } = useContext(ReceivedDataContext);
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = (): void => {
    if (receivedDataDispatcher) receivedDataDispatcher("clear");
    setOpen(false);
  };

  useEffect(() => {
    const totalPriceHandler = () => {
      if (selectedIngredients) {
        const bunPrice: number =
          selectedIngredients.bun.length > 0
            ? selectedIngredients.bun
                .map((v) => v.price)
                .reduce((prev, next) => {
                  return prev + next;
                }, 0)
            : 0;
        let ingredientsPrice = 0;
        if (
          selectedIngredients?.ingredients !== undefined &&
          selectedIngredients.ingredients.length > 0
        )
          ingredientsPrice = selectedIngredients.ingredients
            .map((v) => v.price)
            .reduce((prev, next) => {
              return prev + next;
            }, 0);
        if (totalPriceDispatcher) {
          return totalPriceDispatcher(updatePrice({ price: ingredientsPrice + bunPrice * 2 }));
        }
      }
      return null;
    };
    totalPriceHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngredients]);

  return (
    <>
      <Modal onClose={handleCloseModal} isOpen={isOpen}>
        <OrderDetails />
      </Modal>
      <div className={styles.container}>
        <BurgerConstructorItems />
        <div className={styles.result}>
          <div className={styles.result__wrap}>
            <p className={styles.result_price}>{totalPrice?.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          {selectedIngredients && selectedIngredients.ingredients && (
            <BurgerConstructorSendData handleOpenModal={handleOpenModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
