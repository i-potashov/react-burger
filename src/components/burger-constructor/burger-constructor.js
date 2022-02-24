import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerConstructor(props) {

    const totalPriceHandler = () => {
        let bunPrice = 0;
        let ingredientsPrice = 0;
        if (props.selectedIngredients.bun) bunPrice = props.selectedIngredients.bun.price;
        if (props.selectedIngredients.ingredients.length)
            ingredientsPrice = props.selectedIngredients.ingredients.reduce((prev, next) => {
                return prev + next.price
            }, 0);
        return (
            <p className={burgerConstructorStyles.result_price}>{ingredientsPrice + bunPrice}</p>
        );
    }

    return (
        <div className={burgerConstructorStyles.container}>
            <IngredientItem selectedIngredients={props.selectedIngredients}
                            deleteHandler={props.deleteHandler}
            />
            <div className={burgerConstructorStyles.result}>
                <div className={burgerConstructorStyles.result__wrap}>
                    {totalPriceHandler()}
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="medium">Оформить заказ</Button>
            </div>
        </div>
    )
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.shape({
        bun: menuItemPropTypes,
        ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired)
    }),
    deleteHandler: PropTypes.func,
}