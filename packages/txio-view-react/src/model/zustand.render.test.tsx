// Todo
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for toBeInTheDocument
import React, { useEffect } from "react";
import create from "zustand";
import * as R from "ramda";

interface Store {
  bears: number;
  renderCount: number;
  unmountCount: number;

  increasePopulation: () => void;
  removeAllBears: () => void;
  incRenderCount: () => void;
  incUnmountCount: () => void;

  setBears: (count: number) => void;
}

const useStore = create<Store>((set) => ({
  bears: 0,
  renderCount: 0,
  unmountCount: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }), // set function merges state

  incRenderCount: () =>
    set(
      R.evolve({
        renderCount: R.inc,
      })
    ),
  incUnmountCount: () =>
    set(
      R.evolve({
        unmountCount: R.inc,
      })
    ),

  setBears: (count: number) => set(R.assoc("bears")(count)),
}));

function BearCounter() {
  // const bears = useStore(state => state.bears)
  const bears = useStore(R.prop("bears")) as number;

  const incRenderCount = useStore((state) => state.incRenderCount);
  const incUnmountCount = useStore((state) => state.incUnmountCount);

  useEffect(() => {
    incRenderCount();
    // return () => {
    //   incUnmountCount();
    // };
  }, [incRenderCount, incUnmountCount, bears]);
  // does not work without the bears in the dependencies
  // }, [incRenderCount, incUnmountCount]);

  useEffect(
    () => () => {
      incUnmountCount();
    },
    [incUnmountCount]
  );

  return (
    <div>
      <span>{bears} around here ...</span>
    </div>
  );
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);

  // const removeAllBears = useStore(R.prop("removeAllBears"))
  return (
    <>
      <button type="button" onClick={increasePopulation}>
        one up
      </button>
      <button type="button" onClick={removeAllBears}>
        remove all bears
      </button>
    </>
  );
}

function Container() {
  const bears = useStore((state) => state.bears);
  // const renderCount = useStore(R.prop("renderCount")) as number
  const renderCount = useStore((state) => state.renderCount);
  const unmountCount = useStore(R.prop("unmountCount")) as number;
  return (
    <>
      {bears > 0 ? <BearCounter /> : null}
      <Controls />
      <div>RenderCount: {renderCount} </div>
      <div>UnmountCount: {unmountCount} </div>
    </>
  );
}

describe("zustand basics", () => {
  it("on initial rendering", () => {
    render(<Container />);
    expect(screen.getByText("RenderCount: 0")).toBeInTheDocument();
    expect(screen.getByText("UnmountCount: 0")).toBeInTheDocument();
    // screen.debug();
  });
  it("no data changed", async () => {
    render(<Container />);

    expect(screen.queryByText("1 around here ...")).not.toBeInTheDocument();
    // const btn = screen.getByText("one up")
    // fireEvent.click(btn)
    const elmSelected = R.pipe(
      screen.getByText,
      // using tap to trigger side effect without having effect on the selected element
      R.tap(fireEvent.click)
    )("one up");

    // Todo: just to show that `tap` has no effect on the selected element
    expect(elmSelected.textContent).toEqual("one up");

    expect(screen.getByText("1 around here ...")).toBeInTheDocument();
    expect(screen.getByText("RenderCount: 1")).toBeInTheDocument();
    expect(screen.getByText("UnmountCount: 0")).toBeInTheDocument();

    fireEvent.click(elmSelected); // make a second click

    expect(screen.getByText("2 around here ...")).toBeInTheDocument();
    expect(screen.getByText("RenderCount: 2")).toBeInTheDocument();
    expect(screen.getByText("UnmountCount: 0")).toBeInTheDocument();

    R.pipe(screen.getByText, R.tap(fireEvent.click))("remove all bears");

    expect(screen.getByText("UnmountCount: 1")).toBeInTheDocument();
  });
});
