import DashBoardNavigation from "../../src/components/dashboard/DashBoardNavigation";
import DashBoardSection from "../../src/components/dashboard/DashBoardSection";
import Layout from "../../src/components/Layout";
import { handleAuth } from "../../src/services/AuthService";
import Scrollspy from "react-scrollspy";
import DashBoardSectionsContainer from "../../src/components/dashboard/DashBoardSectionsContainer";
import { useEffect, useState } from "react";
import SimpleHeadingAndSubHeading from "../../src/components/SimpleHeadingAndSubHeading";
import { DashBoardSelect } from "../../src/components/dashboard/OwnedBusinessesSelect";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import {
  getBusinessSettingsAndBusinessData,
  getShallowBusinessDataFromIds,
  updateBusinessSettings,
} from "../../src/services/DataService";
import DashBoardLoadingScreen from "../../src/components/dashboard/DashBoardLoadingScreen";
import DashBoardSectionSaveable from "../../src/components/dashboard/DashBoardSectionSaveable";
import EditableField from "../../src/components/dashboard/EditableField";
import _ from "lodash";
import { setShallowOwnedBusinessesData } from "../../src/redux/actions";
import BotStatusDisplay from "../../src/components/dashboard/BotStatusDisplay";
import StoryMentionsDisplay from "../../src/components/dashboard/StoryMentionsDisplay";

