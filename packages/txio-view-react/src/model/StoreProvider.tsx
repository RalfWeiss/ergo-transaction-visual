import React from "react";
// based on: https://felixgerschau.com/react-typescript-context/
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
// import { Store, mergeStore } from './store'
// import { Store } from "./store";
import { ErgoBox } from "./ergoBox";
import { DimensionsByKey } from "./dimensions";

export interface Store {
  boxes: {
    [key: string]: ErgoBox;
  };
  title: string;
  allBoxes: string[];
  inputBoxIds: string[];
  outputBoxIds: string[];
  dimensions: DimensionsByKey;
  colorMap: {
    [key: string]: string;
  };
  // connectionsByBoxId?: [[string,string]]
  connectionsByBoxId: any;
  noOfGraphLayouts: 0;
  config: {
    useDagreLayout: true;
  };
}

interface IStoreContext {
  state: Store; // | undefined,
  // setState: (state:Store) => Store
  setState: Dispatch<SetStateAction<Store>>;
}

// const defaultState:Store = mergeStore({})
export const defaultState: Store = {
  title: "default title",
  boxes: {},
  allBoxes: [],
  inputBoxIds: [],
  outputBoxIds: [],
  dimensions: {},
  colorMap: {},
  connectionsByBoxId: [],
  noOfGraphLayouts: 0,
  config: {
    useDagreLayout: true,
  },
};

export const Context = createContext<IStoreContext>({
  state: defaultState,
  // setState: () => mergeStore({})
  setState: () => ({}),
});

export interface ITxioStoreProvider {
  // data?: Store;
  children: ReactNode;
}

export const TxioStoreProvider = ({ children }: ITxioStoreProvider) => {
  const [state, setState] = useState(defaultState);
  const contextValue = useMemo(
    () => ({ state, setState } as IStoreContext),
    [state, setState]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
