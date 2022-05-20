import * as R from 'ramda'

export const pickKeyValue = (propNames:string[]) => R.pipe(
  //R.pick(['value','boxId','address']), // this ensures same order of values
  R.pick(propNames),
  R.toPairs,
  R.reject(R.o(R.isEmpty, R.nth(1))) as any,
  R.map(([key,val]) => ({key:key, value: val}))
) //(ergoBox)