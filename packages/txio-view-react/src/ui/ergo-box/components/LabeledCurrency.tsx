import React from "react";
import { LabeledValueEntry, LabeledValueEntryProps } from "./LabeledValueEntry";

// see: https://stackoverflow.com/questions/54409854/how-to-divide-two-native-javascript-bigints-and-get-a-decimal-result
const valFormat = { minimumFractionDigits: 2, maximumFractionDigits: 9 };
const toErg = (val: bigint) => {
  const num_ = Number((val * BigInt(1000000)) / BigInt(1000000000)) / 1000000;
  const num = Number(num_.toPrecision(3));
  return `${num.toLocaleString(undefined, valFormat)} ERG`;
};

export const LabeledCurrency = ({ label, value }: LabeledValueEntryProps) => {
  const bigValue = BigInt(value);
  return (
    <LabeledValueEntry
      label={label}
      // value={<b>{Number(value).toLocaleString()}</b>}
      value={
        <span>
          <b>{bigValue.toLocaleString()}</b>&nbsp;({toErg(bigValue)})
        </span>
      }
    />
  );
};
