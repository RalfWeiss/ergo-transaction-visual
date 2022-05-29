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
import { Dimensions, DimensionsByKey } from "./dimensions";
import * as R from "ramda";

export interface Store {
  boxes: {
    [key: string]: ErgoBox;
  };
  title: string;
  allBoxes: string[];
  inputBoxIds: string[];
  outputBoxIds: string[];
  dimensions: DimensionsByKey; // dimensions by internalId
  diagramDimensions: Dimensions;
  colorMap: {
    [key: string]: string;
  };
  // connectionsByBoxId?: [[string,string]]
  connectionsByBoxId: any;
  connectionsByTokenId: any;
  noOfGraphLayouts: 0;
  config: Partial<ITxioStoreProviderConfig>;
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
  connectionsByTokenId: [],
  noOfGraphLayouts: 0,
  diagramDimensions: { width: 0, height: 0 },
  config: {
    useDagreLayout: true,
    rootPropsToShow: ["value", "boxId", "address"],
    // rootPropsToShow: [
    //   "boxId",
    //   "address",
    //   "ergoTree",
    //   "blockId",
    //   "transactionId",
    //   "value",
    // ],
    // colorNames good for black text color
    // https://www.quackit.com/css/color/charts/css_color_names_chart.cfm
    boxColors: [
      "LightCoral",
      "PaleGreen",
      "SkyBlue",
      "Khaki",
      "NavajoWhite",
      "MistyRose",
    ],
  },
};

export const Context = createContext<IStoreContext>({
  state: defaultState,
  // setState: () => mergeStore({})
  setState: () => ({}),
});

export interface ITxioStoreProviderConfig {
  useDagreLayout: boolean;
  rootPropsToShow: string[];
  boxColors: string[]; // Todo: find a better name
}

export interface ITxioStoreProvider {
  // data?: Store;
  config?: ITxioStoreProviderConfig;
  children: ReactNode;
}

// Todo: Is this the right place to add an config
export const TxioStoreProvider = ({ config, children }: ITxioStoreProvider) => {
  const [state, setState] = useState(
    R.mergeDeepRight(defaultState, { config: config || {} })
  );
  const contextValue = useMemo(
    () => ({ state, setState } as IStoreContext),
    [state, setState]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
