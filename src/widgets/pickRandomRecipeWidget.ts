import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.js";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-pick-random-recipe.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read pick random recipe widget bundle. Make sure it is built.");
}

export const pickRandomRecipeWidget = {
  name: "pick-random-recipe-widget",
  uri: "ui://widget/pickRandomRecipe.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering pick-random-recipe-widget");

    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pick Random Recipe</title>
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

    logger.info("Widget pick-random-recipe-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/pickRandomRecipe.html",
          mimeType: "text/html",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays a random recipe picker spinner and the chosen recipe details.",
          },
        },
      ],
    };
  }
};
