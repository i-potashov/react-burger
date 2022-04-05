/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IBurgerModel } from "../../../core/models/burger.model";
import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";
import styles from "./burger-ingredient.module.css";

type IngredientValue = {
  value: IBurgerModel;
  index: number;
  handleOpenModal: (value: IBurgerModel) => void;
};

const BurgerIngredient: FC<IngredientValue> = ({ value, index, handleOpenModal }) => {
  const { selectedIngredients } = useContext(SelectedIngredientsContext);

  const countCheckHandler = (elem: IBurgerModel) => {
    if (elem.type === "bun") {
      const tmpCount = selectedIngredients?.bun.filter((v) => v._id === elem._id).length;
      if (tmpCount) {
        return <Counter count={tmpCount} size="default" />;
      }
    } else {
      const tmpCount = selectedIngredients?.ingredients.filter((v) => v._id === elem._id).length;
      if (tmpCount) {
        return <Counter count={tmpCount} size="default" />;
      }
    }
    return null;
  };

  return (
    <Droppable droppableId="BUN_INGREDIENTS_LIST">
      {(provided) => (
        <div ref={provided.innerRef}>
          <Draggable key={value._id} draggableId={value._id} index={index}>
            {(provided, snapshot) => {
              const styleOnDrag = {
                style: snapshot.isDragging ? styles.item_drag : styles.item,
                ...provided.draggableProps.style,
              };
              return (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div
                    className={styleOnDrag.style}
                    key={value._id}
                    onClick={() => handleOpenModal(value)}
                  >
                    <img className={styles.image} src={value.image} alt="" />
                    {countCheckHandler(value)}
                    <div className={`${styles.wrap} ${styles.icon}`}>
                      <span className={styles.price}>{value.price}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <h3 className={styles.name}>{value.name}</h3>
                  </div>
                </li>
              );
            }}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
};

export default BurgerIngredient;
