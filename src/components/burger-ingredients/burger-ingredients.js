import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItems from "../burger-ingredient-items/burger-ingredient-items";
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('buns');
    const [active, setActive] = React.useState('buns');
    const bunHeaderElem = document.getElementById('bun_header');
    const sauceHeaderElem = document.getElementById('sauce_header');
    const mainHeaderElem = document.getElementById('main_header');

    const ingredientsRef = React.useRef(null);

    const setCurrentHandler = (name) => setCurrent(name);

    // Custom function for synchronizing scroll position and tabs
    const setTabActiveHandler = () => {
        if (bunHeaderElem && sauceHeaderElem) {
            const elemOnePos = bunHeaderElem.getBoundingClientRect();
            const elemTwoPos = sauceHeaderElem.getBoundingClientRect();
            const containerPos = ingredientsRef.current.getBoundingClientRect();
            const containerOffset = containerPos.top
            const OFFSET_CUSTOM = 70;
            if (elemOnePos.top <= containerOffset + bunHeaderElem.scrollHeight &&
                elemOnePos.top > (containerOffset - bunHeaderElem.nextElementSibling.scrollHeight)) {
                setActive('buns');
            } else if (elemTwoPos.top < containerOffset + sauceHeaderElem.scrollHeight &&
                elemTwoPos.top > (containerOffset - sauceHeaderElem.nextElementSibling.scrollHeight + OFFSET_CUSTOM)) {
                setActive('sauces');
            } else {
                setActive('mains');
            }
        }
    }

    const clickScrollHandler = () => {
        if (bunHeaderElem && sauceHeaderElem && mainHeaderElem) {
            const element = current === 'buns' ? bunHeaderElem :
                current === 'sauces' ? sauceHeaderElem : mainHeaderElem;
            ingredientsRef.current.scrollTo({
                top: element.offsetTop - ingredientsRef.current.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    React.useEffect(() => {
        clickScrollHandler()
    }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className={burgerIngredientsStyles.container}>
                <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
                <div className={burgerIngredientsStyles.tabs}>
                    <Tab value="one"
                         active={active === 'buns'}
                         onClick={() => current === 'buns' ? clickScrollHandler() : setCurrentHandler('buns')}>
                        Булки
                    </Tab>
                    <Tab value="two"
                         active={active === 'sauces'}
                         onClick={() => current === 'sauces' ? clickScrollHandler() : setCurrentHandler('sauces')}>
                        Соусы
                    </Tab>
                    <Tab value="three"
                         active={active === 'mains'}
                         onClick={() => current === 'mains' ? clickScrollHandler() : setCurrentHandler('mains')}>
                        Начинки
                    </Tab>
                </div>
                <div ref={ingredientsRef} onScroll={() => setTabActiveHandler()}
                     className={burgerIngredientsStyles.categories}>
                    <BurgerIngredientItems checked={props.checked}
                                           ingredients={props.ingredients}
                                           selectedIngredientsHandler={props.selectedIngredientsHandler}/>
                </div>
            </div>
        </>
    )
}

BurgerIngredients.propTypes = {
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