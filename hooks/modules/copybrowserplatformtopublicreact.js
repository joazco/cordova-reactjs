const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const pathToPlatform = path.resolve(__dirname, "../../platforms/browser");
const pathToPublic = path.resolve(__dirname, "../../public");

const copyFiles = () => {
  try {
    fs.copyFileSync(
      path.resolve(pathToPlatform, "./www/cordova.js"),
      path.resolve(pathToPublic, "./cordova.js")
    );
    fs.copyFileSync(
      path.resolve(pathToPlatform, "./www/cordova_plugins.js"),
      path.resolve(pathToPublic, "./cordova_plugins.js")
    );
    fs.cpSync(
      path.resolve(pathToPlatform, "./www/plugins"),
      path.resolve(pathToPublic, "./plugins"),
      {
        recursive: true,
      }
    );
  } catch (error) {
    throw new Error(`File hooks/modules/copybrowserplatformtopublicreact.js line 8.
    \nError to copy files platform browser to react public.
    \nError: ${error}`);
  }
};

const execCopy = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pathToPlatform)) {
      exec("cordova prepare browser", (error) => {
        if (error) {
          reject(`File hooks/modules/copybrowserplatformtopublicreact.js line 32.
          \nError to prepare cordova browser platform.
          \nError: ${error}`);
          return;
        }
        try {
          copyFiles();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    } else {
      exec("cordova platform add browser", (error) => {
        if (error) {
          reject(`File hooks/modules/copybrowserplatformtopublicreact.js line 32.
          \nError to add cordova browser platform.
          \nError: ${error}`);
        }
        execCopy().then(resolve).catch(reject);
      });
    }
  });
};

module.exports = execCopy;
