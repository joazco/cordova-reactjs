const path = require("path");
const { exec } = require("child_process");

function execBuildResources() {
  return new Promise((resolve, reject) => {
    const cordovaResPath = path.resolve(
      process.cwd(),
      "./node_modules/cordova-res/bin/cordova-res"
    );
    exec(`node ${cordovaResPath}`, (error) => {
      if (error) {
        reject(`File hooks/modules/buildresources.js line 5.
        \nError to generate resources with cordova-res.
        \nError: ${error}`);
        return;
      }
      resolve();
    });
  });
}

module.exports = execBuildResources;
