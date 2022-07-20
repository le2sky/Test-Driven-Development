async function fetchData(cb) {
  setTimeout(() => {
    cb("peanut butter");
  }, 2000);
}
async function fetchData_() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("peanut butter");
    }, 2000)
  );
}

async function fetchError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("error");
    }, 2000);
  });
}

// 이렇게 하지 마세요!
test("the data is peanut butter", () => {
  function callback(data) {
    expect(data).toBe("peanut butter");
  }
  fetchData(callback);
});

//문제는 콜백을 호출하기도 전에, 테스트는 fetchData가 끝나자마자 종료될 것이라는 겁니다.
// / Jest는 테스트가 끝나기 전에 done 콜백이 호출될 때까지 기다릴 것입니다.
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});

/*
확실하게 프로미스를 반환하세요 - 이 return 구문을 생락한다면, 테스트는
 fetchData로부터 반환된 프로미스가 리졸브 되고 then()이 콜백을 실행할 
 기회를 가지기 이전에 종료 될 것입니다.
*/
test("the data is peanut butter", () => {
  return fetchData_().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

/*
프로미스가 거절 될 것이 예상되는 경우 .catch 메서드를 사용하세요.
 특정 번호의 단언이 호출되는지를 확인 하기 위해 expect.assertions를 추가하세요. 
 그렇지 않으면 수행된 프로미스는 테스트를 실패하지 않게 될 겁니다.
 컴퓨터 프로그래밍에서 표명(表明), 가정 설정문(假定設定文) 또는 어서션(영어: assertion)은 프로그램 안에 추가하는 참·거짓을 미리 가정하는 문이다.

*/
test("the fatch failes with an error", () => {
  expect.assertions(1);
  return fetchError().catch((e) => expect(e).toMatch("error"));
});

/*
expect 구문에 .resolves 매처를 사용할 수도 있으며,
 Jest는 그 프로미스가 리졸브 되기를 기다릴 것입니다. 프로미스가 거부된다면,
  테스트는 자동으로 실패할 것입니다.

*/
test("the data is peanut buetter", () => {
  return expect(fetchData_()).resolves.toBe("peanut butter");
});

// 반드시 단언을 반환시키세요 — 이 return 구문을 생략하면, 테스트는 프로미스가 fetchData가 리졸브되고 then()이 콜백을 실행할 기회를 가지기 이전에 종료될 것입니다.

/*
프로미스가 거절 될 것이 예상되는 경우 .rejects 매처를 사용하세요. 이것은 .resolves 매처와 유사하게 동작합니다. 프로미스가 수행되는 경우, 테스트는 자동으로 실패할 것 입니다.
*/
test("the fetch failes with an error", () => {
  return expect(fetchError()).rejects.toMatch("error");
});

/*
또 다른 대안으로, 테스트에 async와 await를 사용할 수 있습니다. 비동기 테스트를 작성하기 위해, test에 전달된 함수의 앞에 async 키워드를 사용하세요. 예를 들어, 동일한 fetchData 시나리오는 다음과 같이 테스트 될 수 있습니다:
*/

test("the data is peanut butter", async () => {
  const data = await fetchData_();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchError();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

// async과 await을 .resolves와 .rejects와 함께 조합할 수도 있습니다.

test("the data is peanut butter", async () => {
  await expect(fetchData_()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchError()).rejects.toMatch("error");
});
