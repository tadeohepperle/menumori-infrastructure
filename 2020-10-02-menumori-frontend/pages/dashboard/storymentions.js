import DashBoardNavigation from "../../src/components/dashboard/DashBoardNavigation";
import DashBoardSection from "../../src/components/dashboard/DashBoardSection";
import Layout from "../../src/components/Layout";
import { handleAuth, redirectTo } from "../../src/services/AuthService";
import Scrollspy from "react-scrollspy";
import DashBoardSectionsContainer from "../../src/components/dashboard/DashBoardSectionsContainer";
import { useEffect, useState } from "react";
import SimpleHeadingAndSubHeading from "../../src/components/SimpleHeadingAndSubHeading";
import { DashBoardSelect } from "../../src/components/dashboard/OwnedBusinessesSelect";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import moment from "moment";
import {
  getBusinessSettingsAndBusinessData,
  getBusinessStats,
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
import { getDateStringForStartOfMonth } from "../../src/services/utility";
import StoryMentionPreviewCard from "../../src/components/dashboard/StoryMentionPreviewCard";
import ArrowButton from "../../src/components/small/ArrowButton";
import Link from "next/link";

const Page = (props) => {
  const router = useRouter();

  const [ownedBusinessIDs, jwt, ownedBusinesses] = useSelector((store) => [
    store?.user?.businesses?.map((b) => b._id),
    store?.jwt,
    store?.ownedBusinesses,
  ]);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    initialFetchNeeded: true,
    timeFrameOptions: getTimeFrameOptions(),
    chosenTimeFrameID: getDateStringForStartOfMonth(),
    chosenBusinessID: ownedBusinessIDs?.[0] ? ownedBusinessIDs[0] : null,
    shallowBusiness: ownedBusinesses?.find((b) => b.slugname == props.slugname),

    /*
    ownedBusinessIDs?.[0]
      ? ownedBusinesses.filter((b) => b.id == ownedBusinessIDs?.[0])[0]
      : null,
      */
  });
  const [loading, setLoading] = useState(true);
  const [storyMentions, setStoryMentions] = useState([]);

  useEffect(() => {
    if (ownedBusinesses.length > 0) {
      // kunde hat mindestens ein business:
      if (state.initialFetchNeeded) mountFetching();
    } else {
      router.push("/login");
    }
  });

  async function mountFetching() {
    console.log("mountFetching");
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

    let chosenTimeFrameID = getDateStringForStartOfMonth();
    if (props.timeframe && !isNaN(new Date(props.timeframe).getFullYear())) {
      chosenTimeFrameID = moment(new Date(props.timeframe)).format(
        "YYYY-MM-DD"
      );
    }

    setState({
      ...state,
      initialFetchNeeded: false,
      chosenBusinessID: shallowBusinessData.id,
      chosenTimeFrameID,
    });

    await fetchStoryMentions(shallowBusinessData.id, chosenTimeFrameID);
    setLoading(false);
  }

  async function timeFrameValueChange(newValue) {
    console.log(newValue);
    let newTimeFrame = state.timeFrameOptions.find(
      (option) => option.id == newValue
    );

    console.log(newTimeFrame);

    if (newTimeFrame) {
      router.replace(
        `/dashboard/storymentions?s=${props.slugname}&t=${newValue}`,
        `/dashboard/storymentions?s=${props.slugname}&t=${newValue}`,
        { shallow: true }
      );

      setState({
        ...state,
        chosenTimeFrameID: newValue,
      });
      await fetchStoryMentions(state.chosenBusinessID, newValue);
    }
  }

  async function fetchStoryMentions(businessID, startDateString) {
    //console.log("startDateString", startDateString);
    setLoading(true);
    let startdate = startDateString;
    let enddate = new Date(startdate);
    enddate.setMonth(enddate.getMonth() + 1);
    enddate = moment(enddate).format("YYYY-MM-DD");
    let query = {
      limitstorymentions: 100000,
      startdate,
      enddate,
    };
    console.log("chosenBusinessID", businessID);
    console.log("query", query);
    let data = await getBusinessStats(businessID, query, jwt);

    let { storyMentions: storyMentionsFromAPI } = data;
    // await
    console.log("result", storyMentionsFromAPI);

    // fill up story mentions with null objects:
    let numbertofillup = 18 - storyMentionsFromAPI.length;
    for (let i = 0; i < numbertofillup; i++) {
      storyMentionsFromAPI.push(null);
    }
    setStoryMentions(storyMentionsFromAPI);
    setLoading(false);
  }

  return (
    <Layout>
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-0 mt-8 mb-12">
        <SimpleHeadingAndSubHeading
          //title={`Dashboard für ${state.shallowBusiness?.title}`}
          title={`Storymentions für ${state.shallowBusiness?.title}`}
          subtitle={`Gepostete Stories einsehen`}
        />

        <div className="md:flex my-8 w-full">
          <div className="md:w-1/2 w-full">
            <DashBoardSelect
              chosenOptionID={state.chosenTimeFrameID}
              onValueChange={timeFrameValueChange}
              options={state.timeFrameOptions}
              title="Zeitraum wählen:"
            ></DashBoardSelect>
          </div>
          <div className="md:w-1/2 w-full pt-6">
            <Link href={`/dashboard?s=${props.slugname}`}>
              <a>
                <ArrowButton>zurück zum Dashboard</ArrowButton>
              </a>
            </Link>
          </div>
        </div>
        <div className="px-3 flex flex-wrap w-full">
          {storyMentions.map((storyMention, i) => (
            <div className="w-1/3 md: w-1/6  my-2" key={i}>
              <StoryMentionPreviewCard
                storyMention={storyMention}
              ></StoryMentionPreviewCard>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

Page.getInitialProps = async function (context) {
  await handleAuth(context, "/login");

  if (!context.query.s) redirectTo(context, "/dashboard");

  return { slugname: context.query.s, timeframe: context.query.t };
};

export default Page;

function getTimeFrameOptions() {
  moment.locale("de");
  let options = [];
  let numberofOptions = 18;
  let startOfMonthDate = new Date(getDateStringForStartOfMonth());
  for (let i = 0; i < numberofOptions; i++) {
    let momentDate = moment(startOfMonthDate).subtract(i, "months");
    let timeframeStartString = momentDate.format("YYYY-MM") + "-01";
    let timeFrameTitle = momentDate.format("MMMM YYYY");
    options.push({ title: timeFrameTitle, id: timeframeStartString });
  }
  return options;
}

const nullarray = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
