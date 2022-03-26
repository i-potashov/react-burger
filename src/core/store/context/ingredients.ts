import { createContext } from "react";
import { IBurgerModel } from "../../models/burger.model";

type Ingredients = {
  bun?: IBurgerModel[];
  main?: IBurgerModel[];
  sauce?: IBurgerModel[];
};

const IngredientsContext = createContext<Ingredients>({});

export default IngredientsContext;
