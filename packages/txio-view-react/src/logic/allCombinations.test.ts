import * as R from "ramda";
// import { getCombsMinMax, getAllCombbs, logWhen } from "../utils";
import { logWhen } from "../utils";
import {
  allInOutCombies,
  allInOutSampleStructures,
  allValidSamples,
  toConnectionInfoEx,
  toIdPairs,
  txSampler,
} from "./allCombinations";
import RentNftData from "../fixtures/dappstep Rent NFT state-boxes.json";

// const debugLog = logWhen(false);

describe("allInOutCombies", () => {
  it("should work for 1-in 2-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
      },
    };
    const expected = [
      // { "I-1": ["O-1"] },              // invalid: all output must have been respected
      // { "I-1": ["O-2"] },              // invalid: all output must have been respected
      { "I-1": ["O-1", "O-2"] },
    ];
    const result = allInOutCombies(data.txs);

    expect(result).toEqual(expected);
  });

  it("should work for 2-in 3-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
        // "O-3": { internalId: "O-3", boxType: "outputBox", value: 50},
      },
    };
    const expected = [
      // { "I-1": ["O-1"], "I-2": ["O-1"] },         // invalid: all output must have been respected
      { "I-1": ["O-1"], "I-2": ["O-2"] },
      { "I-1": ["O-1"], "I-2": ["O-1", "O-2"] },
      { "I-1": ["O-2"], "I-2": ["O-1"] },
      // { "I-1": ["O-2"], "I-2": ["O-2"] },         // invalid: all output must have been respected
      { "I-1": ["O-2"], "I-2": ["O-1", "O-2"] },
      { "I-1": ["O-1", "O-2"], "I-2": ["O-1"] },
      { "I-1": ["O-1", "O-2"], "I-2": ["O-2"] },
      { "I-1": ["O-1", "O-2"], "I-2": ["O-1", "O-2"] },
    ];
    const debugLog = logWhen(false);
    const result = R.pipe(
      allInOutCombies,
      debugLog("allInOutCombies")
    )(data.txs);
    expect(result).toEqual(expected);
  });
});

describe("allInOutSampleStructures", () => {
  it("should work for 1-in 2-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
      },
    };
    const expected = [
      // { "I-1": ["O-1"] },              // invalid: all output must have been respected
      // { "I-1": ["O-2"] },              // invalid: all output must have been respected
      {
        sampleStructure: { "I-1": ["O-1", "O-2"] },
        outputCount: 2,
      },
    ];
    const result = allInOutSampleStructures(data.txs);

    expect(result).toEqual(expected);
  });
  it("should work for 2-in 3-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
        "O-3": { internalId: "O-3", boxType: "outputBox", value: 50 },
      },
    };

    const expected = [
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-1"],
          "I-2": ["O-2", "O-3"],
        },
      },
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-2"],
          "I-2": ["O-1", "O-3"],
        },
      },
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-3"],
          "I-2": ["O-1", "O-2"],
        },
      },
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-1", "O-2"],
          "I-2": ["O-3"],
        },
      },
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-1", "O-3"],
          "I-2": ["O-2"],
        },
      },
      {
        outputCount: 3,
        sampleStructure: {
          "I-1": ["O-2", "O-3"],
          "I-2": ["O-1"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-2"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-3"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-2"],
          "I-2": ["O-1", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-2"],
          "I-2": ["O-2", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-3"],
          "I-2": ["O-1", "O-2"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-3"],
          "I-2": ["O-2", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-2", "O-3"],
          "I-2": ["O-1", "O-2"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-2", "O-3"],
          "I-2": ["O-1", "O-3"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-1"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-2"],
        },
      },
      {
        outputCount: 4,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-3"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-1", "O-2"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-1", "O-3"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-2", "O-3"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-1", "O-2"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-1", "O-3"],
        },
      },
      {
        outputCount: 5,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-2", "O-3"],
        },
      },
      {
        outputCount: 6,
        sampleStructure: {
          "I-1": ["O-1", "O-2", "O-3"],
          "I-2": ["O-1", "O-2", "O-3"],
        },
      },
    ];

    const debugLog = logWhen(false);
    const result = R.pipe(
      allInOutSampleStructures,
      debugLog("allInOutSampleStructures")
    )(data.txs);
    expect(result).toEqual(expected);
  });
});

