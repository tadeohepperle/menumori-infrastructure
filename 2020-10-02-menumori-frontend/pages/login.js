import Layout from "../src/components/Layout";
import LoginForm from "../src/components/LoginForm";
import { initializeStore, wrapper } from "../src/redux/store";
import { handleAuth } from "../src/services/AuthService";
import withRedux from "next-redux-wrapper";

function Page() {
  //return <div>Hallo</div>;

  return (
    <Layout>
      <div className="container flex items-center">
        <LoginForm></LoginForm>
      </div>
    </Layout>
  );
}

/*
Page.getInitialProps = async function (context) {
  console.log("getinit");
  const store = initializeStore();

  console.log(store.getState());

  // await handleAuth(context, null, "/");

  return {};
};

*/
export default Page;

//export default withRedux(initializeStore, (state) => ({ state }))(Page);
