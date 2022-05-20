// import * as R from "ramda";

// export class Asset {
//   constructor(
//     public amount = '',
//     public name = '',
//     public tokenId = '',
//     public type = ''
//   ){}
// }

export const truncateWithEllipses = (len: number) => (val: string) => {
  if (val.length <= len) {
    return val;
  }
  return `${val.substring(0, len)}...`;
};
