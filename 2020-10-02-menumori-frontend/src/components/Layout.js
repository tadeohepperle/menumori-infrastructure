import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, title, metaDescription, noindex }) => {
  title = title || "Menumori Instagram Services";
  metaDescription =
    metaDescription ||
    "Wir generieren automatisiert Kooperationen mit Micro-Influencern. Die Menumori-Instagram Services richten sich vor allem an lokale Unternehmen, die Reichweite und Umsatz steigern möchten.";

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
