import BusinessThumnailCard from "../src/components/BusinessThumnailCard";
import Layout from "../src/components/Layout";
import HeadingBig from "../src/components/small/HeadingBig";
import { getAllPublicBusinessData } from "../src/services/DataService";

const Page = ({ businesses }) => {
  console.log(businesses);

  return (
    <Layout>
      <section>
        <div className="container my-24 sm:mb-8">
          <div className="flex flex-col">
            <HeadingBig
              title="Lokale Unternehmen, die Menumori bereits benutzen:"
              subtitle="Unsere Kunden"
            ></HeadingBig>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 mt-4">
            {businesses.map((business) => (
              <div className="p-4 md:w-1/3 mb-4 sm:mb-12 ">
                <BusinessThumnailCard
                  business={business}
                ></BusinessThumnailCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

Page.getInitialProps = async function (context) {
  let businesses = await getAllPublicBusinessData();

  return { businesses };
};

export default Page;
