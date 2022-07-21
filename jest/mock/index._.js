// 모의 함수는 함수의 실제 구현을 삭제,
// 함수 호출을 (그리고 그 호출에 전달된 파라미터) 캡쳐,
//  new로 인스트턴스화 될 때 생성자 함수의 인스턴스 캡쳐, 반환 값의 테스트 시간 구성을 허용하여 코드 사이의
//  연결을 테스트 할 수 있게 해줍니다.

// 모의 함수를 위한 두 가지 방법이 있습니다: 테스트 코드에
// 사용할 모의 함수를 생성하거나, 의존성 모듈을 오버라이드 하기 위해 manual mock 함수를 생성

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const x = (a) => 42 + a;

test("test", () => {
  const mockCallback = jest.fn(x);
  forEach([0, 1], mockCallback);

  // 모의 함수가 두 번 호출 됩니다
  expect(mockCallback.mock.calls.length).toBe(2);

  // 함수에 대한 첫 번째 호출의 첫 번째 인자는 0 이었음
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 함수에 대한 두 번째 호출의 첫 번째 인자는 1 이었음
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // 함수에 대한 첫 번째 호출의 반환 된 값은 42 이었음
  expect(mockCallback.mock.results[0].value).toBe(42);
});

// 모든 모의 함수는 함수가 호출된 방법과 반환된 함수가 보관하고 있는 것에 대한 데이터가 보관된
// 특별한 .mock 속성을 가지고 있습니다.
// .mock 속성은 각 호출에 대한 this 값도 추적하므로, 다음 사항을 검사하는 것도 가능합니다:
test("mock", () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {};
  const bound = myMock.bind(b);
  bound();

  // console.log(myMock.mock.instances);
});

/*
// 함수는 정확히 한 번 호출됩니다
expect(someMockFunction.mock.calls.length).toBe(1);

// 함수에 대한 첫 번째 호출의 첫 번째 인자는 'first arg' 이었음
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 함수에 대한 첫 번째 호출의 두 번째 인자는 'second arg' 이었음
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 함수에 대한 첫 번째 호출의 반환 값은 'return value' 이었음
expect(someMockFunction.mock.results[0].value).toBe('return value');

// 이 함수는 정확히 두 번 인스턴스화 되었음
expect(someMockFunction.mock.instances.length).toBe(2);

// 값이 `test`로 설정 된 `name` 프로퍼티를 가진
// 이 함수의 첫 번째 인스턴스화에 의해 반환된 객체
expect(someMockFunction.mock.instances[0].name).toEqual('test');


*/

// 모의 함수는 테스트 중에 코드에 테스트 값을 주입할 수도 있습니다:

test("injection", () => {
  const myMock = jest.fn();
  //console.log(myMock());

  myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

  // console.log(myMock(), myMock(), myMock(), myMock());
});

// 모의 함수는 연속 전달 스타일을 함수를 사용하는 코드에서 매우 효과적입니다.
// 이 스타일로 작성된 코드는 사용되기 바로 전에 테스트에 직접 값을 주입시키기 위해서
//  있는 실제 구성 요소의 동작을 재생성하는 복잡한 스텁에 대한 필요성을 방지하는데 도움이 됩니다.

test("mockReturn", () => {
  const filterTest = jest.fn();

  filterTest.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter((num) => filterTest(num));

  // console.log(result);
  // console.log(filterTest.mock.calls);
});

// 그럼에도 불구하고, 반환 값을 지정하는 기능을 넘어서 극단적으로 모의 함수의 구현을 대체하는 것이 유용한 경우가 있습니다.
//  이는 모의 함수에 jest.fn나 mockImplementationOnce로 수행 될 수 있습니다.
test("inplementation", () => {
  const myMockFn = jest.fn((cb) => cb(null, true));
  myMockFn((err, val) => console.log(val));
});

