import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/AuthService";
import { SVGElements } from "./small/SVG";

export default function NavBar() {
  const router = useRouter();
  const loggedIn = useSelector((state) => !!state.jwt);
  const dipatch = useDispatch();

  return (
    <header
      className="text-gray-700 body-font bg-gray-200 top-0 z-30"
      /* lg:sticky */
    >
      {/* bg-orange-200 */}
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            className="w-10 h-10 text-white p-2 bg-teal-500 rounded-full"
            viewBox="0 0 24 24"
          >
            {SVGElements.MENUMORI()}
          </svg>
          <span className="ml-3 text-xl font-bold uppercase cursor-pointer text-teal-500">
            Menumori
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="navbar-link" href="referenzen">
            Referenzen
          </a>
          {false && (
            <a className="navbar-link" href="menumori">
              Über uns
            </a>
          )}
          <a className="navbar-link" href="/#contact">
            Kontakt
          </a>
          <a className="navbar-link" href="/#features">
            Features
          </a>
          {loggedIn /* store.jwt */ && (
            <a className="navbar-link" href="/dashboard">
              Dashboard
            </a>
          )}
        </nav>
        {loggedIn /* store.jwt */ ? (
          <button
            className="btn-secondary inline-flex items-center mt-4 ml-3 md:mt-0"
            onClick={async () => {
              await logout(dipatch, router);
            }}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        ) : (
          <a href="/login">
            <button className="btn inline-flex items-center mt-4  mx-3 md:mt-0">
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </a>
        )}
      </div>
    </header>
  );
}
