import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../../utils/constants';

const IngredientDetails = (props) => {
    return (
        <div className={ingredientDetailsStyles.container}>
            <h4 className={ingredientDetailsStyles.title}>Детали ингредиента</h4>
            <img
                className={ingredientDetailsStyles.image}
                src={props.selectIngredient.image_large}
                alt={props.selectIngredient.name}
            />
            <p className={ingredientDetailsStyles.text}>{props.selectIngredient.name}</p>
            <ul className={ingredientDetailsStyles.wrap}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
                    <span className={ingredientDetailsStyles.item__count}>{props.selectIngredient.calories}</span>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
                    <span className={ingredientDetailsStyles.item__count}>{props.selectIngredient.proteins}</span>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
                    <span className={ingredientDetailsStyles.item__count}>{props.selectIngredient.fat}</span>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
                    <span className={ingredientDetailsStyles.item__count}>{props.selectIngredient.carbohydrates}</span>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    selectIngredient: PropTypes.shape({
        bun: PropTypes.arrayOf(menuItemPropTypes.isRequired),
        sauce: PropTypes.arrayOf(menuItemPropTypes.isRequired),
        main: PropTypes.arrayOf(menuItemPropTypes.isRequired),
    }),
};

export default IngredientDetails;
