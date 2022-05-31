import * as R from "ramda";
// import { getCombsMinMax, getAllCombbs, logWhen } from "../utils";
import { logWhen } from "../utils";
import {
  allInOutCombies,
  // allInOutSampleStructures,
  // allValidSamples,
  // toIdPairs,
  // txSampler,
} from "./allCombinations";
// import bigDemo from "../fixtures/big-demo.json";
import dappstepRentNft from "../fixtures/dappstep Rent NFT.json";
import { toState } from "../model";

const debugLog = logWhen(true);

describe.skip("big-demo", () => {
  it("should find connections on big data", () => {
    // const data = toState(bigDemo as any);
    const data = toState(dappstepRentNft as any);
    const expected = [
      ["input-0", "output-1"],
      ["input-1", "output-0"],
      ["input-1", "output-2"],
    ];
    const result = R.pipe(
      debugLog("big-demo input"),
      allInOutCombies
      // allInOutSampleStructures,
      // allValidSamples,
      // debugLog("big-demo allValidSamples"),
      // toIdPairs
    )(data.boxes);
    // console.log("big-demo result: ", JSON.stringify(result))
    expect(result).toEqual(expected);
  });
});
