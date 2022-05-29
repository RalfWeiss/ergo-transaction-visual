import React from "react";
import { LabeledValueEntry, LabeledValueEntryProps } from "./LabeledValueEntry";

export const LabeledCurrency = ({ label, value }: LabeledValueEntryProps) => (
  <LabeledValueEntry
    label={label}
    value={<b>{Number(value).toLocaleString()}</b>}
  />
);
