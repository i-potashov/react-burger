import React from 'react';
import appStyles from './app.module.css';
import API_CONFIG from "../../utils/api-config";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App() {
    const [state, setState] = React.useState({isLoading: false, hasError: false, data: null});
    const [ingredients, setIngredients] = React.useState({bun: [], main: [], sauce: []})
    const [selectedIngredients, setSelectedIngredients] = React.useState({bun: null, ingredients: []});

    const loadingHandler = () => setState({...state, hasError: false, isLoading: true});
    const loadedHandler = (data) => setState({...state, data, isLoading: false});
    const errorHandler = (data) => setState({...state, hasError: true, isLoading: false});

    const setIngredientsHandler = (bunArr, mainArr, sauceArr) =>
        setIngredients({bun: bunArr, main: mainArr, sauce: sauceArr});

    const setSelectedIngredientsHandler = (data, e) => {
        e.preventDefault();
        setSelectedIngredients(
            data.type === 'bun' ? {...selectedIngredients, bun: data} :
                {...selectedIngredients, ingredients: [...selectedIngredients.ingredients, data]});
    }

    const removeSelectedIngredientsItemHandler = (index) => {
        let tmpIngredients = selectedIngredients.ingredients;
        tmpIngredients.splice(index, 1);
        setSelectedIngredients({...selectedIngredients, ingredients: tmpIngredients});
    }

    const sortNameHandler = (arr) => {
        return arr.sort((a, b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
        })
    }

    const getBurgersData = () => {
        let tmpBun = [], tmpMain = [], tmpSauce = [];
        state.data.map(value => {
            if (value.type === "bun") return tmpBun.push(value);
            else if (value.type === "main") return tmpMain.push(value);
            else if (value.type === "sauce") return tmpSauce.push(value);
            return null;
        });
        setIngredientsHandler(sortNameHandler(tmpBun), sortNameHandler(tmpMain), sortNameHandler(tmpSauce));
    }



    React.useEffect(() => {
            const getData = async () => {
                loadingHandler();
                await fetch(API_CONFIG.URL)
                    .then(res => res.json())
                    .then(res => loadedHandler(res.data))
                    .catch(e => errorHandler());
            };
            getData().then();
        }
        , []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (state.data) {
            getBurgersData()
        }
    }, [state.data]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={appStyles.page}>
            <AppHeader/>
            <main className={appStyles.main}>
                {state.data &&
                    (<>
                        <BurgerIngredients selectedIngredientsHandler={setSelectedIngredientsHandler}
                                           checked={selectedIngredients}
                                           ingredients={ingredients}
                        />
                        <BurgerConstructor selectedIngredients={selectedIngredients}
                                           deleteHandler={removeSelectedIngredientsItemHandler}
                        />
                    </>)
                }
            </main>
        </div>
    );
}