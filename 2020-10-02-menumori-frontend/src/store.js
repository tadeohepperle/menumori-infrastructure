/*

import { observable, computed, action } from "mobx";
import { sendLoginRequest } from "./services/DataService";
import { JWTCOOKIENAME, USERDATACOOKIENAME } from "./services/AuthService";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class MyStore {
  @observable user = null;

  @observable jwt = "";

  constructor() {
    this.user = null;
    this.jwt = "";
  }

  @action
  setJWT(user) {
    this.user = user;
  }

  @action
  setUser(user) {
    this.user = user;
  }

  @action
  async login(username, password) {
    console.log(`logging in with username: ${username}, password: ${password}`);
    let data = await sendLoginRequest(username, password);
    if (data && data.jwt && data.user) {
      // login successful:
      cookies.set(USERDATACOOKIENAME, JSON.stringify(data.user));
      cookies.set(JWTCOOKIENAME, data.jwt);
      this.user = data.user;
      this.jwt = data.jwt;
      return true;
    }
    // login failed:
    else return false;
  }

  @action
  async logout() {
    console.log("logging out");
    cookies.remove(USERDATACOOKIENAME);
    cookies.remove(JWTCOOKIENAME);
    store.user = null;
    store.jwt = "";
    return true;
  }
}

// export singleton store
const store = new MyStore();
export default store;


*/
