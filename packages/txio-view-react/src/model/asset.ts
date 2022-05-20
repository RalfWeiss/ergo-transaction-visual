import * as R from 'ramda'
//import { ensureString, truncateWithEllipses } from '../utils'

// using a class to ensure defaults
export class Asset {
  constructor(
    public amount = '',
    public name = '',
    public tokenId = '',
    public type = ''
  ){}
}

const assetDefaults = new Asset()
const assetKeys = R.keys(assetDefaults)

const withAsssetDefaults = (obj:any):Asset => R.pipe(
  R.pick(assetKeys),
  R.mergeRight(assetDefaults) 
)(obj)

export const transform = (asset:Asset):Asset => {
  const transformations = {
    //amount: ensureString,
    // tokenId: truncateWithEllipses(10)
  }  
  return R.pipe(
    withAsssetDefaults,
    R.evolve(transformations)
  )(asset)
}