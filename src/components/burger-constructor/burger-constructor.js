import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";

class BurgerConstructor extends React.Component {
    render() {
        return (
            <div className={burgerConstructorStyles.container}>
            </div>
        )
    }
}

export default BurgerConstructor;