import "../styles/tailwind.css";

import App, { Container } from "next/app";
import React from "react";
import Head from "next/head";
import { useStore } from "../src/redux/store";
import { Provider } from "react-redux";
import { StateChangerAndDisplay } from "./test";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function CustomApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <StateChangerAndDisplay></StateChangerAndDisplay>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
