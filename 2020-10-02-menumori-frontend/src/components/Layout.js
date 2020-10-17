import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, title, metaDescription, noindex }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {noindex && <meta name="robots" content="noindex" />}
      </Head>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
