// 테스트를 작성하는 동안 종종 테스트가 수행되기 전에 발생할 필요가 있는 설정 작업이 있고,
// 테스트가 수행 된 이후 발생해야 할 필요가 있는 마무리 작업이 있습니다. Jest는 이를 처리하는 헬퍼 함수들을 제공합니다.

// 많은 테스트를 위해 반복적으로 수행될 필요가 있는 작업이 있다면, beforeEach와 afterEach를 사용할 수 있습니다.

const database = {};
const foods = {};

const isCity = (city) => {
  return database.cities.includes(city);
};

const isValidCityFoodPair = (city, food) => {
  return foods[city] === food;
};

async function initializeCityDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      database.cities = ["Vienna", "San Juan"];
      resolve();
    }, 2000);
  });
}

async function initializeFoodDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      foods.Vienna = "Wiener Schnitzel";
      foods["San Juan"] = "Mofongo";
      resolve();
    }, 2000);
  });
}

function clearCityDatabase() {
  delete database.cities;
}

// beforeEach(() => {
//   initializeCityDatabase();
// });

// async
beforeEach(() => {
  return initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test("city database has vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has san juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

//경우에 따라, 파일의 시작 부분에 한 번만 설정할 필요가 있습니다. 설정이 비동기인 경우 특히 귀찮을 수 있으므
//로, 인라인으로 설정 할 수 없습니다. Jest는 이 상황을 처리하기 위한 beforeAll과 afterAll을 제공합니다.

beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test("city database has vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});
test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

/*
기본적으로, before와 after 블럭은 파일의 모든 테스트에 적용됩니다. describe 블럭을 사용하여 테스트들을 그룹핑할 수도 있습니다. 
describe 블럭 안에 있을 경우, before와 after 블럭들은 그 describe 블럭 내부의 테스트에만 적용됩니다.
*/

// 모든 테스트 적용
beforeEach(() => {
  return initializeCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

describe("matching cities to foods", () => {
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test("Vienna <3 sausage", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});

//
//
// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('', () => console.log('2 - test'));
// });
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

/*
Jest는 실제 테스트를 실행하기 전에 테스트 파일의 모든 describe 처리기를 실행합니다. 이것은 describe 블럭 내부보다 
before*와 after* 내에서 설정과 분해를 수행하는 또 다른 이유입니다. describe 블럭이 완료되면, 
기본적으로 Jest는 수집 단계에서 만난 순서대로 다음 단계로 순차적으로 모든 테스트를 수행하며, 
다음 단계로 이동하기 전에 각각이 완료되고 정리되기를 기다립니다.
*/

describe("outer", () => {
  console.log("describe outer-a");

  describe("describe inner 1", () => {
    console.log("describe inner 1");
    test("test 1", () => {
      console.log("test for describe inner 1");
      expect(true).toEqual(true);
    });
  });

  console.log("describe outer-b");

  test("test 1", () => {
    console.log("test for describe outer");
    expect(true).toEqual(true);
  });

  describe("describe inner 2", () => {
    console.log("describe inner 2");
    test("test for describe inner 2", () => {
      console.log("test for describe inner 2");
      expect(false).toEqual(false);
    });
  });
  console.log("describe outer-c");
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2

// 테스트가 실패하는 경우, 가장 먼저 확인해야 할 사항 중 하나는 수행할 테스트가 유일할 경우 테스트가 실패하는가의 여부여야 합니다.
//  Jest에서 단 하나의 테스트만 수행하기 위해, 임시적으로 그 test 명령어를 test.only로 변경하세요

test.only("이 테스트는 수행할 유일한 테스트가 될 것입니다", () => {
  expect(true).toBe(false);
});

test("이 테스트는 수행되지 않을 것입니다", () => {
  expect("A").toBe("A");
});
