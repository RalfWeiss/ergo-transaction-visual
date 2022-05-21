import React, { useContext } from "react";
import {
  Context as StoreContext,
  setUseDagreLayout,
  setNoOfGraphLayouts,
} from "../model";

export const useToggleDagreLayout = () => {
  const { state, setState } = useContext(StoreContext);
  // // const [value, setValue] = React.useState(initialValue);

  // const toggleLayout = React.useCallback(() => {
  //   setState(setUseDagreLayout(!state.config.useDagreLayout))
  //   setState(setNoOfGraphLayouts(0))
  // }, [])
  const toggleLayout = React.useCallback(() => {
    setState(setUseDagreLayout(!state.config.useDagreLayout));
    setState(setNoOfGraphLayouts(0));
  }, [state.config.useDagreLayout, setState]);

  return [state.config.useDagreLayout, toggleLayout];
};
