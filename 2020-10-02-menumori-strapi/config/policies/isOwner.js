"use strict";

const { default: createStrapi } = require("strapi");

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  // Always let pass except if user is of Role Owner
  let requestUser = ctx.state.user;
  try {
    if (!(requestUser.role.name === "Owner")) {
      // User has any other role:
      await next();
    } else {
      // User has Role Owner:
      let route = ctx.request.url.split("/")[1];
      if (!route) throw Error(`could not get route of request.`);
      let mappingRouteToModel = {
        businesses: "business",
        "business-data": "business-data",
        "business-settings": "business-settings",
      };
      let model = mappingRouteToModel[route];
      if (!model) throw Error(`no model found for route ${route}`);
      let requestedID = ctx.params.id;
      if (!requestedID) throw Error(`no ctx.params.id given.`);

      // find business for the request:
      let business = null;

      let businessID = requestedID;
      if (model != "business") {
        // "business-data" or "business-settings": get record first, then look at business property of record
        let record = await strapi.query(model).findOne({ id: businessID });
        businessID = record.business.id;
      }
      business = await strapi.query("business").findOne({ id: businessID }); // returns object | null
      if (!business)
        throw Error(`no business found for businessId ${businessID}`);
      // Business found, now we can compare if the request sender is an owner of the business:
      // try to find requestUser in users array of business:
      let userIsOwnerOfBusiness = false;
      for (let i = 0; i < business.users.length; i++) {
        if (business.users[i].id == requestUser.id) {
          userIsOwnerOfBusiness = true;
          break;
        }
      }
      console.log(business);

      // block unauthorized users to get data about businesses they do not manage
      if (userIsOwnerOfBusiness) {
        await next();
      } else {
        return ctx.unauthorized(`You are not authorized...`);
      }
    }
  } catch (ex) {
    console.log(ex);
    return ctx.unauthorized(
      `An Error Occured handling your request. You probobly do not have permission.`
    );
  }
};
