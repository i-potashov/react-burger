import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one');
    const [active, setActive] = React.useState('one');

    const ingredientsRef = React.useRef(null);
    const oneElementRef = React.useRef(null);
    const twoElementRef = React.useRef(null);
    const threeElementRef = React.useRef(null);

    const setCurrentHandler = (name) => setCurrent(name);

    // Custom function for synchronizing scroll position and tabs
    const setTabActiveHandler = () => {
        let elemOnePos = oneElementRef.current.getBoundingClientRect();
        let elemTwoPos = twoElementRef.current.getBoundingClientRect();
        let containerPos = ingredientsRef.current.getBoundingClientRect();
        const containerOffset = containerPos.top
        const OFFSET_CUSTOM = 70;

        if (elemOnePos.top <= containerOffset + oneElementRef.current.scrollHeight &&
            elemOnePos.top > (containerOffset - oneElementRef.current.nextElementSibling.scrollHeight)) {
            setActive('one');
        } else if (elemTwoPos.top < containerOffset + twoElementRef.current.scrollHeight &&
            elemTwoPos.top > (containerOffset - twoElementRef.current.nextElementSibling.scrollHeight + OFFSET_CUSTOM)) {
            setActive('two');
        } else {
            setActive('three');
        }
    }

    const clickScrollHandler = () => {
        let element = current === 'one' ? oneElementRef.current :
            current === 'two' ? twoElementRef.current : threeElementRef.current;
        ingredientsRef.current.scrollTo({
            top: element.offsetTop - ingredientsRef.current.offsetTop, behavior: 'smooth'
        });
    }

    React.useEffect(clickScrollHandler, [current]);

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

    const categoryListHandler = (title, anchor, arr) => (
        <>
            {anchor === 'one' && (<h2 ref={oneElementRef}>{title}</h2>)}
            {anchor === 'two' && (<h2 ref={twoElementRef}>{title}</h2>)}
            {anchor === 'three' && (<h2 ref={threeElementRef}>{title}</h2>)}

            <ul className={burgerIngredientsStyles.items}>
                {arr.map((value) => {
                    return (
                        <li className={burgerIngredientsStyles.item}
                            key={value._id}
                            onClick={() => props.selectedIngredientsHandler(value)}>
                            <img className={burgerIngredientsStyles.image}
                                 src={value.image}
                                 alt=""/>
                            {countCheckHandler(value)}
                            <div className={`${burgerIngredientsStyles.wrap} ${burgerIngredientsStyles.icon}`}>
                                <span className={burgerIngredientsStyles.price}>{value.price}</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                            <h3 className={burgerIngredientsStyles.name}>{value.name}</h3>
                        </li>
                    )
                })}
            </ul>
        </>
    )

    return (
        <div className={burgerIngredientsStyles.container}>
            <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
            <div style={{display: 'flex'}} className={burgerIngredientsStyles.tabs}>
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
                {categoryListHandler('Булки', 'one', props.bun)}
                {categoryListHandler('Соусы', 'two', props.sauce)}
                {categoryListHandler('Начинки', 'three', props.main)}
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    selectedIngredientsHandler: PropTypes.func,
    bun: PropTypes.arrayOf(menuItemPropTypes.isRequired),
    main: PropTypes.arrayOf(menuItemPropTypes.isRequired),
    sauce: PropTypes.arrayOf(menuItemPropTypes.isRequired),
    checked: PropTypes.shape({
        bun: menuItemPropTypes,
        ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired)
    }),
}