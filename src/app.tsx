/* eslint-disable no-underscore-dangle */
import axios from "axios";
import { FC, useEffect, useReducer } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import update from "immutability-helper";
import API_CONFIG from "./core/config/api-config";
import Header from "./components/layout/header/header";
import BurgerIngredients from "./components/ingredients/burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "./components/constructor/burger-constructor/burger-constructor";
import IngredientsContext from "./core/store/context/ingredients";
import SelectedIngredientsContext from "./core/store/context/selected-ingredients";
import TotalPriceContext from "./core/store/context/total-price";
import ReceivedDataContext from "./core/store/context/received-data";
import { dataReducerInitialState, dataReducer } from "./core/store/reducers/data";
import { totalPriceInitialState, totalPriceReducer } from "./core/store/reducers/total-price";
import { receivedDataInitialState, receivedDataReducer } from "./core/store/reducers/received-data";
import {
  selectedIngredientsInitialState,
  selectedIngredientsReducer,
} from "./core/store/reducers/selected-ingredients";
import { IBurgerModel } from "./core/models/burger.model";
import { failure, request, success } from "./core/store/actions/data";
import {
  addBun,
  addIngredients,
  changeIngredients,
  removeIngredient,
} from "./core/store/actions/selected-ingredients";

const App: FC = () => {
  const [{ ingredients, isLoading, error }, dataDispatcher] = useReducer(
    dataReducer,
    dataReducerInitialState,
  );

  const [totalPrice, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState);

  const [selectedIngredients, selectedIngredientsDispatcher] = useReducer(
    selectedIngredientsReducer,
    selectedIngredientsInitialState,
  );

  const [{ receivedData }, receivedDataDispatcher] = useReducer(
    receivedDataReducer,
    receivedDataInitialState,
  );

  const setSelectedIngredientsHandler = (data: IBurgerModel) => {
    if (data.type !== "bun") {
      selectedIngredientsDispatcher(addIngredients(data));
    } else {
      selectedIngredientsDispatcher(addBun(data));
    }
  };

  const removeSelectedIngredientsItemHandler = (index: number) => {
    selectedIngredientsDispatcher(
      removeIngredient(selectedIngredients.ingredients.filter((_v, i) => i !== index)),
    );
  };

  const changeSelectedIngredientsItemHandler = (data: IBurgerModel[]) => {
    selectedIngredientsDispatcher(changeIngredients(data));
  };

  useEffect(() => {
    dataDispatcher(request());
    axios
      .get(API_CONFIG.URL)
      .then((result) => {
        dataDispatcher(success(result.data.data));
      })
      .catch((e) => {
        dataDispatcher(failure(e));
      });
  }, []);

  const onDragEnd: any = (result: { source: any; destination: any; draggableId: any }) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (ingredients?.bun && ingredients?.main && ingredients?.sauce) {
      if (
        destination.droppableId === "BURGER_CONSTRUCTOR" &&
        source.droppableId === "BUN_INGREDIENTS_LIST"
      ) {
        const tmpItem = [...ingredients.bun, ...ingredients.main, ...ingredients.sauce].filter(
          (v) => v._id === draggableId,
        )[0];
        if (tmpItem) setSelectedIngredientsHandler(tmpItem);
      }

      if (
        destination.droppableId === "BURGER_CONSTRUCTOR" &&
        source.droppableId !== "BUN_INGREDIENTS_LIST"
      ) {
        changeSelectedIngredientsItemHandler(
          update<IBurgerModel[], any>(selectedIngredients?.ingredients, {
            $splice: [
              [source.index, 1],
              [destination.index, 0, selectedIngredients?.ingredients[source.index]],
            ],
          }),
        );
      }
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {isLoading && <span className={styles.title}>...Загрузка</span>}
        {error && (
          <span className={styles.title}>
            Ошибка загрузки данных, попробуйте перезагрузить страницу
          </span>
        )}
        {ingredients && (
          <IngredientsContext.Provider value={ingredients}>
            <SelectedIngredientsContext.Provider
              value={{
                selectedIngredients,
                setSelectedIngredientsHandler,
                removeSelectedIngredientsItemHandler,
                changeSelectedIngredientsItemHandler,
              }}
            >
              <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
                <ReceivedDataContext.Provider value={{ receivedData, receivedDataDispatcher }}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </DragDropContext>
                </ReceivedDataContext.Provider>
              </TotalPriceContext.Provider>
            </SelectedIngredientsContext.Provider>
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
};

export default App;
