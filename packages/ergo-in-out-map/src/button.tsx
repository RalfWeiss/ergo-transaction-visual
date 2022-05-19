/* eslint-disable no-alert */
import React from "react";

export const Button = () => (
  <button
    type="button"
    onClick={() => alert(`the meaning if life is 42`)}
  >
    Click me
  </button>
);
