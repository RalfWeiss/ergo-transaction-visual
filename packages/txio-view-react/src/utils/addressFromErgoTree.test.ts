// axios@0.19.0: Critical security vulnerability fixed in v0.21.1.
// so I've added this as a repo dependency
// see: https://medium.com/@jonchurch/use-github-branch-as-dependency-in-package-json-5eb609c81f1a
// pnpm install --save chriswill/ergo-ts#master

import { Address } from "@coinbarn/ergo-ts";

// Todo: I'm unable to test this using jest
/*
Error: Input must be an string, Buffer or Uint8Array
  at Object.blake2b (../../node_modules/.pnpm/blakejs@1.2.1/node_modules/blakejs/blake2b.js:330:16)
  at Function.fromErgoTree (../../node_modules/.pnpm/github.com+chriswill+ergo-ts@24d7351afd4f69d52687fe491eb03b1659df155f/node_modules/@coinbarn/ergo-ts/src/models/address.ts:45:26)

*/
describe.skip("address from ergoTree", () => {
  it("should provide mainnet address as the default", () => {
    const ergoTree = "100704000402040004060580bab7030580bab7030100d80bd601b2a4730000d602b2a5730100d603c27202d604e4c67201040ed6059372037204d606e4c672010505d607b2a5730200d608e4c672010605d609e4c672070805d60adb6903db6503fed60b9a720a720895efe6c67201070ed19592b1a57303ec720596830701720593c17202720693e4c67207040e720493e4c672070505720693e4c672070605720893e4c67207070e7203ed91720999720b73048f72099a720b73057306d19683020172058fe4c672010805720a"
    const expectedAddress =
      "2JBCG88L915pJZHa1Fgse7QGRVaVS55sAwJwPJhTDP7LRLCbACwQaPjx1MchD48ThP6SZxwcx6UZuqzh7SFZxEZw7sZbVs54TYgxiWU3Jz8Lp8auFBMunwvKMjswp5RoUxg84mwhKubR8Sb2adMXzd3sEcdsCGhtBacS2k4WghNdK92896r4FoELM2E512D5gt9sCJNRjKNqfJTYYLHg5wGFzfFnimeXyXoYwHvmoN5gqgWS9TeMBp145Y75bntN4iVNyEnxAqkrzmR8y5FYsnD74HrFAeMT";
    const result = Address.fromErgoTree(ergoTree).address;

    expect(result).toEqual(expectedAddress);
  });
});
