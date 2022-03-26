import { ADD_RECEIVED, RECEIVE, RECEIVED_ERROR } from "../actions/received-data";

type ReceivedDataOrder = {
  number: number;
};

type ReceivedData = {
  name: string;
  order: ReceivedDataOrder;
  success: boolean;
};

type ReceivedDataState = {
  receivedData?: ReceivedData;
  receivedIsLoading: boolean;
  receivedError?: string;
};

type ReceivedError = {
  receivedError: string;
};

type ReceivedDataAction =
  | { type: typeof RECEIVE }
  | { type: typeof ADD_RECEIVED; payload: ReceivedDataState }
  | { type: typeof RECEIVED_ERROR; payload: ReceivedError };

export const receivedDataInitialState = {
  receivedIsLoading: false,
};

export const receivedDataReducer = (state: ReceivedDataState, action: ReceivedDataAction) => {
  switch (action.type) {
    case RECEIVE:
      return { receivedIsLoading: true };
    case ADD_RECEIVED:
      return {
        receivedIsLoading: false,
        receivedData: action.payload.receivedData,
      };
    case RECEIVED_ERROR:
      return { receivedIsLoading: false, receivedError: action.payload.receivedError };
    default:
      return { ...state };
  }
};
