import { IBurgerModel } from "../../models/burger.model";
import {
  ADD_BUN,
  ADD_INGREDIENTS,
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENTS,
} from "../actions/selected-ingredients";

type SelectedIngredientsState = {
  bun: IBurgerModel[] | [];
  ingredients: IBurgerModel[] | [];
};

type SelectedIngredientsAction =
  | { type: typeof ADD_INGREDIENTS; payload: IBurgerModel }
  | { type: typeof ADD_BUN; payload: IBurgerModel }
  | { type: typeof REMOVE_INGREDIENT; payload: IBurgerModel[] }
  | { type: typeof CHANGE_INGREDIENTS; payload: IBurgerModel[] };

export const selectedIngredientsInitialState = { bun: [], ingredients: [] };

export const selectedIngredientsReducer = (
  state: SelectedIngredientsState,
  action: SelectedIngredientsAction,
) => {
  switch (action.type) {
    case ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ADD_BUN:
      return { ...state, bun: [action.payload] };
    case REMOVE_INGREDIENT:
      return { ...state, ingredients: action.payload };
    case CHANGE_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    default:
      return { ...state };
  }
};
