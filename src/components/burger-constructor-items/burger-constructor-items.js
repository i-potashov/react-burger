import React, { useContext } from 'react';
import burgerConstructorItemsStyles from './burger-constructor-items.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { SelectedIngredientsContext } from '../../services/appContext';

export default function BurgerConstructorItems() {
    const { selectedIngredients, removeSelectedIngredientsItemHandler } = useContext(SelectedIngredientsContext);

    const ingredientsShowHandler = (ingredient, icon, position, index = null, locked = true) => (
        <ConstructorElement
            type={position}
            isLocked={locked}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => removeSelectedIngredientsItemHandler(index)}
        />
    );

    return (
        <>
            {selectedIngredients.bun && (
                <div className={burgerConstructorItemsStyles.item_ban}>
                    {ingredientsShowHandler(selectedIngredients.bun, 'lock', 'top')}
                </div>
            )}

            <ul className={burgerConstructorItemsStyles.items}>
                {selectedIngredients.ingredients.map((value, index) => (
                    <li className={burgerConstructorItemsStyles.item} key={index}>
                        <DragIcon type='primary' />
                        <div className={burgerConstructorItemsStyles.item__container}>
                            {ingredientsShowHandler(value, 'delete', undefined, index, false)}
                        </div>
                    </li>
                ))}
            </ul>

            {selectedIngredients.bun && (
                <div className={burgerConstructorItemsStyles.item_ban_bottom}>
                    {ingredientsShowHandler(selectedIngredients.bun, 'lock', 'bottom')}
                </div>
            )}
        </>
    );
}
