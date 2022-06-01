import {useContext} from "react"
import { IStoreContext, TxioStoreContext } from "../model"

export const useStore = (): IStoreContext => {
  const storeState = useContext(TxioStoreContext);
  if (storeState === null) {
    throw new Error(
      "Store state not found. Try wrapping a parent component with <TxioStoreProvider>."
    );
  }
  return storeState;
};
