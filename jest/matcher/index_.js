// expect는 예상 객체를 반환합니다
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// toBe => toBe는 정확한 등가를 검사하기 위해 Object.is를 사용합니다. 객체의 값을 확인하려면, 대신 toEqual을 사용하세요
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// 매처의 반대를 테스트 할 수도 있습니다
test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

/*
toBeNull은 null에만 일치합니다
toBeUndefined는 undefined에만 일치합니다
toBeDefined는 toBeUndefined의 반대입니다
toBeTruthy는 if 구문이 true로 취급하는 모든 것과 일치합니다
toBeFalsy는 if 구문이 false로 취급하는 모든 것과 일치합니다
 */

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const n = 0;
  expect(n).not.toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

//숫자를 비교하는 대부분의 방법은 일치하는 동등한 매처를 가지고 있습니다.
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe와 toEqual은 숫자에 대해 동등합니다
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

//부동 소수점 등가의 경우, 테스트가 사소한 반올림 오류에 따라 달라지는 것을 원치 않으므로 toEqual 대신 toBeCloseTo를 사용하세요.
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           반올림 오류로 동작하지 않을 것입니다
  expect(value).toBeCloseTo(0.3); // 동작합니다
});

//toMatch로 정규식과 비교하여 문자열을 검사할 수 있습니다:
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

//toContain를 사용하여 배열이나 이터러블이 특정 항목을 포함하는지 여부를 확인 할 수 있습니다:
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer",
];
test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

//특정 함수가 호출될 때 오류를 발생시키는지를 테스트하려면 toThrow를 사용하세요.
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}

test("compiling android goes as expected", () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // 정확한 오류 메세지나 정규식을 사용할 수도 있습니다
  expect(compileAndroidCode).toThrow("you are using the wrong JDK");
  expect(compileAndroidCode).toThrow(/JDK/);
});
