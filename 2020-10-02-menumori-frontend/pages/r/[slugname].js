import Router from "next/router";
import { useEffect } from "react";
import { getRatingURL } from "../../src/services/DataService";

const Page = ({ slugname, locationToPushTo }) => {
  useEffect(() => {
    // just in case we didnt catch it in the getInitialProps
    if (locationToPushTo) Router.push(locationToPushTo);
  });

  return (
    <div>
      {
        slugname
        // _______________ Error occured: display instrcutions fopr user and 404
      }
    </div>
  );
};

Page.getInitialProps = async function (context) {
  let { slugname } = context.query;
  console.log("salugname: ", slugname);

  let googleRatingLink = await getRatingURL(slugname);
  let locationToPushTo = slugname && googleRatingLink ? googleRatingLink : "/";
  console.log(locationToPushTo);

  // if link, redirect to google/tripadvisorratingpage:
  if (locationToPushTo) {
    // if serverside:
    if (context.res) {
      context.res.writeHead(302, {
        Location: locationToPushTo,
      });
      context.res.end();
    }
    // if clientside:
    else Router.push(locationToPushTo);
  }
  // if no link was found display this page, which is an error page by itself.
  // it is never shown, except for when something goes wrong
  return { slugname, locationToPushTo };
};

export default Page;
