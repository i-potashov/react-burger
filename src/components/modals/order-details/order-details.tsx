import { useContext } from "react";
import orderDetailsStyles from "./order-details.module.css";
import checkImage from "../../../assets/images/graphics.svg";
import { ReceivedDataContext } from "../../../services/context/appContext";

export default function OrderDetails() {
  const { receivedData } = useContext(ReceivedDataContext);
  return (
    <div className={orderDetailsStyles.container}>
      {receivedData?.order.number && (
        <>
          <h4 className={orderDetailsStyles.title}>{receivedData.name}</h4>
          <span className={orderDetailsStyles.order__number}>{receivedData.order.number}</span>
          <p className={orderDetailsStyles.title}>идентификатор заказа</p>
          <img className={orderDetailsStyles.image} src={checkImage} alt="" />
          <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
          <p className={orderDetailsStyles.text__status}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
