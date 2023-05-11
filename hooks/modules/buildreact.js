const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const rimraf = require("rimraf");
const execCopyConfig = require("./copyconfig");

function renameOutputFolder(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    fs.rename(buildFolderPath, outputFolderPath, (error) => {
      if (error) {
        reject(`File hooks/modules/buildreact.js line 30.
        \nError to rename folder build.
        \nError: ${error}`);
      } else {
        resolve("ReactJS successfully built!");
      }
    });
  });
}

function execPostReactBuild(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(buildFolderPath)) {
      if (fs.existsSync(outputFolderPath)) {
        rimraf(outputFolderPath, (error) => {
          if (error) {
            reject(`File hooks/modules/buildreact.js line 19.
            \nError to remove folder build.
            \nError: ${error}`);
            return;
          }
          renameOutputFolder(buildFolderPath, outputFolderPath)
            .then((val) => resolve(val))
            .catch((error) => reject(error));
        });
      } else {
        renameOutputFolder(buildFolderPath, outputFolderPath)
          .then((val) => resolve(val))
          .catch((e) => reject(e));
      }
    } else {
      reject(new Error("build folder does not exist"));
    }
  });
}

const execBuildReact = () => {
  execCopyConfig();
  const projectPath = path.resolve(
    process.cwd(),
    "./node_modules/.bin/react-scripts"
  );

  return new Promise((resolve, reject) => {
    exec(`${projectPath} build`, (error) => {
      if (error) {
        reject(
          `File hooks/modules/buildreact.js line 43.
          \nError to build reactjs.
          \nError: ${error}`
        );
        return;
      }
      execPostReactBuild(
        path.resolve(__dirname, "../../build/"),
        path.join(__dirname, "../../www/")
      )
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

module.exports = execBuildReact;
