import axios from "axios";
import React, { FC, useEffect, useReducer } from "react";
import API_CONFIG from "./utils/constants/api-config";
import Header from "./components/layout/header/header";
import BurgerIngredients from "./components/ingredients/burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import {
  IngredientsContext,
  ReceivedDataContext,
  SelectedIngredientsContext,
  TotalPriceContext,
} from "./services/context/appContext";
import BurgerConstructor from "./components/constructor/burger-constructor/burger-constructor";

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

type AppData = {
  bun?: AppBurger[];
  main?: AppBurger[];
  sauce?: AppBurger[];
};

type AppState = {
  ingredients?: AppData;
  isLoading: boolean;
  error?: string;
};

type AppAction =
  | { type: "request" }
  | { type: "success"; payload: AppBurger[] }
  | { type: "failure"; error: string };

const dataReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "request":
      return { isLoading: true };
    case "success":
      return {
        isLoading: false,
        ingredients: {
          bun: action.payload.filter((v) => v.type === "bun"),
          main: action.payload.filter((v) => v.type === "main"),
          sauce: action.payload.filter((v) => v.type === "sauce"),
        },
      };
    case "failure":
      return { isLoading: false, error: action.error };
    default:
      return { ...state };
  }
};

type SelectedIngredientsState = {
  bun: AppBurger[] | [];
  ingredients: AppBurger[] | [];
};

type SelectedIngredientsAction =
  | { type: "add_ingredients"; payload: AppBurger }
  | { type: "add_bun"; payload: AppBurger }
  | { type: "remove"; payload: AppBurger[] };

const selectedIngredientsReducer = (
  state: SelectedIngredientsState,
  action: SelectedIngredientsAction,
) => {
  switch (action.type) {
    case "add_ingredients":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "add_bun":
      return { ...state, bun: [action.payload] };
    case "remove":
      return { ...state, ingredients: action.payload };
    default:
      return { ...state };
  }
};

type TotalPriceState = {
  price: number;
};

type TotalPriceAction = {
  type: string;
  payload: TotalPriceState;
};

const totalPriceReducer = (state: TotalPriceState, action: TotalPriceAction) => {
  switch (action.type) {
    case "refresh":
      return { ...state, price: action.payload.price };
    default:
      return { ...state };
  }
};

interface ReceivedDataOrder {
  number: number;
}

export interface ReceivedDataState {
  name: string;
  order: ReceivedDataOrder;
  success: boolean;
}

export interface ReceivedDataAction {
  type: "add" | "clear";
  payload: ReceivedDataState;
}

export const receivedDataInitialState = {
  name: "",
  order: {
    number: 0,
  },
  success: false,
};

export const receivedDataReducer = (state: ReceivedDataState, action: ReceivedDataAction) => {
  switch (action.type) {
    case "add":
      return {
        name: action.payload.name,
        order: {
          number: action.payload.order.number,
        },
        success: action.payload.success,
      };
    case "clear":
      return { ...receivedDataInitialState };
    default:
      return { ...state };
  }
};

const App: FC = () => {
  const dataReducerInitialState = {
    isLoading: false,
  };
  const [{ ingredients, isLoading, error }, dataDispatcher] = useReducer(
    dataReducer,
    dataReducerInitialState,
  );

  const [totalPrice, totalPriceDispatcher] = useReducer(totalPriceReducer, { price: 0 });

  const selectedIngredientsInitialState = { bun: [], ingredients: [] };

  const [selectedIngredients, selectedIngredientsDispatcher] = useReducer(
    selectedIngredientsReducer,
    selectedIngredientsInitialState,
  );

  const [receivedData, receivedDataDispatcher] = useReducer(
    receivedDataReducer,
    receivedDataInitialState,
  );

  const setSelectedIngredientsHandler = (data: AppBurger, e: React.SyntheticEvent) => {
    e.preventDefault();
    if (data.type !== "bun") {
      selectedIngredientsDispatcher({
        type: "add_ingredients",
        payload: data,
      });
    } else {
      selectedIngredientsDispatcher({
        type: "add_bun",
        payload: data,
      });
    }
  };

  const removeSelectedIngredientsItemHandler = (index: number) => {
    selectedIngredientsDispatcher({
      type: "remove",
      payload: selectedIngredients.ingredients.filter((_v, i) => i !== index),
    });
  };

  useEffect(() => {
    dataDispatcher({ type: "request" });
    axios
      .get(API_CONFIG.URL)
      .then((result) => {
        dataDispatcher({ type: "success", payload: result.data.data });
      })
      .catch((e) => {
        dataDispatcher({ type: "failure", error: e });
      });
  }, []);

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
              }}
            >
              <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
                <ReceivedDataContext.Provider value={{ receivedData, receivedDataDispatcher }}>
                  <BurgerIngredients />
                  <BurgerConstructor />
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
