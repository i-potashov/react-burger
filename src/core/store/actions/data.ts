import { IBurgerModel } from "../../models/burger.model";

// action types
export const REQUEST = <const>"REQUEST";
export const SUCCESS = <const>"SUCCESS";
export const FAILURE = <const>"FAILURE";

// action creators

export const request = () => {
  return {
    type: REQUEST,
  };
};

export const success = (payload: IBurgerModel[]) => {
  return {
    type: SUCCESS,
    payload,
  };
};

export const failure = (payload: { error: string }) => {
  return {
    type: FAILURE,
    payload,
  };
};
