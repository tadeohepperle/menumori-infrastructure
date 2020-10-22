import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

// cookie storage
import Cookies from "cookies-js";
import { CookieStorage } from "redux-persist-cookie-storage";

////////////////// persistance:
const persistConfig = {
  key: "primary",
  storage, //: new CookieStorage(Cookies, {}),
  whitelist: [
    "user",
    "jwt",
    "ownedBusinesses",
    "businessSettings",
    "businessData",
  ], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/////////////////////////////////

let store;

function initStore(initialState) {
  let store = createStore(
    persistedReducer /* rootReducer */,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  return store;
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

// ___________ or initializeStore?