const Page = (props) => {
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
    shallowBusiness: props.slugname
      ? ownedBusinesses?.find((b) => b.slugname == props.slugname)
      : ownedBusinesses?.filter((b) => b.id == ownedBusinessIDs?.[0])[0],
  });

  const [changedSettings, setChangedSettings] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ownedBusinesses?.length > 0) {
      // kunde hat mindestens ein business:
      if (state.initialFetchNeeded) mountFetching();
    } else {
      //router.push("/login");
    }
  });
  async function mountFetching() {
    setLoading(true);

    let shallowBusinessData = ownedBusinesses[0];
    // if slugname is in url, shallowBusinessdata is set to business with slugname in url:
    if (props.slugname) {
      let foundBusinessWithSlugname = ownedBusinesses.find(
        (b) => b.slugname === props.slugname
      );
      if (foundBusinessWithSlugname) {
        shallowBusinessData = foundBusinessWithSlugname;
      }
    }
    setState({
      ...state,
      initialFetchNeeded: false,
      chosenBusinessID: shallowBusinessData.id,
      shallowBusiness: shallowBusinessData,
    });
    let success = await getBusinessSettingsAndBusinessData(
      shallowBusinessData,
      jwt,
      dispatch
    );
    setLoading(false);
  }

  async function chosenBusinessValueChange(newBusinessID) {
    let newShallowBusiness = ownedBusinesses.find((b) => b.id == newBusinessID);
    if (newShallowBusiness) {
      router.push(
        `/dashboard?s=${newShallowBusiness.slugname}`,
        `/dashboard?s=${newShallowBusiness.slugname}`,
        { shallow: true }
      );
    }
    setState({
      ...state,
      chosenBusinessID: newBusinessID,
      shallowBusiness: newShallowBusiness,
    });
    setLoading(true);
    let success = await getBusinessSettingsAndBusinessData(
      newShallowBusiness,
      jwt,
      dispatch
    );
    setLoading(false);
    setChangedSettings({});
  }

  async function onChangedSettingsSave() {
    console.log("settings changes save...");
    // change businessSettings (locally)
    Object.keys(changedSettings).map((key) => {
      _.set(businessSettings, key, changedSettings[key]);
    });

    // detect all depth 1 fields of businessSettings that have been changed: (only those need to be sent to the update endpoint)
    let depth1fieldNames = Object.keys(changedSettings).map(
      (key) => key.split(".")[0]
    );

    let objectForPutRequestBody = {};
    depth1fieldNames.forEach((fieldName) => {
      objectForPutRequestBody[fieldName] = businessSettings[fieldName];
    });
    // update to server:
    let businessSettingsID = state?.shallowBusiness?.businessSettingsID;
    if (businessSettingsID && objectForPutRequestBody) {
      let successful = await updateBusinessSettings(
        businessSettingsID,
        objectForPutRequestBody,
        jwt,
        dispatch
      ); // update global redux businessSettings is done in the updateBusinessSettings() function as well.
      console.log("update done: successful==", successful);
      if (successful) {
        // update shallowBusinessSettings (e.g. titlechanges)

        let shallowData = await getShallowBusinessDataFromIds(ownedBusinessIDs);
        dispatch(setShallowOwnedBusinessesData(shallowData));
        // clear the changedSettings object:
        setChangedSettings({});
      }
    }
  }

  function onChangedSettingsDismiss() {
    setChangedSettings({});
  }

  function onSettingsInputChange(value, propertyPath) {
    // modify copy of businessSettings (businessSettingsCopy) in local state
    let modifiedChangedSettings = { ...changedSettings };
    modifiedChangedSettings[propertyPath] = value;
    setChangedSettings({ ...modifiedChangedSettings });
  }

  /*
 <div className="bg-blue-500">{JSON.stringify(businessSettings)}</div>
  */

  function SaveButtonSection() {
    return (
      <div>
        <button
          className={`btn mx-3 `}
          onClick={() => onChangedSettingsSave()}
          disabled={!changesInBusinessData}
        >
          Speichern
        </button>
        {changesInBusinessData && (
          <button
            className="btn-danger mx-3 mt-3 md:mt-0"
            onClick={() => onChangedSettingsDismiss()}
          >
            Änderungen Verwerfen
          </button>
        )}
      </div>
    );
  }

  let changesInBusinessData = Object.keys(changedSettings).length != 0;

  return (
    <Layout>
      {false && (
        <div className="bg-blue-500">{JSON.stringify(ownedBusinesses)}</div>
      )}
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-0 mt-8 mb-12">
        {ownedBusinesses?.length > 1 && (
          <DashBoardSelect
            chosenOptionID={state.chosenBusinessID}
            onValueChange={chosenBusinessValueChange}
            options={ownedBusinesses}
            title="Dashboard verwalten für:"
          ></DashBoardSelect>
        )}

        <SimpleHeadingAndSubHeading
          //title={`Dashboard für ${state.shallowBusiness?.title}`}
          title={`Dashboard und Adminpanel`}
          subtitle={`Accounteinsteillungen, Zahlungsinformationen, Einstellungen: Unser Kunden Dashboard`}
        />

        {loading ? (
          <DashBoardLoadingScreen />
        ) : (
          <>
            <DashBoardNavigation />
            <DashBoardSectionsContainer>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mt-6 mx-2 text-teal-500">
                {businessSettings.title}
              </h1>
              {/* Verhalten auf Instagram */}
              <DashBoardSection
                noMarginTop
                id="section_statistik"
                title="Aktuelle Statistik"
              >
                <BotStatusDisplay
                  bot_instance_status={
                    businessData?.ig_data?.bot_instance_status
                  }
                ></BotStatusDisplay>
                <StoryMentionsDisplay
                  businessID={state.chosenBusinessID}
                  slugname={state.shallowBusiness?.slugname}
                ></StoryMentionsDisplay>
              </DashBoardSection>
              {/* ANGABEN ZUM GESCHÄFT */}
              <DashBoardSection
                id="section_allgemein"
                title="Angaben zum Geschäft"
              >
                <div>
                  <EditableField
                    title="Name Ihres Unternehmens"
                    value={changedSettings.title}
                    originalValue={businessSettings.title}
                    propertyPath={"title"}
                    inputOptions={{ placeholder: "Tommys Chili Burger" }}
                    onValueChange={onSettingsInputChange}
                  ></EditableField>
                </div>
                <div className="md:flex mb-6">
                  <div className="md:w-3/4">
                    <EditableField
                      title="Straße"
                      value={changedSettings["adress.street_name"]}
                      originalValue={businessSettings.adress.street_name}
                      inputOptions={{ placeholder: "Musterstraße" }}
                      propertyPath={"adress.street_name"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                  <div className="md:w-1/4">
                    <EditableField
                      title="Hausnummer"
                      value={changedSettings["adress.house_number"]}
                      originalValue={businessSettings.adress.house_number}
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
                <div className="md:flex mb-6">
                  <div className="md:w-1/2">
                    <EditableField
                      title="Postleitzahl"
                      value={changedSettings["adress.zip_code"]}
                      originalValue={businessSettings.adress.zip_code}
                      propertyPath={"adress.zip_code"}
                      inputOptions={{ placeholder: "10787" }}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                  <div className="md:w-1/2">
                    <EditableField
                      title="Ort"
                      value={changedSettings["adress.city"]}
                      originalValue={businessSettings.adress.city}
                      inputOptions={{ placeholder: "Musterstadt" }}
                      propertyPath={"adress.city"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                </div>

                <SaveButtonSection></SaveButtonSection>
              </DashBoardSection>
              {/* Verhalten auf Instagram */}
              <DashBoardSection
                id="section_ig_behavior"
                title="Verhalten auf Instagram"
              >
                <div className="md:flex mb-6">
                  <div className="md:w-1/2">
                    <EditableField
                      title="Rating Link"
                      helper=""
                      value={changedSettings["rating_url"]}
                      originalValue={businessSettings.rating_url}
                      inputOptions={{
                        placeholder: "https://www.google.de/maps/...",
                      }}
                      noedit
                      propertyPath={"rating_url"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                  <div className="md:w-1/2">
                    <EditableField
                      title="Rating Plattform"
                      helper=""
                      value={changedSettings["rating_platform"]}
                      originalValue={businessSettings.rating_platform}
                      inputOptions={{
                        placeholder: "Google",
                      }}
                      noedit
                      propertyPath={"rating_platform"}
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                </div>

                <div className="md:flex mb-6">
                  <div className="md:w-1/2">
                    <EditableField
                      title="Antwort auf Erwähnung in Story"
                      value={
                        changedSettings[
                          "ig_settings.ig_behavior_settings.story_mention_reply1"
                        ]
                      }
                      noedit
                      originalValue={
                        businessSettings.ig_settings.ig_behavior_settings
                          .story_mention_reply1
                      }
                      inputOptions={{
                        type: "textarea",
                        placeholder: `Hey {vorname}! \nDanke, dass du uns dabei hilfst, mehr Menschen für unser Restaurant zu begeistern.\nWir möchten dir dafür mit einem Geschenk danken. Vorher müsstest du allerdings noch unseren AGB ({link}) zustimmen, indem du uns ein einfaches "{comply_text}" zurückschreibst. `,
                      }}
                      propertyPath={
                        "ig_settings.ig_behavior_settings.story_mention_reply1"
                      }
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                  <div className="md:w-1/2">
                    <EditableField
                      title="Antwort auf ABG-Einverständnis"
                      value={
                        changedSettings[
                          "ig_settings.ig_behavior_settings.agb_complied_reply1"
                        ]
                      }
                      originalValue={
                        businessSettings.ig_settings.ig_behavior_settings
                          .agb_complied_reply1
                      }
                      noedit
                      inputOptions={{
                        type: "textarea",
                        placeholder: `Super, wir generieren deinen Geschenkcode, dies wird ca. 1-2 min. dauern. Wenn es dir bei uns gefällt, kannst du uns in der Zwischenzeit gerne auf Google bewerten: {link}. Sobald du deinen Geschenkcode erhältst, kannst du diesen einfach einem Mitarbeiter zeigen und erhältst dein Geschenk.`,
                      }}
                      propertyPath={
                        "ig_settings.ig_behavior_settings.agb_complied_reply1"
                      }
                      onValueChange={onSettingsInputChange}
                    ></EditableField>
                  </div>
                </div>

                <div>
                  <EditableField
                    title="Einverständisnachricht, die gesendet werden muss, um ABG zu bestätigen:"
                    value={
                      changedSettings[
                        "ig_settings.ig_behavior_settings.comply_text"
                      ]
                    }
                    originalValue={
                      businessSettings.ig_settings.ig_behavior_settings
                        .comply_text
                    }
                    propertyPath={
                      "ig_settings.ig_behavior_settings.comply_text"
                    }
                    inputOptions={{ placeholder: "ich akzeptiere" }}
                    onValueChange={onSettingsInputChange}
                  ></EditableField>
                </div>

                <SaveButtonSection></SaveButtonSection>
              </DashBoardSection>
              {/* Instagram Allgemeine Einstellungen */}
              <DashBoardSection
                id="section_ig_login"
                title="Instagram Login Daten"
              >
                <div className="md:flex mb-6">
                  <div className="md:w-1/2">
                    <EditableField
                      title="Username Instagram Account"
                      value={changedSettings["ig_settings.username"]}
                      originalValue={businessSettings.ig_settings.username}
                      inputOptions={{ placeholder: "username" }}
                      propertyPath={"ig_settings.username"}
                      onValueChange={onSettingsInputChange}
                      noedit
                    ></EditableField>
                  </div>
                  <div className="md:w-1/2">
                    <EditableField
                      title="Email-Adresse Instagram Account"
                      value={changedSettings["ig_settings.email"]}
                      originalValue={businessSettings.ig_settings.email}
                      inputOptions={{
                        placeholder: "max@mustermann.de",
                      }}
                      propertyPath={"ig_settings.email"}
                      onValueChange={onSettingsInputChange}
                      noedit
                    ></EditableField>
                  </div>
                </div>
                <div className="md:flex mb-6">
                  <div className="md:w-1/2">
                    <EditableField
                      title="Telefonnummer Instagram Account"
                      value={changedSettings["ig_settings.phone"]}
                      originalValue={businessSettings.ig_settings.phone}
                      propertyPath={"ig_settings.phone"}
                      inputOptions={{ placeholder: "015901469611" }}
                      onValueChange={onSettingsInputChange}
                      noedit
                    ></EditableField>
                  </div>
                  <div className="md:w-1/2">
                    <EditableField
                      title="Passwort Instagram Account"
                      value={changedSettings["ig_settings.password"]}
                      originalValue={businessSettings.ig_settings.password}
                      inputOptions={{ placeholder: "xxxxxxxxxx" }}
                      propertyPath={"ig_settings.password"}
                      onValueChange={onSettingsInputChange}
                      noedit
                    ></EditableField>
                  </div>
                </div>
                <SaveButtonSection></SaveButtonSection>
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

  return { slugname: context.query.s };
};

export default Page;
