/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { FC, useContext } from "react";
import { v4 as uuid } from "uuid";
import { Droppable, DroppableStateSnapshot } from "react-beautiful-dnd";
import styles from "./burger-constructor-items.module.css";
import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";

// eslint-disable-next-line consistent-return
function getStyle(snapshot: DroppableStateSnapshot) {
  if (!snapshot.draggingFromThisWith) return snapshot.isDraggingOver ? 2 : 0;
  if (snapshot.draggingFromThisWith) return snapshot.isDraggingOver ? 1 : 0;
}

const BurgerConstructorItems: FC = () => {
  const { selectedIngredients } = useContext(SelectedIngredientsContext);

  return (
    <Droppable droppableId="BURGER_CONSTRUCTOR">
      {(provided, snapshot) => (
        <div
          className={styles.items_wrap}
          {...provided.droppableProps}
          {...provided.innerRef}
          ref={provided.innerRef}
        >
          {selectedIngredients && (
            <>
              <div className={styles.item_ban}>
                {selectedIngredients.bun.map((v, i) => (
                  <BurgerConstructorIngredient
                    ingredient={v}
                    position="top"
                    index={i}
                    locked
                    key={uuid()}
                  />
                ))}
              </div>

              <ul
                className={
                  getStyle(snapshot) === 0
                    ? styles.items
                    : getStyle(snapshot) === 1
                    ? styles.items__add_right
                    : styles.items__add_left
                }
              >
                {selectedIngredients.ingredients.map((v, index) => (
                  <BurgerConstructorIngredient
                    ingredient={v}
                    position={undefined}
                    index={index}
                    locked={false}
                    key={v._id.concat(String(index))}
                  />
                ))}
                {provided.placeholder}
              </ul>

              <div className={styles.item_ban_bottom}>
                {selectedIngredients.bun.map((v) => (
                  <BurgerConstructorIngredient
                    ingredient={v}
                    position="bottom"
                    index={null}
                    locked
                    key={uuid()}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default BurgerConstructorItems;
