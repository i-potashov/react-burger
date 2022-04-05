import { IBurgerModel } from "../../models/burger.model";

// action types
export const ADD_INGREDIENTS = <const>"ADD_INGREDIENTS";
export const ADD_BUN = <const>"ADD_BUN";
export const REMOVE_INGREDIENT = <const>"REMOVE_INGREDIENT";
export const CHANGE_INGREDIENTS = <const>"CHANGE_INGREDIENTS";

// action creators

// | { type: "add_ingredients"; payload: IBurgerModel }
// | { type: "add_bun"; payload: IBurgerModel }
// | { type: "remove"; payload: IBurgerModel[] };

export const addIngredients = (payload: IBurgerModel) => {
  return {
    type: ADD_INGREDIENTS,
    payload,
  };
};

export const addBun = (payload: IBurgerModel) => {
  return {
    type: ADD_BUN,
    payload,
  };
};

export const removeIngredient = (payload: IBurgerModel[]) => {
  return {
    type: REMOVE_INGREDIENT,
    payload,
  };
};

export const changeIngredients = (payload: IBurgerModel[]) => {
  return {
    type: CHANGE_INGREDIENTS,
    payload,
  };
};
