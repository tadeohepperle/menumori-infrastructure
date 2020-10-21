import Layout from "../src/components/Layout";
import LoginForm from "../src/components/LoginForm";
import { handleAuth } from "../src/services/AuthService";
import { verifyJWT } from "../src/services/DataService";
import { BugsList } from "../src/store/globalStore";

const Page = ({}) => {
  return (
    <Layout>
      <div class="h-1 mt-12 bg-gray-200 rounded overflow-hidden">
        <div class="w-24 h-full bg-teal-500"></div>
      </div>
      <div className="container flex items-center">
        <div class="flex flex-col">
          <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-2 md:mb-8">
            <h1 class="sm:w-2/5 mb-2 sm:mb-0">Dashboard</h1>
            <p class="sm:w-3/5 leading-relaxed text-lg sm:pl-10 pl-0">
              Lokale Unternehmen schätzen unsere IT-I Lokale Unternehmen
              schätzen unsere IT-ILokale Unternehmen schätzen unsere IT-ILokale
              Unternehmen schätzen unsere IT-ILokale Unternehmen schätzen unsere
              IT-ILokale Unternehmen schätzen unsere IT-ILokale Unternehmen
              schätzen unsere IT-ILokale Unternehmen schätzen unsere IT-ILokale
              Unternehmen schätzen unsere IT-ILokale Unternehmen schätzen unsere
              IT-I
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Page.getInitialProps = async function (context) {
  await handleAuth(context, "/login");

  return {};
};

export default Page;
