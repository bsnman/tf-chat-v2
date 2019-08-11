import utils from "../utils";

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$utils = utils;
};
