import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import DATA_MENU from "../../utils/data";

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'one',
            bun: [],
            main: [],
            sauce: [],
        };
    }

    componentDidMount() {
        this.ingredientsArrHandler();
    }

    ingredientsArrHandler = () => {
        let tmpBun = [], tmpMain = [], tmpSauce = [];
        DATA_MENU.map((value, index) => {
            if (value.type === "bun") return tmpBun.push(value);
            else if (value.type === "main") return tmpMain.push(value);
            else if (value.type === "sauce") return tmpSauce.push(value);
            return null;
        });
        this.setState(prevState => ({...prevState, bun: tmpBun, main: tmpMain, sauce: tmpSauce}));
    }

    categoryListHandler = (title, arr) => {
        return (
            <div className={burgerIngredientsStyles.category}>
                <h2>{title}</h2>
                <ul className={burgerIngredientsStyles.items}>
                    {arr.map((value, index) => {
                        return (
                            <li className={burgerIngredientsStyles.item} key={index}>
                                <img className={burgerIngredientsStyles.image} src={value.image} alt=""/>
                                <div className={`${burgerIngredientsStyles.wrap} ${burgerIngredientsStyles.icon}`}>
                                    <span className={burgerIngredientsStyles.price}>{value.price}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                                <h3 className={burgerIngredientsStyles.name}>{value.name}</h3>
                            </li>
                        )
                    })}
                </ul>
            </div>)
    }

    render() {

        return (
            <div className={burgerIngredientsStyles.container}>
                <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
                <div style={{display: 'flex'}} className={burgerIngredientsStyles.tabs}>
                    <Tab value="one" active={this.state.current === 'one'}
                         onClick={(e) => this.setState({current: 'one'})}>
                        Булки
                    </Tab>
                    <Tab value="two" active={this.state.current === 'two'}
                         onClick={(e) => this.setState({current: 'two'})}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={this.state.current === 'three'}
                         onClick={(e) => this.setState({current: 'three'})}>
                        Начинки
                    </Tab>
                </div>
                <div className={burgerIngredientsStyles.categories}>

                    {this.categoryListHandler('Булки', this.state.bun)}
                    {this.categoryListHandler('Соусы', this.state.sauce)}
                    {this.categoryListHandler('Начинки', this.state.main)}

                </div>

            </div>
        )
    }
}

export default BurgerIngredients;