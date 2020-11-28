import Router from "next/router";
import { useEffect } from "react";
import { redirectTo } from "../../src/services/AuthService";
import {
  getInstagramURL,
  getURLOfRatingPage,
} from "../../src/services/DataService";

const Page = ({ slugname, locationToPushTo }) => {
  useEffect(() => {
    // just in case we didnt catch it in the getInitialProps
    if (locationToPushTo) Router.push(locationToPushTo);
  });

  return (
    <div>
      {
        slugname
        // _______________TODO Error occured: display instrcutions fopr user and 404
      }
    </div>
  );
};

Page.getInitialProps = async function (context) {
  let { slugname } = context.query;
  let instagramURL = await getInstagramURL(slugname);
  let locationToPushTo = slugname && instagramURL ? instagramURL : "/";
  // if link, redirect to instagram page of business:
  if (locationToPushTo) await redirectTo(context, locationToPushTo);

  // if no link was found display this page, which is an error page by itself.
  // it is never shown, except for when something goes wrong
  return { slugname, locationToPushTo };
};

export default Page;