describe("txSampler", () => {
  it("should spread inputBoxes accoring to sampleStructure", () => {
    const input = {
      outputCount: 3,
      sampleStructure: {
        "I-1": ["O-1", "O-2"],
        "I-2": ["O-3"],
      },
    };
    const expected = {
      outputCount: 3,
      balance: 0, // if balance in result isn't 0 the sample isn't valid
      zeroValueCount: 0,
      patchesCount: 0,
      sampleStructure: {
        "I-1": [
          { internalId: "O-1", value: 50, patchesCount: 0 },
          { internalId: "O-2", value: 50, patchesCount: 0 },
        ],
        "I-2": [{ internalId: "O-3", value: 50, patchesCount: 0 }],
      },
    };
    const txs = {
      "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
      "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
      "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
      "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
      "O-3": { internalId: "O-3", boxType: "outputBox", value: 50 },
    };
    const txsAfter = R.clone(txs);
    // Todo: just for test; clone txs somewhere
    // txs is modified here
    const result = txSampler(txs)(input);
    expect(txs).toEqual(txsAfter);
    expect(result).toEqual(expected);
  });
});

describe("allValidSamples", () => {
  it("should work for 1-in and 2-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
      },
    };
    const expected = [
      {
        outputCount: 2,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 0,
        sampleStructure: {
          "I-1": [
            {
              internalId: "O-1",
              patchesCount: 0,
              value: 50,
            },
            {
              internalId: "O-2",
              patchesCount: 0,
              value: 50,
            },
          ],
        },
      },
    ];

    const debugLog = logWhen(false);
    const result = R.pipe(
      allValidSamples,
      debugLog("allValidSamples")
    )(data.txs);

    expect(result).toEqual(expected);
  });

  it("should work for 1-in and 2-outs (including assets)", () => {
    const data = {
      txs: {
        "I-1": {
          internalId: "I-1",
          boxType: "inputBox",
          value: 100,
          assets: [{ name: "T1", amount: 5 }],
        },
        "O-1": {
          internalId: "O-1",
          boxType: "outputBox",
          value: 50,
          assets: [{ name: "T1", amount: 3 }],
        },
        "O-2": {
          internalId: "O-2",
          boxType: "outputBox",
          value: 50,
          assets: [{ name: "T1", amount: 2 }],
        },
      },
    };
    const expected = [
      {
        outputCount: 2,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 4,
        sampleStructure: {
          "I-1": [
            {
              internalId: "O-1",
              patchesCount: 2,
              value: 50,
            },
            {
              internalId: "O-2",
              patchesCount: 2,
              value: 50,
            },
          ],
        },
      },
    ];

    const debugLog = logWhen(false);
    const result = R.pipe(
      allValidSamples,
      debugLog("allValidSamples")
    )(data.txs);

    expect(result).toEqual(expected);
  });

  it("should work for for 2-ins and 3-outs", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
        "O-3": { internalId: "O-3", boxType: "outputBox", value: 50 },
      },
    };

    const expected = [
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 0,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 50, patchesCount: 0 },
            { internalId: "O-2", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-3", value: 50, patchesCount: 0 }],
        },
      },
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 0,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 50, patchesCount: 0 },
            { internalId: "O-3", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-2", value: 50, patchesCount: 0 }],
        },
      },
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 0,
        sampleStructure: {
          "I-1": [
            { internalId: "O-2", value: 50, patchesCount: 0 },
            { internalId: "O-3", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-1", value: 50, patchesCount: 0 }],
        },
      },
    ];

    const debugLog = logWhen(false);
    const result = R.pipe(
      allValidSamples,
      debugLog("allValidSamples")
    )(data.txs);

    expect(result).toEqual(expected);
  });

  it("should work for for 2-ins and 3-outs (including assets)", () => {
    const data = {
      txs: {
        "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
        "I-2": {
          internalId: "I-2",
          boxType: "inputBox",
          value: 50,
          assets: [{ name: "T1", amount: 5 }],
        },

        "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
        "O-2": {
          internalId: "O-2",
          boxType: "outputBox",
          value: 50,
          assets: [{ name: "T1", amount: 5 }],
        },
        "O-3": { internalId: "O-3", boxType: "outputBox", value: 50 },
      },
    };

    const expected = [
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 2,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 50, patchesCount: 0 },
            { internalId: "O-3", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-2", value: 50, patchesCount: 2 }],
        },
      },
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 4,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 50, patchesCount: 0 },
            { internalId: "O-2", value: 50, patchesCount: 1 },
          ],
          "I-2": [{ internalId: "O-3", value: 50, patchesCount: 3 }],
        },
      },
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 4,
        sampleStructure: {
          "I-1": [
            { internalId: "O-2", value: 50, patchesCount: 1 },
            { internalId: "O-3", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-1", value: 50, patchesCount: 3 }],
        },
      },
    ];

    const debugLog = logWhen(false);
    const result = R.pipe(
      allValidSamples,
      debugLog("allValidSamples")
    )(data.txs);

    expect(result).toEqual(expected);
  });
});

