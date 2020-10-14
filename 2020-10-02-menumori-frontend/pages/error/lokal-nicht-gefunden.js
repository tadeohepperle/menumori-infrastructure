import Router from "next/router";
import { useEffect } from "react";
import Layout from "../../src/components/Layout";
import { getAGBData, getURLOfRatingPage } from "../../src/services/DataService";

const Page = (props) => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-teal-500 tracking-widest font-medium title-font mb-1 uppercase">
              404 ERROR
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Es tut uns Leid, das Lokal konnte nicht gefunden werden.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Wenden sie sich gerne an ihren Ansprechpartner vor Ort oder
              kontaktieren Sie uns über unser Kontaktformular
            </p>
          </div>
        </div>
      </section>
      <div className="container"></div>
    </Layout>
  );
};

export default Page;
