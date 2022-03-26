import { createContext } from "react";

type Data = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

type ReceivedData = {
  receivedData: Data;
  receivedDataDispatcher: React.Dispatch<any>;
};

const ReceivedDataContext = createContext<Partial<ReceivedData>>({});

export default ReceivedDataContext;