describe("toIdPairs", () => {
  it("returns empty array when there was no solution found", () => {
    const input = [];
    const expected = [];
    const result = toIdPairs(input);
    expect(result).toEqual(expected);
  });
  it("returns connection pairs for first solution", () => {
    const input = [
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 2,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 50, patchesCount: 0 },
            { internalId: "O-3", value: 50, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-2", value: 50, patchesCount: 2 }],
        },
      },
    ];
    const expected = [
      ["I-1", "O-1"],
      ["I-1", "O-3"],
      ["I-2", "O-2"],
    ];
    const result = toIdPairs(input);
    expect(result).toEqual(expected);
  });
});

describe("toConnectionInfoEx", () => {
  it("returns empty array when there was no solution found", () => {
    const input = [];
    const expected = [];
    const result = toIdPairs(input);
    expect(result).toEqual(expected);
  });
  it("returns connection pairs for first solution", () => {
    const input = [
      {
        outputCount: 3,
        balance: 0,
        zeroValueCount: 0,
        patchesCount: 2,
        sampleStructure: {
          "I-1": [
            { internalId: "O-1", value: 10, patchesCount: 0 },
            { internalId: "O-3", value: 20, patchesCount: 0 },
          ],
          "I-2": [{ internalId: "O-2", value: 30, patchesCount: 2 }],
        },
      },
    ];
    const expected = [
      ["I-1", "O-1", 10],
      ["I-1", "O-3", 20],
      ["I-2", "O-2", 30],
    ];
    const result = toConnectionInfoEx(input);
    expect(result).toEqual(expected);
  });
});

describe("get all connections", () => {
  it("should work on state data", () => {
    const input = RentNftData;
    const expected = [
      ["input-0", "output-1"],
      ["input-1", "output-0"],
      ["input-1", "output-2"],
    ];
    const result = R.pipe(allValidSamples, toIdPairs)(input);
    expect(result).toEqual(expected);
  });
});

// describe.skip("getCombs", () => {
//   const data = {
//     txs: {
//       "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
//       "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
//       "O-1": { internalId: "O-1", boxType: "outputBox", value: 50 },
//       "O-2": { internalId: "O-2", boxType: "outputBox", value: 50 },
//       "O-3": { internalId: "O-3", boxType: "outputBox", value: 50 },
//     },
//   };

