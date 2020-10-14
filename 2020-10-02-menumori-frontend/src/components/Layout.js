import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children, title, metaDescription, noindex }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content={metaDescription} />
        {noindex && <meta name="robots" content="noindex" />}
      </Head>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
    </>
  );
}
