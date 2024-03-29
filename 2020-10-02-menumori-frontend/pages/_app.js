import "../styles/tailwind.css";
import React from "react";
import Head from "next/head";
import { useStore } from "../src/redux/store";
import { Provider } from "react-redux";
import { StateChangerAndDisplay } from "./test";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function CustomApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  const childrenOfPersistor = (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/menumori.ico" />
      </Head>
      <Component {...pageProps} />
      {false && <StateChangerAndDisplay></StateChangerAndDisplay>}
    </>
  );

  return (
    <Provider store={store}>
      <PersistGate
        loading={childrenOfPersistor}
        // loading={
        //   <div style={{ width: "100%", height: "1000px", background: "red" }}>
        //     loading
        //   </div>
        // }
        persistor={persistor}
      >
        {childrenOfPersistor}
      </PersistGate>
    </Provider>
  );
}

/*
export default function CustomApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  console.log("store");
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
        <Component {...pageProps} />
        <StateChangerAndDisplay></StateChangerAndDisplay>
      </PersistGate>
    </Provider>
  );
}
*/

/*
class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    console.log("store");

    const persistor = persistStore(store, {}, function () {
      persistor.persist();
    });


    return (
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <StateChangerAndDisplay></StateChangerAndDisplay>
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(CustomApp);

*/

/* 

export default function CustomApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  console.log("store");
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
        <Component {...pageProps} />
        <StateChangerAndDisplay></StateChangerAndDisplay>
      </PersistGate>
    </Provider>
  );
}

*/
