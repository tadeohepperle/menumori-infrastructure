import { connect, useDispatch, useSelector } from "react-redux";
import { setUserAndJWT } from "../src/redux/actions";
import { types } from "../src/redux/reducers";
import Layout from "../src/components/Layout";

const Page = () => {
  return (
    <Layout>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>
            <DisplayState></DisplayState>
            <hr></hr>
            <StateChangerAndDisplay></StateChangerAndDisplay>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

const mapDispatchToProps = () => {
  return { setUserAndJWT: setUserAndJWT };
};

const mapStateToProps = (state) => {
  return { reduxState: state };
};

const DisplayStateInternal = (props) => {
  return <div>{JSON.stringify(props.reduxState)}</div>;
};

const DisplayState = connect(mapStateToProps)(DisplayStateInternal);

export const StateChangerAndDisplay = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const setUJ = () => {
    dispatch(setUserAndJWT({ name: "thomas" }, Math.random().toString()));
  };

  return (
    <div class="container">
      <button
        className="btn"
        onClick={() => {
          console.log("click");
          setUJ();
        }}
      >
        Change User
      </button>
      <hr></hr>
      <div style={{ overflow: "hidden" }}>{JSON.stringify(state)}</div>
    </div>
  );
};
