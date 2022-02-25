import React from 'react';
import appStyles from './app.module.css';
import DATA_MENU from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App() {
    const [state, setState] = React.useState({bun: [], main: [], sauce: []})
    const [selectedIngredients, setSelectedIngredients] = React.useState({bun: null, ingredients: []});

    const setStateHandler = (bunArr, mainArr, sauceArr) =>
        setState({bun: bunArr, main: mainArr, sauce: sauceArr});

    const setSelectedIngredientsHandler = (data) =>
        setSelectedIngredients(
            data.type === 'bun' ? {...selectedIngredients, bun: data} :
                {...selectedIngredients, ingredients: [...selectedIngredients.ingredients, data]});

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

    React.useEffect(() => {
        let tmpBun = [], tmpMain = [], tmpSauce = [];
        DATA_MENU.map(value => {
            if (value.type === "bun") return tmpBun.push(value);
            else if (value.type === "main") return tmpMain.push(value);
            else if (value.type === "sauce") return tmpSauce.push(value);
            return null;
        });
        setStateHandler(sortNameHandler(tmpBun), sortNameHandler(tmpMain), sortNameHandler(tmpSauce));
    }, []);

    return (
        <div className={appStyles.page}>
            <AppHeader/>
            <main className={appStyles.main}>
                <BurgerIngredients selectedIngredientsHandler={setSelectedIngredientsHandler}
                                   bun={state.bun}
                                   main={state.main}
                                   sauce={state.sauce}
                                   checked={selectedIngredients}
                />
                <BurgerConstructor selectedIngredients={selectedIngredients}
                                   deleteHandler={removeSelectedIngredientsItemHandler}
                />
            </main>
        </div>
    );
}