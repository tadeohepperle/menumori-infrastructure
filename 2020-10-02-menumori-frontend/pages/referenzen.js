import BusinessThumnailCard from "../src/components/BusinessThumnailCard";
import Layout from "../src/components/Layout";
import { getAllPublicBusinessData } from "../src/services/DataService";

const Page = ({ businesses }) => {
  console.log(businesses);

  return (
    <Layout>
      <section>
        <div class="container mb-2 sm:mb-8">
          <div class="flex flex-col">
            <div class="h-1 bg-gray-200 rounded overflow-hidden">
              <div class="w-24 h-full bg-teal-500"></div>
            </div>
            <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-2 md:mb-8">
              <h1 class="sm:w-2/5 mb-2 sm:mb-0">Unsere Kunden</h1>
              <p class="sm:w-3/5 leading-relaxed text-lg sm:pl-10 pl-0">
                Lokale Unternehmen schätzen unsere IT-Infrastruktur die
                Instagram-Marketing und das Sammeln von Google Bewertungen
                massiv erleichtert. Überzeugen Sie sich selbst.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap sm:-m-4 -mx-4 mt-4">
            {businesses.map((business) => (
              <div class="p-4 md:w-1/3 mb-4 sm:mb-12 ">
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

  return { businesses: [...businesses, ...businesses, ...businesses] };
};

export default Page;
