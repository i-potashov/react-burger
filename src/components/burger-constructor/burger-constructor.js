import React, { useContext } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItems from '../burger-constructor-items/burger-constructor-items';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';
// import PropTypes from 'prop-types';
// import menuItemPropTypes from '../../utils/constants';
import { SelectedIngredientsContext } from '../../services/appContext';

export default function BurgerConstructor() {
    const { selectedIngredients } = useContext(SelectedIngredientsContext);
    const [isOpen, setOpen] = React.useState(false);

    const totalPriceHandler = () => {
        console.log(selectedIngredients.ingredients);
        if (!selectedIngredients.ingredients.length) {
            return;
        } else {
            let bunPrice = 0;
            let ingredientsPrice = 0;
            if (selectedIngredients.bun) bunPrice = selectedIngredients.bun.price;
            if (selectedIngredients.ingredients.length)
                ingredientsPrice = selectedIngredients.ingredients.reduce((prev, next) => {
                    return prev + next.price;
                }, 0);
            return <p className={burgerConstructorStyles.result_price}>{ingredientsPrice + bunPrice}</p>;
        }
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal onClose={handleCloseModal} isOpen={isOpen}>
                <OrderDetails />
            </Modal>
            <div className={burgerConstructorStyles.container}>
                <BurgerConstructorItems />
                <div className={burgerConstructorStyles.result}>
                    <div className={burgerConstructorStyles.result__wrap}>
                        {totalPriceHandler()}
                        <CurrencyIcon type='primary' />
                    </div>
                    <Button type='primary' size='medium' onClick={() => handleOpenModal()}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    );
}

// BurgerConstructor.propTypes = {
//     selectedIngredients: PropTypes.shape({
//         bun: menuItemPropTypes,
//         ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired),
//     }),
//     deleteHandler: PropTypes.func,
// };
