import { UPDATE_PRICE } from "../actions/total-price";

type TotalPriceState = {
  price: number;
};

type TotalPriceAction = {
  type: typeof UPDATE_PRICE;
  payload: TotalPriceState;
};
export const totalPriceInitialState = { price: 0 };

export const totalPriceReducer = (state: TotalPriceState, action: TotalPriceAction) => {
  switch (action.type) {
    case UPDATE_PRICE:
      return { ...state, price: action.payload.price };
    default:
      return { ...state };
  }
};
