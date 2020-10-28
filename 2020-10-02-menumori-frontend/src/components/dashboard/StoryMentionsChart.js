const { Line } = require("react-chartjs-2");

import moment from "moment";

const StoryMentionsChart = ({ storyMentions }) => {
  let xAxis = [];
  let yAxis = [];
  let aggregationObject = {};
  storyMentions.forEach((mention) => {
    let dateString = moment(mention.date).format("YYYY-MM-DD"); // only "2020-10-17"
    // angrenzende felder auf null setzen:

    // day before
    let datePrevDay = new Date(dateString);
    datePrevDay.setDate(datePrevDay.getDate() - 1);
    let datePrevDayString = moment(datePrevDay).format("YYYY-MM-DD");
    if (!aggregationObject[datePrevDayString])
      aggregationObject[datePrevDayString] = 0;

    // eigentlicher Tag:
    if (aggregationObject[dateString]) aggregationObject[dateString]++;
    else aggregationObject[dateString] = 1;

    // day after:
    let dateNextDay = new Date(dateString);
    dateNextDay.setDate(dateNextDay.getDate() + 1);
    let dateNextDayString = moment(dateNextDay).format("YYYY-MM-DD");
    if (!aggregationObject[dateNextDayString])
      aggregationObject[dateNextDayString] = 0;
  });

  // add date Right now if not added yet:
  let dateTodayString = moment(new Date()).format("YYYY-MM-DD");
  if (!aggregationObject[dateTodayString])
    aggregationObject[dateTodayString] = 0;

  Object.keys(aggregationObject)
    .sort()
    .forEach((key) => {
      xAxis.push(new Date(key));
      yAxis.push(aggregationObject[key]);
    });

  //console.log("xachese: ", xAxis);

  return (
    <div>
      <Line
        data={{
          // Labels should be Date objects
          labels: xAxis,
          datasets: [
            {
              fill: false,
              label: "Anzahl gepostete Stories",
              data: yAxis,
              borderColor: "rgb(56, 178, 172)",
              backgroundColor: "rgb(56, 178, 172)",
              lineTension: 0,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          fill: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                display: true,
                scaleLabel: {
                  display: false, // true
                  labelString: "Date",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Gepostete Stories",
                },
              },
            ],
          },
        }}
      ></Line>
    </div>
  );
};

export default StoryMentionsChart;
