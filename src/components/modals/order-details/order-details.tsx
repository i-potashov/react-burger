import { useContext } from "react";
import styles from "./order-details.module.css";
import checkImage from "../../../assets/images/graphics.svg";
import ReceivedDataContext from "../../../core/store/context/received-data";

export default function OrderDetails() {
  const { receivedData } = useContext(ReceivedDataContext);
  return (
    <div className={styles.container}>
      {receivedData?.order.number && (
        <>
          <h4 className={styles.title}>{receivedData.name}</h4>
          <span className={styles.order__number}>{receivedData.order.number}</span>
          <p className={styles.title}>идентификатор заказа</p>
          <img className={styles.image} src={checkImage} alt="" />
          <p className={styles.text}>Ваш заказ начали готовить</p>
          <p className={styles.text__status}>Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
}
