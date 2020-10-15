import Layout from "../src/components/Layout";
import LoginForm from "../src/components/LoginForm";
import { handleAuth } from "../src/services/AuthService";
import { BugsList } from "../src/store/globalStore";

function Page() {
  return (
    <Layout>
      <div className="container flex items-center">
        <LoginForm></LoginForm>
      </div>
    </Layout>
  );
}

Page.getInitialProps = async function (context) {
  await handleAuth(context, null, "/");

  return {};
};

export default Page;