//mockImplementation 메서드는 다른 모듈로부터 생성된 모의 함수의 기본 구현을 정의할 필요가 있을 때 유용합니다:
jest.mock("./foo"); // 이것은 자동모의를 통해 자동적으로 발생합니다
const foo = require("./foo");

// foo가 모의 함수입니다
foo.mockImplementation(() => 42);
console.log(foo());

//여러 함수 호출이 다른 결과를 생성하는 것처럼 모의 함수의 복잡한 동작을 재생성해야 하는 경우, mockImplementationOnce 메서드를 사용하세요:

test("test", () => {
  const myMockFn = jest
    .fn()
    .mockImplementationOnce((cb) => cb(null, true))
    .mockImplementationOnce((cb) => cb(null, false));

  myMockFn((err, val) => console.log(val));
  myMockFn((err, val) => console.log(val));
});

//모의 함수가 mockImplementationOnce로 정의된 구현을 소진할 경우, jest.fn으로 설정된 (정의가 되어 있다면) 기본 구현이 실행될 것입니다:

test("default mock", () => {
  const myMockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
});

//일반적으로 체이닝 된 메서드가 있는 (그리고 때문에 항상 this를 반환할 필요가 있는) 경우에, 모
//든 모의에 적용되는 .mockReturnThis() 함수의 형식으로 이를 단순화 하는 설탕 API가 있습니다:

const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};

//선택적으로 테스트 오류 출력에 "jest.fn()" 대신 표기될, 모의 함수에 대한 이름을 제공할 수 있습니다.
//테스트 출력에서 오류를 리포트하는 모의 함수를 빠르게 식별하려면 이를 사용하세요.

test("naming mock", () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue("default")
    .mockImplementation((scalar) => 42 + scalar)
    .mockName("add42");

  console.log(myMockFn(32));
});

//마지막으로, 모의 함수가 어떻게 호출되었는지를 확인하는데 부담을 덜기 위해, 몇 가지 사용자 정의 매처 함수를 추가했습니다:

test("user custom", () => {
  const mockFunc = jest.fn((a, b) => a + b);
  const arg1 = 1;
  const arg2 = 2;

  console.log(mockFunc(arg1, arg2));

  // 모의 함수가 적어도 한 번은 호출되었습니다
  expect(mockFunc).toHaveBeenCalled();

  // 모의 함수가 특정 인자를 가지고 적어도 한 번은 호출되었습니다
  expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

  // 모의 함수에 대한 마지막 호출이 특정 인자를 가지고 호출되었습니다
  expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

  // 모든 호출과 모의의 이름이 스냅샷으로 기록되었습니다
  expect(mockFunc).toMatchSnapshot();
});

//이 매처들은 .mock 속성(property) 검사의 일반적인 형태를 위한 설탕입니다.
//그것이 취향에 더 맞거나 더 구체적인 무언가를 해야 하는 경우 항상 수동으로 이것을 직접 할 수 있습니다:
test("", () => {
  const mockName = "test";
  const arg1 = 42;
  const arg2 = 1;

  const mockFunc = jest
    .fn()
    .mockImplementation((a, b) => a + b)
    .mockName(mockName);

  console.log(mockFunc(arg1, arg2));

  // 모의 함수는 적어도 한 번 호출되었습니다
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // 모의 함수가 특정 인자를 가지고 적어도 한 번은 호출되었습니다
  expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

  // 모의 함수에 대한 마지막 호출이 특정 인자를 가지고 호출되었습니다
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2,
  ]);

  // 모의 함수에 대한 마지막 호출의 첫 번째 인자가 `42` 이었습니다
  // (이 특정 단언에 대한 설탕 헬퍼가 존재하지 않는 것에 주목하세요)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

  // 스냅샷은 모의가 동일한 인자를 가지고 동일한 순서로, 동일한 횟수만큼 호출되었는지
  // 확인할 것입니다. 이름에 대해서도 확인할 것입니다.

  expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
  expect(mockFunc.getMockName()).toBe("test");
});
