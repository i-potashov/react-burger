import React, { useContext } from 'react';
import orderDetailsStyles from './order-details.module.css';
import checkImage from '../../../images/graphics.svg';
import { ReceivedDataContext } from '../../../services/appContext';

export default function OrderDetails() {
    const { receivedData } = useContext(ReceivedDataContext);
    return (
        <div className={orderDetailsStyles.container}>
            {receivedData.order.number && (
                <span className={orderDetailsStyles.order__number}>{receivedData.order.number}</span>
            )}
            <h4 className={orderDetailsStyles.title}>идентификатор заказа</h4>
            <img className={orderDetailsStyles.image} src={checkImage} alt='' />
            <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
            <p className={orderDetailsStyles.text__status}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}
