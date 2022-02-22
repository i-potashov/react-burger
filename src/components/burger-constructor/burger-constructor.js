import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import {CurrencyIcon, Button, DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component {

    ingredientsShowHandler = (ingredient, icon, position, index = null, locked = true) =>
        <>
            <ConstructorElement type={position}
                                isLocked={locked}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => this.props.deleteHandler(index)}/>
        </>

    totalPriceHandler = () => {
        let bunPrice = 0;
        let ingredientsPrice = 0;
        if (this.props.selectedIngredients.bun) bunPrice = this.props.selectedIngredients.bun.price;
        if (this.props.selectedIngredients.ingredients.length)
            ingredientsPrice = this.props.selectedIngredients.ingredients.reduce((prev, next) => {
                return prev + next.price
            }, 0);
        return <p className={burgerConstructorStyles.result_price}>{ingredientsPrice + bunPrice}</p>
    }

    render() {
        return (
            <div className={burgerConstructorStyles.container}>
                {this.props.selectedIngredients.bun &&
                    (<div className={burgerConstructorStyles.item_ban}>
                        {this.ingredientsShowHandler(this.props.selectedIngredients.bun, 'lock', 'top')}
                    </div>)}

                <ul className={burgerConstructorStyles.items}>
                    {this.props.selectedIngredients.ingredients.map((value, index) =>
                        (<li className={burgerConstructorStyles.item} key={index}>
                            <DragIcon type="primary"/>
                            <div className={burgerConstructorStyles.item__container}>
                                {this.ingredientsShowHandler(value, 'delete', undefined, index, false)}
                            </div>
                        </li>))}
                </ul>

                {this.props.selectedIngredients.bun &&
                    (<div className={burgerConstructorStyles.item_ban_bottom}>
                        {this.ingredientsShowHandler(this.props.selectedIngredients.bun, 'lock', 'bottom')}
                    </div>)}

                <div className={burgerConstructorStyles.result}>
                    <div className={burgerConstructorStyles.result__wrap}>
                        {this.totalPriceHandler()}
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="medium">Оформить заказ</Button>
                </div>
            </div>
        )
    }
}

export default BurgerConstructor;