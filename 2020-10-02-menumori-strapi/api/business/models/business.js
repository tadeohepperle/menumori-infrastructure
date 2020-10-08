"use strict";
const menumoriServicesNotifier = require("./../../../menumori-services-connection/menumori-services-notifier");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterUpdate(result, params, data) {
      menumoriServicesNotifier.businessChanged(result.id, "UPDATE", {
        result,
        params,
        data,
      });
    },
    async afterCreate(result, data) {
      menumoriServicesNotifier.businessChanged(result.id, "CREATE", {
        result,
        data,
      });
    },
    async afterDelete(result, params) {
      menumoriServicesNotifier.businessChanged(result.id, "DELETE", {
        result,
        params,
      });
    },
  },
};
