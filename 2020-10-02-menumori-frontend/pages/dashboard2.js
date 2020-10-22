import DashBoardNavigation from "../src/components/dashboard/DashBoardNavigation";
import DashBoardSection from "../src/components/dashboard/DashBoardSection";
import Layout from "../src/components/Layout";
import { handleAuth } from "../src/services/AuthService";
import Scrollspy from "react-scrollspy";
import DashBoardSectionsContainer from "../src/components/dashboard/DashBoardSectionsContainer";

const Page = ({}) => {
  let sections = ["section1", "section2", "section3", "sec4", "sec5", "sec6"];
  return (
    <body class="bg-gray-100 text-gray-900 tracking-wider leading-normal">
      <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal mt-6 relative">
          <p class="text-base font-bold py-2 lg:pb-6 text-gray-700">Menu</p>
          <div class="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-orange-600 appearance-none focus:outline-none"
            >
              <svg
                class="fill-current h-3 float-right"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
          </div>
          <div
            class="top-6-em w-full sticky inset-0 top-6 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
            id="menu-content"
          >
            <ul class="list-reset py-2 md:py-0">
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-orange-600">
                <a
                  href="#section1"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 1</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section2"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 2</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section3"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 3</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section4"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 4</span>
                </a>
              </li>

              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section5"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 5</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section class="w-full lg:w-4/5">
          <h1 class="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
            Multi Section Form with Scrollspy
          </h1>
          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </body>
  );

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
/*



  return (
    <body class="bg-gray-100 text-gray-900 tracking-wider leading-normal">
      <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal mt-6 relative">
          <p class="text-base font-bold py-2 lg:pb-6 text-gray-700">Menu</p>
          <div class="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-orange-600 appearance-none focus:outline-none"
            >
              <svg
                class="fill-current h-3 float-right"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
          </div>
          <div
            class="top-6-em w-full sticky inset-0 top-6 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
            id="menu-content"
          >
            <ul class="list-reset py-2 md:py-0">
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-orange-600">
                <a
                  href="#section1"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 1</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section2"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 2</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section3"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 3</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section4"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 4</span>
                </a>
              </li>

              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section5"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 5</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section class="w-full lg:w-4/5">
          <h1 class="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
            Multi Section Form with Scrollspy
          </h1>
          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr class="bg-gray-300 my-12" />

          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
            Section 2
          </h2>

          <div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <form>
              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textfield"
                  >
                    Text Field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="form-input block w-full focus:bg-white"
                    id="my-textfield"
                    type="text"
                    value=""
                  />
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-select"
                  >
                    Drop down field
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    name=""
                    class="form-select block w-full focus:bg-white"
                    id="my-select"
                  >
                    <option value="Default">Default</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>

                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    for="my-textarea"
                  >
                    Text Area
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="form-textarea block w-full focus:bg-white"
                    id="my-textarea"
                    value=""
                    rows="8"
                  ></textarea>
                  <p class="py-2 text-sm text-gray-600">
                    add notes about populating the field
                  </p>
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-orange-700 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </body>
  );


*/
