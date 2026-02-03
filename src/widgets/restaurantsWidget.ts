import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-restaurants.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read restaurants widget bundle. Make sure it is built.");
}

export const restaurantsWidget = {
  name: "restaurants-widget",
  uri: "ui://widget/restaurants.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering restaurants-widget");
    
    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurants</title>
    <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Vend+Sans:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script type="module">
        ${widgetBundle}
    </script>
</body>
</html>
    `.trim();

    logger.info("Widget restaurants-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/restaurants.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays the restaurant list and details.",
          },
        },
      ],
    };
  }
};
