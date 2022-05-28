import * as R from "ramda";
// import { getCombsMinMax, getAllCombbs, logWhen } from "../utils"
import { getCombsMinMax, logWhen } from "../utils";

const debugLog = logWhen(false);

export const allInOutCombies = (txs) => {
  const inCombies = R.pipe(R.filter(R.propEq("type", "input")), R.keys)(txs);
  const countInboxes = inCombies.length;

  const allOuts = R.pipe(R.filter(R.propEq("type", "output")), R.keys)(txs);

  const outCombies = R.pipe(
    R.filter(R.propEq("type", "output")),
    R.keys,
    debugLog("outCombies tsx filtered"),
    (outIds) => getCombsMinMax(1, outIds.length, outIds)
  )(txs);

  const collectAllOuts = R.pipe(
    debugLog("collectAllOuts input"),
    // R.map(R.values),
    R.values,
    R.unnest,
    R.unnest,
    R.uniq,
    R.sort(R.ascend(R.identity)),
    debugLog("collectAllOuts result")
  );

  return R.pipe(
    // () => getCombs(2,2,R.xprod(inCombies, outCombies)),   // alle combis which have data for each inputBox
    () =>
      getCombsMinMax(
        countInboxes,
        countInboxes,
        R.xprod(inCombies, outCombies)
      ), // alle combis which have data for each inputBox
    R.map(R.fromPairs),
    R.filter(R.compose(R.equals(countInboxes), R.length, R.keys)), // only get objects which have outputBoxes for each inputBox
    debugLog("allInOutCombies filtered"),
    // collectAllOuts,
    // debugLog("collectAllOuts"),
    R.filter(R.o(R.equals(allOuts), collectAllOuts)), // each output should be present
    debugLog("allInOutCombies result")
  )();
};

export const allInOutSampleStructures = (txs) =>
  R.pipe(
    allInOutCombies,
    R.map((sampleStructure) => ({
      outputCount: R.compose(R.sum, R.map(R.length), R.values)(sampleStructure),
      sampleStructure,
    })),
    R.sortBy(R.prop("outputCount"))
  )(txs);

// Todo: somewhere to clone boxesById
export const txSampler = (boxesById) => (txCombi) => {
  // _boxesById will be modified in place
  const _boxesById = R.clone(boxesById);

  return R.pipe(
    R.evolve({
      outputCount: R.identity,
      sampleStructure: R.pipe(
        R.mapObjIndexed((val, inKey) =>
          R.map((outKey) => {
            const amount = R.min(
              _boxesById[inKey].value,
              _boxesById[outKey].value
            );
            // console.log(`inKey: ${inKey} outKey: ${outKey} amount: ${amount}`)
            // update boxesById here
            _boxesById[inKey].value -= amount;
            _boxesById[outKey].value -= amount;

            return {
              internalId: outKey,
              value: amount,
            };
          })(val)
        )
      ),
    }),
    // R.assoc("balance", R.sum(R.pluck("value", R.values(_boxesById))))
    R.over(R.lensProp("balance"), () =>
      R.sum(R.pluck("value", R.values(_boxesById)))
    )
  )(txCombi);
};
