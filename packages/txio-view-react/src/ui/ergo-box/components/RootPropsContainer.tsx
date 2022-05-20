import React, {ReactNode} from 'react'

export interface RootPropsContainerProps {
  children?: ReactNode
}

export const RootPropsContainer = ({children}:RootPropsContainerProps) => {
  return (
    <table>      
      <tbody>
        {children}
      </tbody>
    </table>      
  )
}