import axios from "axios";
import Users from "./users.mjs";
import { jest } from "@jest/globals";

/*
이제, 실제로 API에 영향을 미치지 않고 이 메서드를 테스트 하기 위해 (그리고 따라서 느리고 취약한 테스트를 생성하여), 
자동적으로 axios 모듈을 모의하도록 jest.mock(...) 함수를 사용할 수 있습니다.

모듈을 모의 할 때 테스트가 확고히 하기 원하는 데이터를 반환하는 .get에 대해 mockResolvedValue를 제공할 수 있습니다. 
실제로는, axios.get('/users.json')이 가짜 응답을 반환하기 원한다고 표현합니다.
*/

jest.mock("axios");

console.log(axios);
console.log(axios.get.mockResolvedValue);

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };

  axios.get.mockResolvedValue(resp);

  // axios.get.mockImplementation(() => Promise.resolve(resp));

  return Users.all().then((data) => expect(data).toEqual(users));
});
