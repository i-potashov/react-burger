import React, { useReducer } from 'react';
import appStyles from './app.module.css';
import API_CONFIG from '../../utils/api-config';
import { ADD, REMOVE, BUN, SAUCE, MAIN } from '../../utils/names';
import { SelectedIngredientsContext, IngredientsContext } from '../../services/appContext';
import { TotalPriceContext, ReceivedDataContext } from '../../services/appContext';
import { selectedIngredientsInitialState, selectedIngredientsReducer } from './app-reducer';
import { totalPriceInitialState, totalPriceReducer } from './app-reducer';
import { receivedDataInitialState, receivedDataReducer } from './app-reducer';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  const [ingredients, setIngredients] = React.useState({
    bun: [],
    main: [],
    sauce: [],
  });

  const [selectedIngredients, selectedIngredientsDispatcher] = useReducer(
    selectedIngredientsReducer,
    selectedIngredientsInitialState
  );

  const [totalPrice, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);

  const [receivedData, receivedDataDispatcher] = useReducer(receivedDataReducer, receivedDataInitialState, undefined);

  const setSelectedIngredientsHandler = (data, e) => {
    e.preventDefault();
    selectedIngredientsDispatcher({
      type: ADD,
      data: data,
      selectedIngredients,
    });
  };

  const removeSelectedIngredientsItemHandler = (index) => {
    // ! TODO: rewrite with filter method
    const tmpIngredients = selectedIngredients.ingredients;
    tmpIngredients.splice(index, 1);
    selectedIngredientsDispatcher({
      type: REMOVE,
      selectedIngredients: selectedIngredients,
      tmpIngredients: tmpIngredients,
    });
  };

  const loadingHandler = () => setState({ ...state, hasError: false, isLoading: true });
  const loadedHandler = (data) => setState({ ...state, data, isLoading: false });
  const errorHandler = () => setState({ ...state, hasError: true, isLoading: false });

  const setIngredientsHandler = (bunArr, mainArr, sauceArr) =>
    setIngredients({ bun: bunArr, main: mainArr, sauce: sauceArr });

  const sortNameHandler = (arr) => {
    return arr.sort((a, b) => {
      const nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
  };

  const getBurgersData = () => {
    const tmpBun = [],
      tmpMain = [],
      tmpSauce = [];
    state.data.forEach((value) => {
      switch (value.type) {
        case BUN:
          tmpBun.push(value);
          break;
        case SAUCE:
          tmpSauce.push(value);
          break;
        case MAIN:
          tmpMain.push(value);
          break;
        default:
          return null;
      }
    });
    setIngredientsHandler(sortNameHandler(tmpBun), sortNameHandler(tmpMain), sortNameHandler(tmpSauce));
  };

  React.useEffect(() => {
    const getData = async () => {
      loadingHandler();
      try {
        const res = await fetch(API_CONFIG.URL);
        const { data } = await res.json();
        loadedHandler(data);
      } catch (error) {
        errorHandler();
        console.log(`Error: ${error.message}`);
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (state.data) {
      getBurgersData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data]);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.main}>
        {state.data && (
          <IngredientsContext.Provider value={{ ingredients }}>
            <SelectedIngredientsContext.Provider
              value={{
                selectedIngredients,
                setSelectedIngredientsHandler,
                removeSelectedIngredientsItemHandler,
              }}>
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
}
