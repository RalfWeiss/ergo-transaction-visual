import React, { useContext } from "react";
import {
  Context as StoreContext,
  setUseDagreLayout,
  setNoOfGraphLayouts,
} from "../model";

export const useToggleDagreLayout = () => {
  // const { state, setState } = useContext(StoreContext);
  const {
    state: {
      config: { useDagreLayout },
    },
    setState,
  } = useContext(StoreContext);
  // const useDagreLayout = true
  // // const [value, setValue] = React.useState(initialValue);

  // const toggleLayout = React.useCallback(() => {
  //   setState(setUseDagreLayout(!state.config.useDagreLayout))
  //   setState(setNoOfGraphLayouts(0))
  // }, [])
  const toggleLayout = React.useCallback(() => {
    // setState(setUseDagreLayout(!state.config.useDagreLayout));
    setState(setUseDagreLayout(!useDagreLayout));
    setState(setNoOfGraphLayouts(0));
  }, [useDagreLayout, setState]);

  // return [state.config.useDagreLayout, toggleLayout];
  // https://maecapozzi.com/custom-hooks-in-typescript/
  return [useDagreLayout, toggleLayout] as const;
};
