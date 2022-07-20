const sut = require("./index");
const { faker } = require("@faker-js/faker");

test.each`
  source                  | expected
  ${"hello  world"}       | ${"hello world"}
  ${"hello   world"}      | ${"hello world"}
  ${"hello    world"}     | ${"hello world"}
  ${"hello     world"}    | ${"hello world"}
  ${"hello      world"}   | ${"hello world"}
  ${"hello       world"}  | ${"hello world"}
  ${"hello        world"} | ${"hello world"}
`("sut transtorms `$source` to `$expected`", ({ source, expected }) => {
  const actual = sut(source);
  expect(actual).toBe(expected);
});

test.each`
  source             | expected
  ${"hello\t world"} | ${"hello world"}
  ${"hello \tworld"} | ${"hello world"}
`(
  'sut transtorms "$source" that contains tab character to "$expected"',
  ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
  }
);

test.each`
  source             | bannedWords              | expected
  ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
  ${"hello purist"}  | ${["mockist", "purist"]} | ${"hello ******"}
`(
  "sut transforms `$source` to `$expected`",
  ({ source, bannedWords, expected }) => {
    const actual = sut(source, { bannedWords });
    expect(actual).toBe(expected);
  }
);

describe("given banned word", () => {
  const bannedWord = faker.lorem.word();
  const source = "hello " + bannedWord;
  const expected = "hello " + "*".repeat(bannedWord.length);

  test("${bannedWord} then invoke sut then it returns ${expected}", () => {
    const actual = sut(source, { bannedWords: [bannedWord] });
    expect(actual).toBe(expected);
  });
});
