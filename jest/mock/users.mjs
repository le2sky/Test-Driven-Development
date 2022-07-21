import axios from "axios";

// API로부터 사용자를 가져오는 클래스가 있다고 가정해보세요.
//  클래스는 API를 호출하고 이후 모든 사용자를 포함하는 data 속성(attribute)를 반환시키기 위해 axios를 사용합니다:

class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

export default Users;
