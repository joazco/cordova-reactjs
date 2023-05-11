const copyBrowserPlatformToPublicReact = require("./modules/copybrowserplatformtopublicreact");

copyBrowserPlatformToPublicReact().catch((error) => {
  console.log("Error after_start.js\n");
  throw new Error(error);
});
