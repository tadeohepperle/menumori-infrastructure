/*

import React from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { sendLoginRequest } from "../services/DataService";
import { Cookies } from "react-cookie";
import { JWTCOOKIENAME, USERDATACOOKIENAME } from "../services/AuthService";
const cookies = new Cookies();

export const GlobalStoreContext = React.createContext();

function parse(content) {
  try {
    let o = JSON.parse(content);
    return o;
  } catch (ex) {
    return null;
  }
}

export const GlobalStoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    jwt: cookies.get(JWTCOOKIENAME),
    user: parse(cookies.get(USERDATACOOKIENAME)),
    business: null,
    login: async (username, password) => {
      console.log(
        `logging in with username: ${username}, password: ${password}`
      );
      let data = await sendLoginRequest(username, password);
      if (data && data.jwt && data.user) {
        // login successful:
        cookies.set(USERDATACOOKIENAME, JSON.stringify(data.user));
        cookies.set(JWTCOOKIENAME, data.jwt);
        store.user = data.user;
        store.jwt = data.jwt;

        return true;
      }
      // login failed:
      else return false;
    },
    logout: async () => {
      console.log("logging out");
      cookies.remove(USERDATACOOKIENAME);
      cookies.remove(JWTCOOKIENAME);
      store.user = null;
      store.jwt = "";
      return true;
    },

    bugs: ["centipede"],
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    },
 
  }));

  return (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

*/
