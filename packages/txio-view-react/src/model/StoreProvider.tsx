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
import { Store } from "./store";

interface IStoreContext {
  state: Store; // | undefined,
  // setState: (state:Store) => Store
  setState: Dispatch<SetStateAction<Store>>;
}

// const defaultState:Store = mergeStore({})
const defaultState: Store = {
  title: "default title",
  boxes: {},
  allBoxes: [],
  inputBoxIds: [],
  outputBoxIds: [],
  dimensions: {},
  colorMap: {},
  connectionsByBoxId: [],
};

export const Context = createContext<IStoreContext>({
  state: defaultState,
  // setState: () => mergeStore({})
  setState: () => ({}),
});

export interface IProvider {
  // data?: Store;
  children: ReactNode;
}

export const Provider = ({ children }: IProvider) => {
  const [state, setState] = useState(defaultState);
  const contextValue = useMemo(
    () => ({ state, setState } as IStoreContext),
    [state, setState]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
