import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-map.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read map widget bundle. Make sure it is built.");
}

export const mapWidget = {
  name: "map-widget",
  uri: "ui://widget/map.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering map-widget");
    
    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant Map</title>
</head>
<body style="margin: 0; padding: 0; overflow: hidden;">
    <div id="root"></div>
    <script type="module">
        ${widgetBundle}
    </script>
</body>
</html>
    `.trim();

    logger.info("Widget map-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/map.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays a map for a restaurant.",
          },
        },
      ],
    };
  }
};
