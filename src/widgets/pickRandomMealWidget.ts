import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget.js");
const widgetBundle = readFileSync(widgetBundlePath, "utf8");

export const pickRandomMealWidget = {
  name: "pick-random-meal-widget",
  uri: "ui://widget/pickRandomMeal.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering pick-random-meal-widget");
    
    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pick Random Meal</title>
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

    logger.info("Widget pick-random-meal-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/pickRandomMeal.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays the chosen meal option.",
          },
        },
      ],
    };
  }
};
