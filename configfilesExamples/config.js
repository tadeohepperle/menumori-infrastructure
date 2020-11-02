// DEFINE ALL THE CONNECTION VARIABLES:
export const IAPIURL = "http://localhost:1337"; // internal API URL = Strapi url, connects directly to the database, all routes are at least jwt protected even for get requests.
export const PAPIURL = "http://localhost:1338"; // public API URL = menumori-bot-api / indexpapi, routes can be accessed by anywhere
