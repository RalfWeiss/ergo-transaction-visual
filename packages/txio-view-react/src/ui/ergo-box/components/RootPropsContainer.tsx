import React, { ReactNode } from "react";

export interface RootPropsContainerProps {
  children?: ReactNode;
}

export const RootPropsContainer = ({ children }: RootPropsContainerProps) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);
