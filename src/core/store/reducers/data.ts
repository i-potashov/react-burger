import { IBurgerModel } from "../../models/burger.model";
import { FAILURE, REQUEST, SUCCESS } from "../actions/data";

type Data = {
  bun?: IBurgerModel[];
  main?: IBurgerModel[];
  sauce?: IBurgerModel[];
};

type State = {
  ingredients?: Data;
  isLoading: boolean;
  error?: string;
};

type Error = {
  error: string;
};

type Action =
  | { type: typeof REQUEST }
  | { type: typeof SUCCESS; payload: IBurgerModel[] }
  | { type: typeof FAILURE; payload: Error };

export const dataReducerInitialState = {
  isLoading: false,
};

export const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: {
          bun: action.payload.filter((v) => v.type === "bun"),
          main: action.payload.filter((v) => v.type === "main"),
          sauce: action.payload.filter((v) => v.type === "sauce"),
        },
      };
    case FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return { ...state };
  }
};
