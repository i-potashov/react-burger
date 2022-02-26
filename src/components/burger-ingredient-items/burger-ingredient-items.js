import React from 'react';
import burgerIngredientItemsStyle from './burger-ingredient-items.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modals/modal/modal';
import ModalOverlay from '../modals/modal-overlay/modal-overlay';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

const BurgerIngredientItems = (props) => {

    const bunHeaderRef = React.useRef(null);
    const sauceHeaderRef = React.useRef(null);
    const mainHeaderRef = React.useRef(null);

    const [selectIngredient, setSelectIngredient] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);

    const setSelectIngredientHandler = (data) => setSelectIngredient(data);

    const handleOpenModal = (value) => {
        setOpen(true);
        setSelectIngredientHandler(value);
    }

    const handleCloseModal = () => setOpen(false);

    const countCheckHandler = (value) => {
        if (value.type === 'bun') {
            if (props.checked.bun && value.type === 'bun' && props.checked.bun._id === value._id)
                return (<Counter count={1} size="default"/>)
        }
        if (value.type !== 'bun') {
            let ingredientsCount = props.checked.ingredients.filter(item => item._id === value._id).length;
            return ingredientsCount > 0 && (<Counter count={ingredientsCount} size="default"/>)
        }
    }

    const ingredientItemsHandler = (arr) => (
        arr.map((value, i) => (
            <li className={burgerIngredientItemsStyle.item}
                key={value._id}
                onContextMenu={(e) => props.selectedIngredientsHandler(value, e)}
                onClick={() => handleOpenModal(value)}
            >
                <img className={burgerIngredientItemsStyle.image}
                     src={value.image}
                     alt=""/>
                {countCheckHandler(value)}
                <div className={`${burgerIngredientItemsStyle.wrap} ${burgerIngredientItemsStyle.icon}`}>
                    <span className={burgerIngredientItemsStyle.price}>{value.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <h3 className={burgerIngredientItemsStyle.name}>{value.name}</h3>
            </li>
        )));

    return (
        <>
            <ModalOverlay onClose={handleCloseModal} isOpen={isOpen}>
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails selectIngredient={selectIngredient}/>
                </Modal>
            </ModalOverlay>
            <h2 id={'bun_header'} ref={bunHeaderRef}>{'Булки'}</h2>
            <ul className={burgerIngredientItemsStyle.items}>
                {ingredientItemsHandler(props.ingredients.bun)}
            </ul>
            <h2 id={'sauce_header'} ref={sauceHeaderRef}>{'Соусы'}</h2>
            <ul className={burgerIngredientItemsStyle.items}>
                {ingredientItemsHandler(props.ingredients.sauce)}
            </ul>
            <h2 id={'main_header'} ref={mainHeaderRef}>{'Начинки'}</h2>
            <ul className={burgerIngredientItemsStyle.items}>
                {ingredientItemsHandler(props.ingredients.main)}
            </ul>
        </>
    )
}

export default BurgerIngredientItems;

BurgerIngredientItems.propTypes = {
    selectedIngredientsHandler: PropTypes.func,
    ingredients: PropTypes.shape({
        bun: PropTypes.arrayOf(menuItemPropTypes.isRequired),
        sauce: PropTypes.arrayOf(menuItemPropTypes.isRequired),
        main: PropTypes.arrayOf(menuItemPropTypes.isRequired),
    }),
    checked: PropTypes.shape({
        bun: menuItemPropTypes,
        ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired)
    }),
}