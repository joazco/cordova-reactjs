const execEditConfig = require("./modules/editconfig");

module.exports = () => {
  return execEditConfig().catch((error) => {
    console.log("Error before_platform_add.js\n");
    return Promise.reject(error);
  });
};
