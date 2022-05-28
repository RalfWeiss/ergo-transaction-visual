import { getCombsMinMax, getAllCombbs } from "./combinations";

describe("getAllCombbs", () => {
  // all output combinations for one input
  it("should find all output combinations", () => {
    const expected = [
      ["O-1"],
      ["O-2"],
      ["O-3"],
      ["O-1", "O-2"],
      ["O-1", "O-3"],
      ["O-2", "O-3"],
      ["O-1", "O-2", "O-3"],
    ];
    // const result = getCombsMinMax(1, 3, ["O-1", "O-2", "O-3"])
    const result = getAllCombbs(["O-1", "O-2", "O-3"]);

    // console.log("result: ", result)

    expect(result).toEqual(expected);
  });

  it("should find all input combinations", () => {
    const expected = [["I-1"], ["I-2"], ["I-1", "I-2"]];

    const result = getCombsMinMax(1, 2, ["I-1", "I-2"]);
    // console.log("result: ", result)

    expect(result).toEqual(expected);
  });
});
