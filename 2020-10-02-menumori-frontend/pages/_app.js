import "../styles/tailwind.css";

import App, { Container } from "next/app";
import React from "react";
import Head from "next/head";
import { useStore } from "../redux/store";
import { Provider } from "react-redux";

export default function CustomApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
