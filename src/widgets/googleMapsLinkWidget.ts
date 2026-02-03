import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-google-maps-link.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read google maps link widget bundle. Make sure it is built.");
}

export const googleMapsLinkWidget = {
  name: "google-maps-link-widget",
  uri: "ui://widget/google-maps-link.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering google-maps-link-widget");

    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Maps Link Button</title>
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

    logger.info("Widget google-maps-link-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/google-maps-link.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays a button that links to Google Maps for a restaurant.",
          },
        },
      ],
    };
  }
};
