import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBusinessStats } from "../../services/DataService";
import ArrowButton from "../small/ArrowButton";
import StoryMentionPreviewCard from "./StoryMentionPreviewCard";
import StoryMentionsChart from "./StoryMentionsChart";
import StoryMentionsSummaryTable from "./StoryMentionsSummaryTable";

const StoryMentionsDisplay = ({ businessID, slugname }) => {
  let jwt = useSelector((state) => state.jwt);
  const router = useRouter();

  const [storyMentions, setStoryMentions] = useState([]);
  const [needsToFetchData, setNeedsToFetchData] = useState(true);

  useEffect(() => {
    // fetch business stats from PAPI:
    if (needsToFetchData) mountFetching();
  });

  async function mountFetching() {
    setNeedsToFetchData(false);

    // define query:
    let startdate = new Date();
    startdate.setMonth(startdate.getMonth() - 3); // _______________ Set back to 1 Month
    let startDateString = moment(startdate).format("YYYY-MM-DD");
    let query = {
      limitstorymentions: 10000,
      startdate: startDateString,
    };
    let data = await getBusinessStats(businessID, query, jwt);
    console.log(data);
    let storyMentionsFromAPI = data.storyMentions.map((el) => ({
      ...el,
      date: new Date(el.date),
    }));
    setStoryMentions(storyMentionsFromAPI);
  }

  return (
    <div>
      <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pt-8 text-xl  mb-6">
        Statistik zu von Kunden geposteten Storys:
      </h2>
      <StoryMentionsChart storyMentions={storyMentions}></StoryMentionsChart>
      <StoryMentionsSummaryTable
        storyMentions={storyMentions}
      ></StoryMentionsSummaryTable>

      <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pt-8 text-xl mb-6">
        Letzte Verlinkungen:
      </h2>
      <div className="flex flex-wrap mb-6">
        {[0, 0, 0, 1, 1, 1].map((el, i) => {
          return (
            <div
              key={i}
              className={`flex-grow md:w-1/6 w-1/3 ${
                el ? "invisible md:visible" : ""
              }`}
            >
              <StoryMentionPreviewCard
                storyMention={storyMentions[i]}
              ></StoryMentionPreviewCard>
            </div>
          );
        })}
      </div>

      <Link href={`/dashboard/storymentions?s=${slugname}`}>
        <a>
          <ArrowButton title="Weitere Posts sehen"></ArrowButton>
        </a>
      </Link>
    </div>
  );
};

export default StoryMentionsDisplay;

/*

{JSON.stringify(storyMentions)}

*/
