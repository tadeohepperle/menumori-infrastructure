import "../styles/tailwind.css";
import Head from "next/head";
import App from "next/app";
import { GlobalStoreProvider } from "../src/store/globalStore";

export default class MyApp extends App {
  render() {
    let { Component, pageProps } = this.props;
    return (
      <GlobalStoreProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </GlobalStoreProvider>
    );
  }
}
