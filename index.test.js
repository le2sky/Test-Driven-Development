const sut = require("./index");

test.each`
  source              | expected
  ${"hello  world"}   | ${"hello world"}
  ${"hello   world"}  | ${"hello world"}
  ${"hello    world"} | ${"hello world"}
`("sut transtorms `$source` to `$expected`", ({ source, expected }) => {
  const actual = sut(source);
  expect(actual).toBe(expected);
});