//   describe("getTxPosibilities", () => {
//     const getTxPosibilities = (txs) => {
//       const outCombies = R.pipe(
//         R.filter(R.propEq("type", "output")),
//         R.keys,
//         debugLog("outCombies tsx filtered"),
//         (outIds) => getCombsMinMax(1, outIds.length, outIds)
//       )(txs);

//       const inCombies = R.pipe(
//         R.filter(R.propEq("type", "input")),
//         R.keys
//       )(txs);
//       const countInboxes = inCombies.length;
//       // console.log("outCombies: ", outCombies)
//       // return

//       const allInOutCombies = R.pipe(
//         // () => getCombs(2,2,R.xprod(inCombies, outCombies)),   // alle combis which have data for each inputBox
//         () =>
//           getCombsMinMax(
//             countInboxes,
//             countInboxes,
//             R.xprod(inCombies, outCombies)
//           ), // alle combis which have data for each inputBox
//         R.map(R.fromPairs),
//         R.filter(R.compose(R.equals(countInboxes), R.length, R.keys)), // only get objects which have outputBoxes for each inputBox
//         debugLog("allInOutCombies filtered")
//       )();

//       return;
//       const allTxCombies = R.pipe(
//         // () => getCombs(2,2,R.xprod(inCombies, outCombies)),   // alle combis which have data for each inputBox
//         () =>
//           getCombsMinMax(
//             countInboxes,
//             countInboxes,
//             R.xprod(inCombies, outCombies)
//           ), // alle combis which have data for each inputBox
//         R.map(R.fromPairs),
//         R.filter(R.compose(R.equals(countInboxes), R.length, R.keys)), // only get objects which have outputBoxes for each inputBox
//         debugLog("allTxCombies filtered"),
//         // collect data per inputBox
//         R.map(
//           R.mapObjIndexed((v, k, obj) => {
//             const inputValue = txs[k].value;
//             const outputBoxes = R.map((k2) => txs[k2])(v);
//             const outputValue = R.compose(R.sum, R.pluck("value"))(outputBoxes);
//             return {
//               internalId: k,
//               inputBox: txs[k],
//               // inputValue: txs[k].value,
//               // outputBoxes: R.map(k2 => txs[k2])(v),
//               // //outputBoxes: v,
//               // outputValue: R.compose(R.sum,R.pluck("value"),R.map(k2 => txs[k2]))(v),
//               inputValue,
//               outputBoxes,
//               outputValue,
//               isValid: inputValue === outputValue,
//               // isValid: inputValue <= outputValue
//             };
//           })
//         ),
//         debugLog("allTxCombies mapped 1"),
//         // check inputValue === outputValue per InputBox

//         R.map((o) =>
//           R.pipe(
//             R.assoc(
//               "inputValue_",
//               R.sum(R.values(R.map(R.prop("inputValue"))(o)))
//             ),
//             R.assoc(
//               "outputValue_",
//               R.sum(R.values(R.map(R.prop("outputValue"))(o)))
//             ),
//             R.assoc("isValid", R.values(R.map(R.prop("isValid"))(o)))
//             // R.assoc("isValid", true)
//           )(o)
//         ),
//         debugLog("allTxCombies isValid"),
//         R.filter((o) => o.inputValue_ === o.outputValue_)
//         // R.filter(o => R.all(R.equals(true))(o.isValid))
//       )();
//       return allTxCombies;
//     };

