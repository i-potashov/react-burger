import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItems from '../burger-constructor-items/burger-constructor-items';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modals/modal-overlay/modal-overlay';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

export default function BurgerConstructor(props) {
    const [isOpen, setOpen] = React.useState(false);

    const totalPriceHandler = () => {
        let bunPrice = 0;
        let ingredientsPrice = 0;
        if (props.selectedIngredients.bun) bunPrice = props.selectedIngredients.bun.price;
        if (props.selectedIngredients.ingredients.length)
            ingredientsPrice = props.selectedIngredients.ingredients.reduce((prev, next) => {
                return prev + next.price
            }, 0);
        return (
            <p className={burgerConstructorStyles.result_price}>{ingredientsPrice + bunPrice}</p>
        );
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    return (<>
        <ModalOverlay onClose={handleCloseModal} isOpen={isOpen}>
            <Modal onClose={handleCloseModal}>
                <OrderDetails />
            </Modal>
        </ModalOverlay>
        <div className={burgerConstructorStyles.container}>
            <BurgerConstructorItems selectedIngredients={props.selectedIngredients}
                                    deleteHandler={props.deleteHandler}
            />
            <div className={burgerConstructorStyles.result}>
                <div className={burgerConstructorStyles.result__wrap}>
                    {totalPriceHandler()}
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary"
                        size="medium"
                        onClick={() => handleOpenModal()}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    </>)
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.shape({
        bun: menuItemPropTypes,
        ingredients: PropTypes.arrayOf(menuItemPropTypes.isRequired)
    }),
    deleteHandler: PropTypes.func,
}