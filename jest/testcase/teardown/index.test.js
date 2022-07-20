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
