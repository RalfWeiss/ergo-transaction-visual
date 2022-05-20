import React, { useContext, useState, useEffect } from "react";
import { ErgoBox } from "../../model";
import { Context as StoreContext } from "../../model";
import { ErgoBoxCard } from "./ErgoBoxCard";
import { getBoxById } from "../../model";
import * as R from "ramda";

export interface IErgoBoxCardContext {
  internalId: string;
}

export const ErgoBoxCardContext = ({ internalId }: IErgoBoxCardContext) => {
  const { state } = useContext(StoreContext);
  const [box, setBox] = useState({});

  useEffect(() => {
    const box = getBoxById(internalId)(state) as ErgoBox;
    setBox(box);
  }, [internalId, state]);

  if (R.isEmpty(box)) {
    return null;
  }

  return <ErgoBoxCard ergoBox={box as ErgoBox} />;
};
