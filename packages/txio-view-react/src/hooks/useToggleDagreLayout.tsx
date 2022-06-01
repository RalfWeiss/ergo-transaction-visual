import React, { useContext } from "react";
import {
  TxioStoreContext,
  setUseDagreLayout,
  setNoOfGraphLayouts,
} from "../model";
import { useStore } from "../hooks";

export const useToggleDagreLayout = () => {
  // Todo: make clear if there are some drawbacks of using object destructuring here
  const {
    state: {
      config: { useDagreLayout },
    },
    setState,
    //  } = useContext(TxioStoreContext);
  } = useStore();

  const toggleLayout = React.useCallback(() => {
    setState(setUseDagreLayout(!useDagreLayout));
    setState(setNoOfGraphLayouts(0));
  }, [useDagreLayout, setState]);

  // return [state.config.useDagreLayout, toggleLayout];
  // https://maecapozzi.com/custom-hooks-in-typescript/
  return [useDagreLayout, toggleLayout] as const;
};
