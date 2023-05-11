// Cordova hook
const execBuildResources = require("./modules/buildresources");

module.exports = () => {
  return execBuildResources().catch((error) => {
    console.log("Error after_prepare.js\n");
    return Promise.reject(error);
  });
};