//     it("should find all tx combies 2 inputs", () => {
//       const inCombies = [
//         // [],
//         // ['I-1'] ,
//         // ['I-2'] ,
//         // [ 'I-1', 'I-2' ]
//         "I-1",
//         "I-2",
//       ];
//       //     const outCombies = [
//       // //      [],
//       //       [ 'O-1' ],
//       //       [ 'O-2' ],
//       //       [ 'O-3' ],
//       //       [ 'O-1', 'O-2' ],
//       //       [ 'O-1', 'O-3' ],
//       //       [ 'O-2', 'O-3' ],
//       //       [ 'O-1', 'O-2', 'O-3' ]
//       //    ]
//       // const txs = {
//       //   "I-1": { internalId: "I-1", type:"input",  value: 100},
//       //   "I-2": { internalId: "I-2", type:"input",  value:  50},
//       //   "O-1": { internalId: "O-1", type:"output", value: 100},
//       //   "O-2": { internalId: "O-2", type:"output", value:  49},
//       //   "O-3": { internalId: "O-3", type:"output", value:   1},
//       // }
//       const txs = {
//         "I-1": { internalId: "I-1", boxType: "inputBox", value: 100 },
//         "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
//         // "I-3": { internalId: "I-3", type:"input",  value:  30},
//         "O-1": { internalId: "O-1", boxType: "outputBox", value: 100 },
//         "O-2": { internalId: "O-2", boxType: "outputBox", value: 20 },
//         "O-3": { internalId: "O-3", boxType: "outputBox", value: 29 },
//         "O-4": { internalId: "O-4", boxType: "outputBox", value: 1 },
//       };

//       const allTxCombies = getTxPosibilities(txs);
//       console.log(
//         "allTxCombies result: ",
//         JSON.stringify(allTxCombies, null, 2)
//       );
//       console.log(
//         "allTxCombies count: ",
//         JSON.stringify(allTxCombies.length, null, 2)
//       );
//       expect(allTxCombies.length).toEqual(1);
//     });

//     it("should find all tx combies 3 inputs", () => {
//       const txs = {
//         "I-1": { internalId: "I-1", boxType: "inputBox", value: 70 },
//         "I-2": { internalId: "I-2", boxType: "inputBox", value: 50 },
//         "I-3": { internalId: "I-3", boxType: "inputBox", value: 30 },
//         "O-1": { internalId: "O-1", boxType: "outputBox", value: 100 },
//         "O-2": { internalId: "O-2", boxType: "outputBox", value: 20 },
//         "O-3": { internalId: "O-3", boxType: "outputBox", value: 29 },
//         "O-4": { internalId: "O-4", boxType: "outputBox", value: 1 },
//       };

//       const allTxCombies = getTxPosibilities(txs);
//       console.log(
//         "allTxCombies result: ",
//         JSON.stringify(allTxCombies, null, 2)
//       );
//       console.log(
//         "allTxCombies count: ",
//         JSON.stringify(allTxCombies.length, null, 2)
//       );
//       expect(allTxCombies.length).toEqual(1);
//     });
//     // })

//     it.skip("should find all output combinations", () => {});
//   });

//   it.skip("test 2", () => {
//     const atLeastOneType = (type) => (data) => (keys) =>
//       R.reduce((acc, k) => {
//         if (data[k].type === type) {
//           return true;
//         }
//         return acc;
//       })(false)(keys);

//     const allCombs = (data) =>
//       R.pipe(
//         R.o(R.pluck("internalId"), R.values), // all ids
//         (ids) => getCombsMinMax(3, 5, ids),
//         R.filter(atLeastOneType("input")(data.txs)),
//         R.filter(atLeastOneType("output")(data.txs))
//       )(data.txs);

//     const res1 = allCombs(data);
//     console.log("res1.length: ", res1.length);
//     console.log("res1: ", res1);
//     expect(res1).toEqual([
//       [1, 2],
//       [1, 3],
//       [2, 3],
//       [1, 2, 3],
//     ]);
//     // getCombs (2, 2, [1, 2, 3])
//     console.log("res1: ", res1);
//   });
// });

// describe.skip("odometer", () => {
//   // see: https://stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays
//   function combineArrays(array_of_arrays) {
//     // First, handle some degenerate cases...

//     if (!array_of_arrays) {
//       // Or maybe we should toss an exception...?
//       return [];
//     }

