import { roundDecimal } from "../../services/utility";

const StoryMentionsSummaryTable = ({ storyMentions }) => {
  // timeframes:
  let timeframes = [
    { title: "letzte 24 Stunden", hours: 24 },
    { title: "letzte 7 Tage", hours: 24 * 7 },
    { title: "letzte 30 Tage", hours: 24 * 30 },
    { title: "letzte 3 Monate", hours: 24 * 90 },
  ];

  for (let i = 0; i < timeframes.length; i++) {
    let timeFrameStartDate = new Date();
    timeFrameStartDate.setHours(
      timeFrameStartDate.getHours() - timeframes[i].hours
    );
    let storiyMentionsInTimeframe = storyMentions.filter(
      (story) => story.date > timeFrameStartDate
    );
    let summedUpFollowers = storiyMentionsInTimeframe.reduce(
      (acc, cur) => (cur.follower_count ? acc + cur.follower_count : acc),
      0
    );
    timeframes[i].storyCount = storiyMentionsInTimeframe.length;
    timeframes[i].storysPer24hr =
      timeframes[i].storyCount / (timeframes[i].hours / 24);
    timeframes[i].summedUpFollowers = summedUpFollowers;
  }
  return (
    <div className="p-2 my-6">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Zeitraum</th>
            <th className="px-4 py-2 text-lef">Gepostete Storys</th>
            <th className="px-4 py-2 text-lef">Storys pro Tag</th>
            <th className="px-4 py-2 text-lef">aufsummierte max. Reichweite</th>
          </tr>
        </thead>
        <tbody>
          {timeframes.map((timeframe, i) => {
            return (
              <tr
                key={(timeframe, i)}
                className={i % 2 == 0 ? "bg-gray-100" : ""}
              >
                <td className="border px-4 py-2 w-1/3">{timeframe.title}</td>
                <td className="border px-4 py-2">{timeframe.storyCount}</td>
                <td className="border px-4 py-2">
                  {roundDecimal(timeframe.storysPer24hr)}
                </td>
                <td className="border px-4 py-2">
                  {timeframe.summedUpFollowers}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StoryMentionsSummaryTable;
