// 테스트를 작성하는 동안 종종 테스트가 수행되기 전에 발생할 필요가 있는 설정 작업이 있고,
// 테스트가 수행 된 이후 발생해야 할 필요가 있는 마무리 작업이 있습니다. Jest는 이를 처리하는 헬퍼 함수들을 제공합니다.

// 많은 테스트를 위해 반복적으로 수행될 필요가 있는 작업이 있다면, beforeEach와 afterEach를 사용할 수 있습니다.

const database = {};

const isCity = (city) => {
  return database.cities.includes(city);
};

function initializeCityDatabase() {
  database.cities = ["Vienna", "San Juan"];
}

function clearCityDatabase() {
  delete database.cities;
}

beforeEach(() => {
  initializeCityDatabase();
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
