import React from 'react'
import { truncateWithEllipses } from "../../../utils"
import { LabeledValueEntry, LabeledValueEntryProps } from './LabeledValueEntry'
//import { TRUNCATE_MAXLEN } from ''

const TRUNCATE_MAXLEN = 25

// address not via query but via: https://explorer.ergoplatform.com/en/addresses/CxP58VNKqe3SsMeFEpgovj4hsYR4kp7LMni3xMg2gyd
export const ErgoExplorerAddressLink = ({label,value}:LabeledValueEntryProps) => (
  <LabeledValueEntry label={label} value={
    <a href={`https://explorer.ergoplatform.com/en/addresses/${value}`}
      target="_blank" rel="noopener noreferrer"
    >{truncateWithEllipses(TRUNCATE_MAXLEN)(value)}</a>
  } />
)