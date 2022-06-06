/*
based on: https://github.com/tddbin/katas/blob/master/katas/libraries/zustand/vanilla-store.js
*/
import createVanilla from "zustand/vanilla";
import { combine } from "zustand/middleware";
import * as R from "ramda";

const storeDef = combine(
  {
    bears: 0,
  },
  (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  })
);

describe("Zustand - the vanilla store (vanilla = pure JS)", () => {
  describe("creating a store, and it`s API", () => {
    // Todo: it does not throw
    it("WHEN calling `create()` without any parameter THEN it does not throw", () => {
      expect(
        createVanilla
        //        () => { createVanilla(); }
      ).not.toThrow();
    });
    describe("WHEN `create()` returns a new store", () => {
      const store = createVanilla(storeDef);
      it("THEN the store has `getState()` and `setState()`", () => {
        expect(typeof store.getState).toBe("function");
        expect(typeof store.setState).toBe("function");
      });
      it("AND it provides `destroy()` and `subscribe()`", () => {
        expect(typeof store.destroy).toBe("function");
        expect(typeof store.subscribe).toBe("function");
      });
    });
  });

  describe("initial state via `createVanilla()`", () => {
    it("WHEN given an initial state THEN it can be retreived via `getState()`", () => {
      const store = createVanilla(storeDef);
      expect(store.getState()).toHaveProperty("bears", 0);
      expect(store.getState()).toEqual(expect.objectContaining({ bears: 0 }));
    });
    it("WHEN given no initial state (`undefined`) THEN `getState()` returns exactly `undefined`", () => {
      const initialState = undefined;
      const store = createVanilla(() => initialState);
      expect(store.getState()).toBeUndefined();
      // assertThat(store.getState(), undefined);
    });
    // it("should mutate state", () => {
    //   const vanillaStore = createVanilla(storeDef)
    //   vanillaStore.setState({bears: 1})
    //   expect(vanillaStore.getState()).toEqual(
    //     expect.objectContaining({bears: 1})
    //   )
    // })
  });

  describe("updating state via `setState()`", () => {
    it("WHEN calling `setState()` with one property THEN it is overriden in the state", () => {
      const store = createVanilla(() => ({ color: "blue" }));
      expect(store.getState()).toEqual({ color: "blue" });
      store.setState({ color: "red" });
      expect(store.getState()).toEqual({ color: "red" });
    });
    it("WHEN updating the store partially THEN it automatically gets merged with the old state", () => {
      const initialState = { color: "green" };
      const store = createVanilla(() => initialState);
      const partialNewState = { backgroundColor: "white" } as any;
      store.setState(partialNewState);
      expect(store.getState()).toEqual({
        color: "green",
        backgroundColor: "white",
      });
    });
    it("WHEN updating the store THEN it is NOT deep-merged", () => {
      const store = createVanilla(() => ({
        border: { width: 1, color: "blue" },
      }));
      store.setState({ border: { color: "red" } } as any);
      expect(store.getState()).toEqual({
        // Notice, the `width` key was removed!
        border: { color: "red" },
      });
    });
    it("WHEN deep-merging is needed THEN do it manually, get the old state first and merge it in", () => {
      const store = createVanilla(() => ({
        border: { width: 1, color: "blue" },
      }));
      const oldBorder = store.getState().border;
      store.setState({ border: { ...oldBorder, color: "red" } });
      expect(store.getState()).toEqual({
        border: { width: 1, color: "red" },
      });
    });
    it("WHEN deep-merging is needed THEN use ramda", () => {
      const store = createVanilla(() => ({
        border: { width: 1, color: "blue" },
      }));
      store.setState(R.assocPath(["border", "color"])("red"));
      expect(store.getState()).toEqual({
        border: { width: 1, color: "red" },
      });
    });
  });

  describe('updating state via custom functions (aka "actions")', () => {
    it("an action can be inside the initial state", () => {
      const { getState } = createVanilla((set) => ({
        blue: "not red",
        modifyBlue: () => {
          set({ blue: "but blue" });
        },
      }));
      (getState() as any).modifyBlue();
      expect((getState() as any).blue).toEqual("but blue");
    });
    it("the action can also NOT be in the initial state object", () => {
      const store = createVanilla(() => ({
        blue: "not red",
      }));
      const modifyBlue = () => {
        store.setState({ blue: "but blue" });
      };
      modifyBlue();
      expect(store.getState().blue).toEqual("but blue");
    });
  });
});
