export interface Store {
  // boxes: {
  //   [key:string]:ErgoBox        // should be ErgoBox with dimensions
  // },
  title: string,
  allBoxes: string[],
  inputBoxIds: string[],
  outputBoxIds: string[],
//  dimensions: DimensionsByKey
}