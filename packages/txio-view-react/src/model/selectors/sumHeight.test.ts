import { sumHeight } from "./sumHeight";

describe("sumHeight", () => {
  it("returns the sum of all heights", () => {
    const state = {
      boxes: {
        b1: {
          height: 10,
        },
        b2: {
          height: 20,
        },
      },
    } as any;

    expect(sumHeight([])(state)).toEqual(0);
    expect(sumHeight(["b1"])(state)).toEqual(10);
    expect(sumHeight(["b1", "b2"])(state)).toEqual(30);
  });
});
