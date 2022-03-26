import { createContext } from "react";

// export interface ILoadingBurgers {
//   isLoading: boolean;
//   hasError: boolean;
//   data: Array<IBurgerComponent>;
// }

// export interface IIngredients {
//   bun: Array<IBurgerComponent>;
//   main: Array<IBurgerComponent>;
//   sauce: Array<IBurgerComponent>;
// }

// export type IIngredientsOrdered = {
//   [K in string]: IIngredients;
// };

export interface IBurgerComponent {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

// export interface ISelectedIngredients {
//   bun?: IBurgerComponent;
//   ingredients?: Array<IBurgerComponent>;
// }

// export type SelectedIngredients = {
//   [K in string]: ISelectedIngredients;
// };

// export interface ISelectedIngredientsContext {
//   selectedIngredients?: SelectedIngredients;
//   setSelectedIngredientsHandler?: Function;
//   removeSelectedIngredientsItemHandler?: Function;
// }

// export interface IReceivedData {
//   name: string | null;
//   order: {
//     number: number | null;
//   };
//   success: boolean;
// }

// export interface IReceivedDataContext {
//   receivedData: IReceivedData;
//   receivedDataDispatcher: React.Dispatch<any>;
// }

type Burger = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

interface Ingredients {
  bun?: Burger[];
  main?: Burger[];
  sauce?: Burger[];
}

export const IngredientsContext = createContext<Ingredients>({});

// !=============================================================!

export interface SelectedIngredients {
  bun: IBurgerComponent[] | [];
  ingredients: IBurgerComponent[] | [];
}

export interface ISelectedIngredientsContext {
  selectedIngredients?: SelectedIngredients;
  setSelectedIngredientsHandler?: Function;
  removeSelectedIngredientsItemHandler?: Function;
}
export const SelectedIngredientsContext = createContext<ISelectedIngredientsContext>({});

export interface ITotalPrice {
  price: number;
}

export interface ITotalPriceContext {
  totalPrice: ITotalPrice;
  totalPriceDispatcher: React.Dispatch<any>;
}

export const TotalPriceContext = createContext<Partial<ITotalPriceContext>>({});

export interface IReceivedData {
  name: string | null;
  order: {
    number: number | null;
  };
  success: boolean;
}

export interface IReceivedDataContext {
  receivedData: IReceivedData;
  receivedDataDispatcher: React.Dispatch<any>;
}

export const ReceivedDataContext = createContext<Partial<IReceivedDataContext>>({});
