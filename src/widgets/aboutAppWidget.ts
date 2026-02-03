import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.js";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-about-app.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read about app widget bundle. Make sure it is built.");
}

export const aboutAppWidget = {
  name: "about-app-widget",
  uri: "ui://widget/aboutApp.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering about-app-widget");

    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About What's for Dinner</title>
    <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Red+Hat+Display:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script type="module">
        ${widgetBundle}
    </script>
</body>
</html>
    `.trim();

    logger.info("Widget about-app-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/aboutApp.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays information about the What's for Dinner app, including open source details.",
          },
        },
      ],
    };
  }
};
