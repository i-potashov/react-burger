import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'one',
            active: 'one'
        };
    }

    componentDidMount() {
        let elementOne = document.getElementById('scroll-to-one');
        let elementTwo = document.getElementById('scroll-to-two');
        let ingredientsContainer = document.querySelector('#ingredients')
        if (elementOne && elementTwo) {
            ingredientsContainer.addEventListener('scroll', () => this.tabActiveHandler(elementOne, elementTwo, ingredientsContainer))
        }
    }

    tabActiveHandler = (elemOne, elemTwo, container) => {
        let elemOnePos = elemOne.getBoundingClientRect();
        let elemTwoPos = elemTwo.getBoundingClientRect();

        if (elemOnePos.top <= 288+elemOne.scrollHeight && elemOnePos.top > (288 - elemOne.nextElementSibling.scrollHeight)) {
            this.setState(prevState => ({...prevState, active: 'one'}))
        } else if (elemTwoPos.top < 288 + elemTwo.scrollHeight && elemTwoPos.top > (288 - elemTwo.nextElementSibling.scrollHeight + 70)) {
            this.setState(prevState => ({...prevState, active: 'two'}))
        } else {
            this.setState(prevState => ({...prevState, active: 'three'}))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.current !== prevState.current) {
                let ingredientsWindow = document.querySelector('#ingredients')
                let element = document.getElementById(`scroll-to-${this.state.current}`);
                ingredientsWindow.scrollTo({
                    top: element.offsetTop - ingredientsWindow.offsetTop,
                    behavior: 'smooth'
                })
        }
    }

    scrollClickHandler= () => {
        let ingredientsWindow = document.querySelector('#ingredients')
        let element = document.getElementById(`scroll-to-${this.state.current}`);
        ingredientsWindow.scrollTo({
            top: element.offsetTop - ingredientsWindow.offsetTop,
            behavior: 'smooth'
        })
    }

    clickScrollHandler=()=> {
        let ingredientsWindow = document.querySelector('#ingredients')
        let element = document.getElementById(`scroll-to-${this.state.current}`);
        ingredientsWindow.scrollTo({
            top: element.offsetTop - ingredientsWindow.offsetTop,
            behavior: 'smooth'
        })
    }

    countCheckHandler = (value) => {
        if (value.type === 'bun') {
            if (this.props.checked.bun && value.type === 'bun' && this.props.checked.bun._id === value._id)
                return <Counter count={1} size="default"/>
        }

        if (value.type !== 'bun') {
            let ingredientsCount = this.props.checked.ingredients.filter(item => item._id === value._id).length;
            return ingredientsCount > 0 && <Counter count={ingredientsCount} size="default"/>
        }
    }

    categoryListHandler = (title, anchor, arr) =>
        <>
            <h2 id={`scroll-to-${anchor}`}>{title}</h2>
            <ul className={burgerIngredientsStyles.items}>
                {arr.map((value, index) => {
                    return (
                        <li className={burgerIngredientsStyles.item}
                            key={index}
                            onClick={() => this.props.selectedIngredientsHandler(value)}>
                            <img className={burgerIngredientsStyles.image}
                                 src={value.image}
                                 alt=""/>
                            {this.countCheckHandler(value)}
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

    render() {
        return (
            <div className={burgerIngredientsStyles.container}>
                <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
                <div style={{display: 'flex'}} className={burgerIngredientsStyles.tabs}>
                    <Tab value="one"
                         active={this.state.active === 'one'}
                         onClick={(e) => {
                             if(this.state.current === 'one') {
                                 this.clickScrollHandler()
                             } else {
                                 this.setState(prevState => ({...prevState, current: 'one'}))
                             }
                         }}>
                        Булки
                    </Tab>
                    <Tab value="two"
                         active={this.state.active === 'two'}
                         onClick={(e) => {
                             if(this.state.current === 'two') {
                                 this.clickScrollHandler()
                             } else {
                                 this.setState(prevState => ({...prevState, current: 'two'}))
                             }

                         }}>
                        Соусы
                    </Tab>
                    <Tab value="three"
                         active={this.state.active === 'three'}
                         onClick={(e) => {
                             if(this.state.current === 'three') {
                                 this.clickScrollHandler()
                             } else {
                                 this.setState(prevState => ({...prevState, current: 'three'}))
                             }

                         }}>
                        Начинки
                    </Tab>
                </div>
                <div id={'ingredients'} className={burgerIngredientsStyles.categories}>
                    {this.categoryListHandler('Булки', 'one', this.props.bun)}
                    {this.categoryListHandler('Соусы', 'two', this.props.sauce)}
                    {this.categoryListHandler('Начинки', 'three', this.props.main)}
                </div>
            </div>
        )
    }
}

export default BurgerIngredients;