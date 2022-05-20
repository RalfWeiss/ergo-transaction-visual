import React, {ReactNode} from 'react'

export interface BaseInfoContainerProps {
  children?: ReactNode
}

export const BaseInfoContainer = ({children}:BaseInfoContainerProps) => {
  return (
    <table>      
      <tbody>
        {children}
      </tbody>
    </table>      
  )
}