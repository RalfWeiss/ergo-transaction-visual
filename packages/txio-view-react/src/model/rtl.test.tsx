/*
rtl = react testing library
*/

// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { render, screen, within } from "@testing-library/react";
import React from "react";
import create from "zustand";

interface Store {
  bears: number;
}

const useStore = create<Store>(() => ({
  bears: 1,
  // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 })
}));

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return (
    <>
      <span>{bears}</span>&nbsp;
      <span>around here ...</span>
    </>
  );
}

// function Controls() {
//   const increasePopulation = useStore(state => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }

describe("withing", () => {
  // Todo: use the function approach to realize this
  it("can find text based on an anchor text", () => {
    render(<BearCounter />);

    // find the parentElement by an anchor text
    const elm = screen.queryByText("around here ...").parentElement;
    // search within the parent element
    expect(within(elm).getByText(/^\d+$/)).not.toBeNull();
    expect(within(elm).getByText("around here ...")).not.toBeNull();
  });
});
