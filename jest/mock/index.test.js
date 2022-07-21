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

  console.log(myMock.mock.instances);
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
  console.log(myMock());

  myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
});
