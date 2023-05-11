const execCopyConfig = require("./modules/copyconfig");

execCopyConfig().catch((error) => {
  console.log("Error before_start.js\n");
  throw new Error(error);
});
