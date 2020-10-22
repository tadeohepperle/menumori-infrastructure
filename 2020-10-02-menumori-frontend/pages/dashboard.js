import DashBoardNavigation from "../src/components/dashboard/DashBoardNavigation";
import DashBoardSection from "../src/components/dashboard/DashBoardSection";
import Layout from "../src/components/Layout";
import { handleAuth } from "../src/services/AuthService";
import Scrollspy from "react-scrollspy";
import DashBoardSectionsContainer from "../src/components/dashboard/DashBoardSectionsContainer";
import { DASHBOARDNAVITEMS, waitPromise } from "../src/services/utility";
import { useEffect, useState } from "react";
import SimpleHeadingAndSubHeading from "../src/components/SimpleHeadingAndSubHeading";
import { OwnedBusinessesSelect } from "../src/components/dashboard/OwnedBusinessesSelect";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateBusinessSettingsAndBusinessData } from "../src/services/DataService";
import DashBoardLoadingScreen from "../src/components/dashboard/DashBoardLoadingScreen";
import DashBoardSectionSaveable from "../src/components/dashboard/DashBoardSectionSaveable";
import EditableField from "../src/components/dashboard/EditableField";
import _ from "lodash";

const Page = ({}) => {
  const router = useRouter();

  const [
    ownedBusinessIDs,
    jwt,
    ownedBusinesses,
    businessSettings,
    businessData,
  ] = useSelector((store) => [
    store?.user?.businesses?.map((b) => b._id),
    store?.jwt,
    store?.ownedBusinesses,
    store?.businessSettings,
    store?.businessData,
  ]);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    initialFetchNeeded: true,
    chosenBusinessID: ownedBusinessIDs?.[0] ? ownedBusinessIDs[0] : null,
    shallowBusiness: ownedBusinessIDs?.[0]
      ? ownedBusinesses.filter((b) => b.id == ownedBusinessIDs?.[0])[0]
      : null,
  });

  const [changedSettings, setChangedSettings] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ownedBusinesses.length > 0) {
      // kunde hat mindestens ein business:
      if (state.initialFetchNeeded) mountFetching();
    } else {
      router.push("/login");
    }
  });
  async function mountFetching() {
    console.log("fetch data...");
    setLoading(true);
    let shallowBusinessData = ownedBusinesses[0];
    setState({ ...state, initialFetchNeeded: false });
    let success = await updateBusinessSettingsAndBusinessData(
      shallowBusinessData,
      jwt,
      dispatch
    );
    setLoading(false);
    //setState({ ...state, loading: false });
    console.log("done fetching data with result: ", success);

    // get businessnames from Ids of possibleBusinessIds:  (To Populate Select)
  }

  async function chosenBusinessValueChange(newBusinessID) {
    console.log(newBusinessID);

    let newShallowBusiness = ownedBusinesses.filter(
      (b) => b.id == newBusinessID
    )[0];
    setState({
      ...state,
      chosenBusinessID: newBusinessID,
      shallowBusiness: newShallowBusiness,
    });
    setLoading(true);
    let success = await updateBusinessSettingsAndBusinessData(
      newShallowBusiness,
      jwt,
      dispatch
    );
    setLoading(false);

    //setState({ ...state, loading: false });

    // await api call
  }

  function onChangedSettingsSave() {
    console.log("settings changes save");
    // get modified copy of businessSettings from state

    // update to server:

    // update global redux data
  }

  function onChangedSettingsDismiss() {
    setChangedSettings({});
  }

  function onSettingsInputChange(value, propertyPath) {
    // modify copy of businessSettings (businessSettingsCopy) in local state
    console.log(value, propertyPath);

    //_.set(state.businessSettingsCopy, propertyPath, value);

    let modifiedChangedSettings = { ...changedSettings };
    modifiedChangedSettings[propertyPath] = value;
    setChangedSettings({ ...modifiedChangedSettings });
  }

  /*
 <div className="bg-blue-500">{JSON.stringify(businessSettings)}</div>
  */

  return (
    <Layout>
      <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-0 mt-8">
        {ownedBusinesses?.length > 1 && (
          <OwnedBusinessesSelect
            onValueChange={chosenBusinessValueChange}
            options={ownedBusinesses}
          ></OwnedBusinessesSelect>
        )}

        <SimpleHeadingAndSubHeading
          title={`Dashboard für ${state.shallowBusiness?.title}`}
          subtitle={`Accounteinsteillungen, Zahlungsinformationen, Einstellungen: Unser Kunden Dashboard`}
        />

        {loading ? (
          <DashBoardLoadingScreen />
        ) : (
          <>
            <DashBoardNavigation />
            <DashBoardSectionsContainer>
              <DashBoardSection
                id="section_allgemein"
                title="Angaben zum Geschäft"
              >
                <div>
                  <EditableField
                    title="Name des Betriebs"
                    value={
                      changedSettings.title === undefined
                        ? businessSettings.title
                        : changedSettings.title
                    }
                    propertyPath={"title"}
                    inputOptions={{ placeholder: "Tommys Chili Burger" }}
                    onValueChange={onSettingsInputChange}
                  ></EditableField>
                </div>
                <div class="md:flex mb-6">
                  <div class="md:w-3/4">
                    <EditableField
                      title="Straße"
                      value={
                        changedSettings["adress.street_name"] === undefined
                          ? businessSettings.adress.street_name
                          : changedSettings["adress.street_name"]
                      }
                      inputOptions={{ placeholder: "Musterstraße" }}
                      propertyPath={"adress.street_name"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                  <div class="md:w-1/4">
                    <EditableField
                      title="Hausnummer"
                      value={
                        changedSettings["adress.house_number"] === undefined
                          ? businessSettings.adress.house_number
                          : changedSettings["adress.house_number"]
                      }
                      inputOptions={{
                        type: "number",
                        min: 0,
                        max: 10000,
                        placeholder: 17,
                      }}
                      propertyPath={"adress.house_number"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                </div>
                <div class="md:flex mb-6">
                  <div class="md:w-1/2">
                    <EditableField
                      title="Postleitzahl"
                      value={
                        changedSettings["adress.zip_code"] === undefined
                          ? businessSettings.adress.zip_code
                          : changedSettings["adress.zip_code"]
                      }
                      propertyPath={"adress.zip_code"}
                      inputOptions={{ placeholder: "10787" }}
                      onValueChange={onSettingsInputChange}
                      noedit
                    ></EditableField>
                  </div>
                  <div class="md:w-1/2">
                    <EditableField
                      title="Ort"
                      value={
                        changedSettings["adress.city"] === undefined
                          ? businessSettings.adress.city
                          : changedSettings["adress.city"]
                      }
                      inputOptions={{ placeholder: "Musterstadt" }}
                      propertyPath={"adress.city"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                </div>

                <div>
                  <button
                    className="btn mx-3"
                    onClick={() => onChangedSettingsSave()}
                  >
                    Speichern
                  </button>
                  <button
                    className="btn-danger mx-3 mt-3"
                    onClick={() => onChangedSettingsDismiss()}
                  >
                    Änderungen Verwerfen
                  </button>
                </div>
              </DashBoardSection>
            </DashBoardSectionsContainer>
          </>
        )}
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


<DashBoardSectionSaveable
                id="testsec"
                title="Test Sektion"
              ></DashBoardSectionSaveable>
               {DASHBOARDNAVITEMS.map((el) => (
                <DashBoardSection
                  id={el.slugname}
                  title={el.title}
                ></DashBoardSection>
              ))}



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
