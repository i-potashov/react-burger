import React from 'react';
import burgerConstructorItemsStyles from './burger-constructor-items.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerConstructorItems(props) {
    const ingredientsShowHandler = (ingredient, icon, position, index = null, locked = true) =>
        (
            <ConstructorElement type={position}
                                isLocked={locked}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => props.deleteHandler(index)}
            />
        )

    return (
        <>
            {props.selectedIngredients.bun &&
                (<div className={burgerConstructorItemsStyles.item_ban}>
                    {ingredientsShowHandler(props.selectedIngredients.bun, 'lock', 'top')}
                </div>)}

            <ul className={burgerConstructorItemsStyles.items}>
                {props.selectedIngredients.ingredients.map((value, index) =>
                    (<li className={burgerConstructorItemsStyles.item} key={index}>
                        <DragIcon type="primary"/>
                        <div className={burgerConstructorItemsStyles.item__container}>
                            {ingredientsShowHandler(value, 'delete', undefined, index, false)}
                        </div>
                    </li>))}
            </ul>

            {props.selectedIngredients.bun &&
                (<div className={burgerConstructorItemsStyles.item_ban_bottom}>
                    {ingredientsShowHandler(props.selectedIngredients.bun, 'lock', 'bottom')}
                </div>)}
        </>
    )
}

BurgerConstructorItems.propTypes = {
    selectedIngredients: PropTypes.shape({
        bun: menuItemPropTypes,
        ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired)
    }),
    deleteHandler: PropTypes.func,
}
