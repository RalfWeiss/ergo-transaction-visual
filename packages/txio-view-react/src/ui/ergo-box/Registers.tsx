import React from 'react'
import { ErgoBox } from "../../model"
import { truncateWithEllipses } from "../../utils"
import * as R from 'ramda'

interface RegistersProps {
  ergoBox:ErgoBox
}

const TRUNCATE_MAXLEN = 45

export const Registers = ({ergoBox}:RegistersProps) => {
  if (!ergoBox.additionalRegisters || R.isEmpty(ergoBox.additionalRegisters)) return <></>  
  const Registers = R.toPairs(ergoBox.additionalRegisters).map(
    ([prop, value]:[prop:string, value:any]) => (
      <tr key={prop}>
        <td>{prop}</td>
        <td>{truncateWithEllipses(TRUNCATE_MAXLEN)(JSON.stringify(value,null,2))}</td>          
      </tr>      
    )
  )
  return (
    <table>
      {/* <caption style={{textAlign:'left', fontSize: 'small'}}>additionalRegisters</caption> */}
      <thead>
        <tr>
          <th>name</th>
          <th>value</th>          
        </tr>
      </thead>        
      <tbody>
        {Registers}
      </tbody>                 
    </table>
  )
}