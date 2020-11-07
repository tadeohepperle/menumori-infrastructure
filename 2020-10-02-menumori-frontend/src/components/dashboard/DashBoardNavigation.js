import Scrollspy from "react-scrollspy";
import { DASHBOARDNAVITEMS } from "../../services/utility";
import { animateScroll as scroll } from "react-scroll";

export default function DashBoardNavigation(props) {
  return (
    <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal mt-6 relative">
      <p className="text-base font-bold py-2 lg:pb-6 text-gray-700 hidden lg:visible">
        Navigation
      </p>

      <div
        className="top-6-em w-full sticky inset-0 top-6 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
        id="menu-content"
      >
        <ul className="list-reset py-2 md:py-0">
          <Scrollspy
            items={DASHBOARDNAVITEMS.map((el) => el.slugname)}
            currentClassName="dashboard-nav-li-selected"
          >
            {DASHBOARDNAVITEMS.map((el, i) => (
              <li
                key={el.slugname}
                className=" "
                className={`dashboard-nav-li ${
                  i == 1211212 ? "dashboard-nav-li-selected" : ""
                }`}
              >
                <a href={`#${el.slugname}`} className="dashboard-nav-a">
                  <span className="dashboard-nav-span">{el.title}</span>
                </a>
              </li>
            ))}
          </Scrollspy>
        </ul>
      </div>
    </div>
  );
}

/*

<div className="block lg:hidden sticky inset-0">
        <button
          id="menu-toggle"
          className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-orange-600 appearance-none focus:outline-none"
        >
          <svg
            className="fill-current h-3 float-right"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>


*/
