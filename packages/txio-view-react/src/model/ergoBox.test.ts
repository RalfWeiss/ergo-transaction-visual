test("ergoBox Number", () => {
  const val = Number(9551050000);
  expect(val.toString()).toEqual("9551050000");
});

test("ergoBox BigInt", () => {
  const val = BigInt(9551050000);
  expect(val.toString()).toEqual("9551050000");
});
