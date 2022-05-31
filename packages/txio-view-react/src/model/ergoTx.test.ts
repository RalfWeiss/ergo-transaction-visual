import { toState } from "./ergoTx";

describe("toState", () => {
  const data = {
    inputs: [{ id: "1" }, { id: "2" }],
    outputs: [{ id: "3" }],
  };
  const expected = {
    allBoxes: ["input-0", "input-1", "output-0"],
    inputBoxIds: ["input-0", "input-1"],
    outputBoxIds: ["output-0"],
  };
  it("should produce an expected state", () => {
    const result = toState(data as any);
    // console.log("result: ", JSON.stringify(result, null, 2))

    expect(result.allBoxes).toEqual(expected.allBoxes);
    expect(result.inputBoxIds).toEqual(expected.inputBoxIds);
    expect(result.outputBoxIds).toEqual(expected.outputBoxIds);
  });
});
