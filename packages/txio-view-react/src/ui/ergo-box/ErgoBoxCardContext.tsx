import React, { useState } from "react";
import { ErgoBox } from "../../model";
import { ErgoBoxCard } from "./ErgoBoxCard";
import { Selectors } from "../../model";
import { logWhen } from "../../utils";
import * as R from "ramda";
import { useUpdateEffect } from "usehooks-ts";
import { useStore } from "../../hooks";

const debugLog = logWhen(false);

export interface IErgoBoxCardContext {
  internalId: string;
}

export const ErgoBoxCardContext = ({ internalId }: IErgoBoxCardContext) => {
  const { state } = useStore();
  const [box, setBox] = useState({});

  useUpdateEffect(() => {
    const box = Selectors.getBoxById(internalId)(state) as ErgoBox;
    const rootPropsToShow = Selectors.selRootPropsToShow(state);
    debugLog("rootPropsToShow in ErgoBoxCardContext")(rootPropsToShow);
    const selColorNames = Selectors.selColorNames(state);
    debugLog("selColorNames in ErgoBoxCardContext")(selColorNames);
    setBox(box);
  }, [internalId, state]);

  if (R.isEmpty(box)) {
    return null;
  }

  return <ErgoBoxCard ergoBox={box as ErgoBox} />;
};
