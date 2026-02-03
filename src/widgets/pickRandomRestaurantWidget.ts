import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-pick-random-restaurant.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read pick random restaurant widget bundle. Make sure it is built.");
}

export const pickRandomRestaurantWidget = {
  name: "pick-random-restaurant-widget",
  uri: "ui://widget/pickRandomRestaurant.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering pick-random-restaurant-widget");

    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pick Random Restaurant</title>
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

    logger.info("Widget pick-random-restaurant-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/pickRandomRestaurant.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays a random restaurant picker spinner and the chosen restaurant details.",
          },
        },
      ],
    };
  }
};
