const DotEnv = require("dotenv-flow");

const parsedEnv = DotEnv.config().parsed;

console.log("ENVIRONMENT == ", parsedEnv);

module.exports = function() {
  // Let's stringify our variables
  for (const key in parsedEnv) {
    if (typeof parsedEnv[key] === "string") {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }

  console.log("ENVIRONMENT == ", parsedEnv);
  return parsedEnv;
};
