import { useState } from "react";
import { postContactMessage } from "../services/DataService";

export default function Footer() {
  const [state, setState] = useState({
    email: "",
    sent: false,
    loading: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ ...state, loading: true });
    await postContactMessage(null, "NEWSLETTERSIGNUP", state.email, null);
    setState({ ...state, loading: false, sent: true });
  }

  return (
    <>
      <footer className="body-font">
        <div className="container px-5 pt-24 pb-12 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="footer-heading">Rechtliches</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="footer-link">Datenschutzerklärung</a>
                </li>
                <li>
                  <a className="footer-link">Impressum</a>
                </li>
                <li>
                  <a className="footer-link" href="/#contact">
                    Kontakt
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="footer-heading">Referenzen</h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="footer-link"
                    href="https://www.prangerle-solutions.de/"
                  >
                    Prangerle Solutions
                  </a>
                </li>
                <li>
                  <a className="footer-link">Über uns</a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.lakesideliferpg.com/core/"
                  >
                    Arma 3 Reallife Server
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.vr-preisvergleich.de/"
                  >
                    VR-Brillen Preisvergleich
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="footer-heading">Information</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="footer-link">Technologie</a>
                </li>
                <li>
                  <a className="footer-link">Kunden</a>
                </li>
                <li>
                  <a className="footer-link">Funktionsweise</a>
                </li>
              </nav>
            </div>
            {state.sent}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              {state.sent ? (
                <p className="text-gray-600 mt-2 md:text-left text-center text-base">
                  Vielen Dank für die Anmeldung zu unserem Newsletter. Wir haben
                  Ihnen eine Anmeldebestätigung per Mail zukommen lassen.
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="footer-heading">Newsletter erhalten</h2>
                  <div className="xl:flex-no-wrap md:flex-no-wrap lg:flex-wrap flex-wrap justify-center md:justify-start my-4">
                    <input
                      className="font-bold w-50 text-gray-700 text-bold sm:w-auto rounded xl:mr-4 lg:mr-0 sm:mr-4 mr-2 border border-gray-400 focus:outline-none focus:border-teal-500 text-base py-2 px-4"
                      placeholder="max@mustermann.de"
                      type="email"
                      value={state.email}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                      disabled={state.loading}
                      required
                    />

                    <button
                      className="btn mt-4 flex-shrink-0 inline-flex w-50"
                      type="submit"
                    >
                      eintragen
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2 md:text-left text-center text-base">
                    Durch Klicken des Buttons bestägigen Sie die Eintragung in
                    unseren Newsletter.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-teal-500">
              <span className="ml-3 text-xl">MENUMORI</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
              © {new Date().getFullYear()} Prangerle Solutions e.K. —
              <a
                href="https://www.prangerle-solutions.de"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                www.prangerle-solutions.de
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
