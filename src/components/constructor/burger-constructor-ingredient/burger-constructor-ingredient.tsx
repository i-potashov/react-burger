/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IBurgerModel } from "../../../core/models/burger.model";
import SelectedIngredientsContext from "../../../core/store/context/selected-ingredients";
import styles from "./burger-constructor-ingredient.module.css";

type IngredientProps = {
  ingredient: IBurgerModel;
  position: "top" | "bottom" | undefined;
  index: number | null;
  locked: boolean;
};

const BurgerConstructorIngredient: FC<IngredientProps> = ({
  ingredient,
  position,
  index,
  locked,
}) => {
  const { removeSelectedIngredientsItemHandler } = useContext(SelectedIngredientsContext);

  return (
    <>
      {position !== undefined && (
        <ConstructorElement
          type={position}
          isLocked={locked}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {
            if (removeSelectedIngredientsItemHandler) removeSelectedIngredientsItemHandler(index);
          }}
        />
      )}

      {position === undefined && index && (
        <Draggable draggableId={ingredient._id.concat(String(index))} index={index}>
          {(provided) => (
            <li className={styles.item} ref={provided.innerRef} {...provided.draggableProps}>
              <div {...provided.dragHandleProps}>
                <DragIcon type="primary" />
              </div>
              <div className={styles.item__container}>
                <ConstructorElement
                  type={position}
                  isLocked={locked}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => {
                    if (removeSelectedIngredientsItemHandler)
                      removeSelectedIngredientsItemHandler(index);
                  }}
                />
              </div>
            </li>
          )}
        </Draggable>
      )}
    </>
  );
};

export default memo(BurgerConstructorIngredient);
