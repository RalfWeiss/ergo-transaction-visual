import { pickKeyValue } from "./pickKeyValue";

describe("pickKeyValue", () => {
  it("should omit empties and preserve order", () => {
    const expected = [
      { key: "z", value: "z-val" },
      { key: "a", value: "a-val" },
    ];
    const input = { a: "a-val", n: "", b: "b-val", z: "z-val" };
    expect(pickKeyValue(["z", "n", "a"])(input)).toEqual(expected);
  });
});
