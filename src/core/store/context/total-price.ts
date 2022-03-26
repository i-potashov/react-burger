import { createContext } from "react";

type Price = {
  price: number;
};

type TotalPrice = {
  totalPrice: Price;
  totalPriceDispatcher: React.Dispatch<any>;
};

const TotalPriceContext = createContext<Partial<TotalPrice>>({});

export default TotalPriceContext;
