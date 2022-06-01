import React from "react";
import { truncateWithEllipses } from "../../../utils";
import {formatAddress} from "../../../utils"

export interface LabeledValueEntryProps {
  label: string;
  value: any;
}

export const LabeledValueEntry = ({ label, value }: LabeledValueEntryProps) => (
  <tr key={label}>
    <td style={{ textAlign: "right" }}>{label}:</td>
    <td style={{ paddingLeft: "1ch" }}>{value}</td>
  </tr>
);

const TRUNCATE_MAXLEN = 25;

export const TruncatedLabeledValueEntry = ({
  label,
  value,
}: LabeledValueEntryProps) => (
  <LabeledValueEntry
    label={label}
    value={truncateWithEllipses(TRUNCATE_MAXLEN)(formatAddress(value))}
  />
  // <tr key={label}>
  //   <td style={{textAlign:'right'}}>{label}:</td>
  //   <td>{truncateWithEllipses(TRUNCATE_MAXLEN)(value)}</td>
  // </tr>
);
