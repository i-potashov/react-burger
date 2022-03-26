import { createContext } from "react";
import { IBurgerModel } from "../../models/burger.model";

type Ingredients = {
  bun: IBurgerModel[] | [];
  ingredients: IBurgerModel[] | [];
};

type SelectedIngredients = {
  selectedIngredients?: Ingredients;
  setSelectedIngredientsHandler?: Function;
  removeSelectedIngredientsItemHandler?: Function;
};
const SelectedIngredientsContext = createContext<SelectedIngredients>({});

export default SelectedIngredientsContext;
