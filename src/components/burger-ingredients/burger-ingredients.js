import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItems from "../burger-ingredient-items/burger-ingredient-items";
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one');
    const [active, setActive] = React.useState('one');
    const bunHeaderElem = document.getElementById('bun_header');
    const sauceHeaderElem = document.getElementById('sauce_header');
    const mainHeaderElem = document.getElementById('main_header');

    const ingredientsRef = React.useRef(null);

    const setCurrentHandler = (name) => setCurrent(name);

    // Custom function for synchronizing scroll position and tabs
    const setTabActiveHandler = () => {
        if (bunHeaderElem && sauceHeaderElem) {
            let elemOnePos = bunHeaderElem.getBoundingClientRect();
            let elemTwoPos = sauceHeaderElem.getBoundingClientRect();
            let containerPos = ingredientsRef.current.getBoundingClientRect();
            const containerOffset = containerPos.top
            const OFFSET_CUSTOM = 70;
            if (elemOnePos.top <= containerOffset + bunHeaderElem.scrollHeight &&
                elemOnePos.top > (containerOffset - bunHeaderElem.nextElementSibling.scrollHeight)) {
                setActive('one');
            } else if (elemTwoPos.top < containerOffset + sauceHeaderElem.scrollHeight &&
                elemTwoPos.top > (containerOffset - sauceHeaderElem.nextElementSibling.scrollHeight + OFFSET_CUSTOM)) {
                setActive('two');
            } else {
                setActive('three');
            }
        }
    }

    const clickScrollHandler = () => {
        if (bunHeaderElem && sauceHeaderElem && mainHeaderElem) {
            let element = current === 'one' ? bunHeaderElem :
                current === 'two' ? sauceHeaderElem : mainHeaderElem;
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
                         active={active === 'one'}
                         onClick={() => current === 'one' ? clickScrollHandler() : setCurrentHandler('one')}>
                        Булки
                    </Tab>
                    <Tab value="two"
                         active={active === 'two'}
                         onClick={() => current === 'two' ? clickScrollHandler() : setCurrentHandler('two')}>
                        Соусы
                    </Tab>
                    <Tab value="three"
                         active={active === 'three'}
                         onClick={() => current === 'three' ? clickScrollHandler() : setCurrentHandler('three')}>
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