//     if (!Array.isArray(array_of_arrays)) {
//       // Or maybe we should toss an exception...?
//       return [];
//     }

//     if (array_of_arrays.length == 0) {
//       return [];
//     }

//     for (let i = 0; i < array_of_arrays.length; i++) {
//       if (
//         !Array.isArray(array_of_arrays[i]) ||
//         array_of_arrays[i].length == 0
//       ) {
//         // If any of the arrays in array_of_arrays are not arrays or zero-length, return an empty array...
//         return [];
//       }
//     }

//     // Done with degenerate cases...

//     // Start "odometer" with a 0 for each array in array_of_arrays.
//     const odometer = new Array(array_of_arrays.length);
//     odometer.fill(0);

//     const output = [];

//     let newCombination = formCombination(odometer, array_of_arrays);

//     output.push(newCombination);

//     while (odometer_increment(odometer, array_of_arrays)) {
//       newCombination = formCombination(odometer, array_of_arrays);
//       output.push(newCombination);
//     }

//     return output;
//   } /* combineArrays() */

//   // Translate "odometer" to combinations from array_of_arrays
//   function formCombination(odometer, array_of_arrays) {
//     // In Imperative Programmingese (i.e., English):
//     // let s_output = "";
//     // for( let i=0; i < odometer.length; i++ ){
//     //    s_output += "" + array_of_arrays[i][odometer[i]];
//     // }
//     // return s_output;

//     // In Functional Programmingese (Henny Youngman one-liner):
//     return odometer.reduce(function (
//       accumulator,
//       odometer_value,
//       odometer_index
//     ) {
//       return `${accumulator}${array_of_arrays[odometer_index][odometer_value]}`;
//     },
//     "");
//   } /* formCombination() */

//   function odometer_increment(odometer, array_of_arrays) {
//     // Basically, work you way from the rightmost digit of the "odometer"...
//     // if you're able to increment without cycling that digit back to zero,
//     // you're all done, otherwise, cycle that digit to zero and go one digit to the
//     // left, and begin again until you're able to increment a digit
//     // without cycling it...simple, huh...?

//     for (
//       let i_odometer_digit = odometer.length - 1;
//       i_odometer_digit >= 0;
//       i_odometer_digit--
//     ) {
//       const maxee = array_of_arrays[i_odometer_digit].length - 1;

//       if (odometer[i_odometer_digit] + 1 <= maxee) {
//         // increment, and you're done...
//         odometer[i_odometer_digit]++;
//         return true;
//       }
//       if (i_odometer_digit - 1 < 0) {
//         // No more digits left to increment, end of the line...
//         return false;
//       }
//       // Can't increment this digit, cycle it to zero and continue
//       // the loop to go over to the next digit...
//       odometer[i_odometer_digit] = 0;
//       continue;
//     } /* for( let odometer_digit = odometer.length-1; odometer_digit >=0; odometer_digit-- ) */
//   } /* odometer_increment() */

//   // const res = combineArrays([ ["A","B","C"],
//   //                 ["+", "-", "*", "/"],
//   //                 ["1","2"] ] )

//   it.skip("odometer-1", () => {
//     const res = combineArrays([
//       ["I1", "-", "-"],
//       ["-", "I2", "-"],
//       ["-", "-", "I3"],
//       ["O1", "-"],
//       ["-", "O2"],
//     ]);

//     console.log("res: ", res);
//   });
//   it.skip("odometer-2", () => {
//     const outputCombies = [
//       ["O-1"],
//       ["O-2"],
//       ["O-3"],
//       ["O-1", "O-2"],
//       ["O-1", "O-3"],
//       ["O-2", "O-3"],
//       ["O-1", "O-2", "O-3"],
//     ];
//     const res = combineArrays([["I-1", "I-2"], outputCombies]);
//     console.log("odometer-2: ", JSON.stringify(res, null, 2));
//   });
// });
