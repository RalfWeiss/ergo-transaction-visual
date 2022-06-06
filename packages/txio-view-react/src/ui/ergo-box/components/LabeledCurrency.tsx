import React from "react";
import { LabeledValueEntry, LabeledValueEntryProps } from "./LabeledValueEntry";
import { toErg } from "../../../utils";

export const LabeledCurrency = ({ label, value }: LabeledValueEntryProps) => {
  const bigValue = BigInt(value);
  return (
    <LabeledValueEntry
      label={label}
      // value={<b>{Number(value).toLocaleString()}</b>}
      value={
        <span>
          <b>{toErg(bigValue)}</b>&nbsp;({bigValue.toLocaleString()})
        </span>
      }
    />
  );
};
