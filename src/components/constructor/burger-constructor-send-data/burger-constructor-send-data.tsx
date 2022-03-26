import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import axios from "axios";
import { FC, useContext } from "react";
import API_CONFIG from "../../../core/config/api-config";
import { addReceived, failure, receive } from "../../../core/store/actions/received-data";
import ReceivedDataContext from "../../../core/store/context/received-data";
import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";

interface HandleOpenModal {
  handleOpenModal: () => void;
}

const BurgerConstructorSendData: FC<HandleOpenModal> = ({ handleOpenModal }) => {
  const { selectedIngredients } = useContext(SelectedIngredientsContext);
  const { receivedDataDispatcher } = useContext(ReceivedDataContext);

  const setData = () => {
    if (receivedDataDispatcher) {
      receivedDataDispatcher(receive());
      axios
        .post(API_CONFIG.SEND_URL, {
          bun: selectedIngredients?.bun[0],
          ingredients: selectedIngredients?.ingredients,
        })
        .then((result) => {
          receivedDataDispatcher(addReceived({ receivedData: result.data }));
          handleOpenModal();
        })
        .catch((e) => {
          receivedDataDispatcher(failure({ receivedError: e }));
        });
    }
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
