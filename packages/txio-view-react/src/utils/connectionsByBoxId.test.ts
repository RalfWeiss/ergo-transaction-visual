import * as R from "ramda";
import {
  connectionsByBoxId,
  propGroupBy,
  mergeGroupedByWithProp,
  toPairedConnection,
} from "./connectionsByBoxId";

describe("propGroupBy", () => {
  it("should work", () => {
    const expected = {
      "box-1": ["output-0", "output-2"],
      "box-2": ["output-1"],
      "box-3": ["output-3"],
    };
    const data = {
      inputs: [
        {
          boxId: "f2295a",
          value: 100000,
          internalId: "input-0",
        },
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },
      ],
      outputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "output-0",
        },
        {
          boxId: "box-2",
          value: 200000,
          internalId: "output-1",
        }, // provoking an undefined node
        //        ,
        {
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-1",
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-3",
          value: 400000,
          internalId: "output-3",
        },
      ],
    };
    const result = R.pipe(
      propGroupBy("internalId")("boxId")
      // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
    )(data.outputs);
    expect(result).toEqual(expected);
  });
});

describe("map inputs to internalIds of grouped outputs", () => {
  it("should work", () => {
    const expected = [["input-0", ["output-0", "output-2"]]];
    const outputsGroupedByBoxId = {
      "box-1": ["output-0", "output-2"],
      "box-2": ["output-1"],
      "box-3": ["output-3"],
    };
    const data = {
      inputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "input-0",
        },
        //        , // provoking an undefined input
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },
      ],
    };
    const result = R.pipe(
      mergeGroupedByWithProp("internalId")("boxId")(outputsGroupedByBoxId)
      //      R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
    )(data.inputs);
    expect(result).toEqual(expected);
  });
});

describe("to paired connections", () => {
  it("should map outputs over input 1", () => {
    const expected = [
      ["input-0", "output-0"],
      ["input-0", "output-2"],
    ];
    const input: any = [["input-0", ["output-0", "output-2"]]];

    const result = toPairedConnection(input);
    expect(result).toEqual(expected);
  });
  it("should map outputs over input 2", () => {
    const expected = [
      ["input-0", "output-0"],
      ["input-0", "output-2"],
      ["input-1", "output-0"],
      ["input-1", "output-2"],
      ["input-1", "output-3"],
    ];
    const input = [
      ["input-0", ["output-0", "output-2"]],
      ["input-1", ["output-0", "output-2", "output-3"]],
    ];

    const result = toPairedConnection(input as any);
    expect(result).toEqual(expected);
  });
});

describe("connections by boxId", () => {
  it("should work", () => {
    // const expected = [
    //   ["input-0", ["output-0", "output-2"]]
    // ]
    const expected = [
      ["input-0", "output-0"],
      ["input-0", "output-2"],
    ];
    const data = {
      inputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "input-0",
        },
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },
      ],
      outputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "output-0",
        },
        {
          boxId: "box-2",
          value: 200000,
          internalId: "output-1",
        },
        //        ,  // provoking an undefined node
        {
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-1",
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-3",
          value: 400000,
          internalId: "output-3",
        },
      ],
    };

    const result = connectionsByBoxId(data);
    expect(result).toEqual(expected);
  });
});
