import React from "react";
import appStyles from "./app.module.css";
import DATA_MENU from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bun: [],
            main: [],
            sauce: [],
            selectedIngredients: {
                bun: null,
                ingredients: []
            }
        };
    }

    componentDidMount() {
        this.ingredientsArrHandler();
    }

    deleteItemHandler = (index) => {
        let tmpIngredients = this.state.selectedIngredients.ingredients;
        tmpIngredients.splice(index, 1)
        this.setState(prevState => ({
            ...prevState,
            selectedIngredients: {
                ...prevState.selectedIngredients,
                ingredients: tmpIngredients
            }
        }))
    }

    ingredientsArrHandler = () => {
        let tmpBun = [], tmpMain = [], tmpSauce = [];
        DATA_MENU.map((value, index) => {
            if (value.type === "bun") return tmpBun.push(value);
            else if (value.type === "main") return tmpMain.push(value);
            else if (value.type === "sauce") return tmpSauce.push(value);
            return null;
        });
        this.setState(prevState => ({...prevState, bun: tmpBun, main: tmpMain, sauce: tmpSauce}));
    }

    selectedIngredientsHandler = (arr) => {
        if (arr.type === 'bun') {
            this.setState(prevState => ({
                ...prevState, selectedIngredients: {
                    ...prevState.selectedIngredients, bun: arr
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                selectedIngredients: {
                    ...prevState.selectedIngredients,
                    ingredients: [...prevState.selectedIngredients.ingredients, arr]
                }
            }));
        }
    }

    render() {
        return (
            <div className={appStyles.page}>
                <AppHeader/>
                <main className={appStyles.main}>
                    <BurgerIngredients selectedIngredientsHandler={this.selectedIngredientsHandler}
                                       bun={this.state.bun}
                                       main={this.state.main}
                                       sauce={this.state.sauce}
                                       checked={this.state.selectedIngredients}
                    />
                    <BurgerConstructor selectedIngredients={this.state.selectedIngredients}
                                       deleteHandler={this.deleteItemHandler}
                    />
                </main>
            </div>
        );
    }
}

export default App;
