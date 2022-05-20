import React from 'react'
import { truncateWithEllipses } from "../../../utils"
import { LabeledValueEntry, LabeledValueEntryProps } from './LabeledValueEntry'
//import { TRUNCATE_MAXLEN } from ''

const TRUNCATE_MAXLEN = 25

// // searching by entering address, block hash or transaction
// // transactionId ok, blockId ok, 
export const ErgoExplorerQueryLink = ({label,value}:LabeledValueEntryProps) => (
  <LabeledValueEntry label={label} value={
    <a href={`https://explorer.ergoplatform.com/en/search?query=${value}`}
      target="_blank" rel="noopener noreferrer"
    >{truncateWithEllipses(TRUNCATE_MAXLEN)(value)}</a>
  } />
)