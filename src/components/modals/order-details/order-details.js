import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import checkImage from '../../../images/graphics.svg';
import PropTypes from "prop-types";

const OrderDetails = () => {
    return (
        <div className={orderDetailsStyles.container}>
            <span className={orderDetailsStyles.order__number}>034536</span>
            <h4 className={orderDetailsStyles.title}>идентификатор заказа</h4>
                <img className={orderDetailsStyles.image} src={checkImage} alt=""/>
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={orderDetailsStyles.text__status}>Дождитесь готовности на орбитальной станции</p>

        </div>
    );
}

export default OrderDetails;

OrderDetails.propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool
}