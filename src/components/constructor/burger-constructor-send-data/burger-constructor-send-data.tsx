import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext, useState } from "react";
import {
  ReceivedDataContext,
  SelectedIngredientsContext,
} from "../../../services/context/appContext";

interface HandleOpenModal {
  handleOpenModal: () => void;
}

const BurgerConstructorSendData: FC<HandleOpenModal> = ({ handleOpenModal }) => {
  const { selectedIngredients } = useContext(SelectedIngredientsContext);

  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    hasError: false,
  });

  const { receivedDataDispatcher } = useContext(ReceivedDataContext);
  const loadingHandler = () => setLoadingState({ hasError: false, isLoading: true });
  const loadedHandler = () => setLoadingState({ ...loadingState, isLoading: false });
  const errorHandler = () => setLoadingState({ hasError: true, isLoading: false });

  const sendData = async () => {
    loadingHandler();
    try {
      const res = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          bun: selectedIngredients?.bun[0],
          ingredients: selectedIngredients?.ingredients,
        }),
      });
      const data = await res.json();
      loadedHandler();
      return data;
    } catch (error) {
      errorHandler();
    }
    return null;
  };

  const setData = () => {
    sendData()
      .then((data) => {
        if (receivedDataDispatcher) receivedDataDispatcher({ type: "add", payload: data });
      })
      .then(() => handleOpenModal());
  };

  return (
    <>
      {selectedIngredients && selectedIngredients.ingredients && (
        <Button
          disabled={!selectedIngredients.bun.length || !selectedIngredients.ingredients.length}
          type="primary"
          size="medium"
          onClick={() => setData()}
        >
          Оформить заказ
        </Button>
      )}
    </>
  );
};

export default BurgerConstructorSendData;
