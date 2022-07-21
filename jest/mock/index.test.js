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

test("test", () => {
  const mockCallback = jest.fn((x) => 42 + x);
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
