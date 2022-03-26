// action types
export const UPDATE_PRICE = <const>"UPDATE_PRICE";

// action creators

export const updatePrice = (payload: { price: number }) => {
  return {
    type: UPDATE_PRICE,
    payload,
  };
};
