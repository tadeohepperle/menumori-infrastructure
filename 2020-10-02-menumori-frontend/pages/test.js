import { connect } from "react-redux";
import Layout from "../src/components/Layout";
import store from "../src/store";

const Page = () => {
  return (
    <Layout>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>
            <DisplayState></DisplayState>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => {
  return { reduxState: state };
};

const DisplayCOmponent = (props) => {
  return <div>{JSON.stringify(props.reduxState)}</div>;
};

const DisplayState = connect(mapStateToProps)(DisplayCOmponent);
