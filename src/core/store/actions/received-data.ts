// action types
export const RECEIVE = <const>"RECEIVE";
export const ADD_RECEIVED = <const>"ADD_RECEIVED";
export const RECEIVED_ERROR = <const>"RECEIVED_ERROR";

// action creators

type ReceivedDataOrder = {
  number: number;
};

type ReceivedData = {
  name: string;
  order: ReceivedDataOrder;
  success: boolean;
};

export type ReceivedError = {
  receivedError: string;
};

export const receive = () => {
  return {
    type: RECEIVE,
  };
};

export const addReceived = (payload: { receivedData: ReceivedData }) => {
  return {
    type: ADD_RECEIVED,
    payload,
  };
};

export const failure = (payload: { receivedError: ReceivedError }) => {
  return {
    type: RECEIVED_ERROR,
    payload,
  };
};
