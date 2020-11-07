import { useState } from "react";
import { postContactMessage } from "../../services/DataService";
import HeadingBig from "../small/HeadingBig";

const LandingpageContactForm = () => {
  let [state, setState] = useState({
    email: "",
    name: "",
    message: "",
    sent: false,
    loading: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ ...state, loading: true });

    await postContactMessage(
      state.message,
      "CONTACTFORM",
      state.email,
      state.name
    );
    setState({ ...state, loading: false, sent: true });
  }

  return (
    <section
      className="text-gray-700 body-font relative section-emphasis"
      id="contact"
    >
      <div className="container px-5 py-24 mx-auto">
        <HeadingBig
          title="Fragen kostet nichts - Wir beraten Sie gerne:"
          subtitle="Kontakt aufnehmen"
        ></HeadingBig>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          {state.sent ? (
            <div className="text-center text-xl text-teal-500 my-8">
              Vielen Dank für Ihre Anfrage. Wir werden uns so bald wie möglich
              an Sie wenden.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <input
                  className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, name: e.target.value });
                  }}
                  disabled={state.loading}
                  required
                  value={state.name}
                />
              </div>
              <div className="p-2 w-1/2">
                <input
                  className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => {
                    setState({ ...state, email: e.target.value });
                  }}
                  disabled={state.loading}
                  required
                  value={state.email}
                />
              </div>
              <div className="p-2 w-full">
                <textarea
                  className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-teal-500 text-base px-4 py-2 resize-none block"
                  placeholder="Nachricht"
                  onChange={(e) => {
                    setState({ ...state, message: e.target.value });
                  }}
                  disabled={state.loading}
                  required
                  value={state.message}
                ></textarea>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                >
                  Nachricht senden
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingpageContactForm;
