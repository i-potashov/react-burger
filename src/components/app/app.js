import React from "react";
import appStyles from "./app.module.css";
import DATA_MENU from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={appStyles.page}>
                <AppHeader/>
                <main className={appStyles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </div>
        );
    }
}

export default App;
