import {readFileSync} from "node:fs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const widgetBundlePath = join(process.cwd(), "web/dist/widget-recipes.js");
let widgetBundle = "";
try {
  widgetBundle = readFileSync(widgetBundlePath, "utf8");
} catch (e) {
  logger.error("Failed to read recipes widget bundle. Make sure it is built.");
}

export const recipesWidget = {
  name: "recipes-widget",
  uri: "ui://widget/recipes.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering recipes-widget");
    
    const renderedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipes</title>
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

    logger.info("Widget recipes-widget rendered");
    return {
      contents: [
        {
          uri: "ui://widget/recipes.html",
          mimeType: "text/html+skybridge",
          text: renderedHtml,
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Displays the recipe list and details.",
            "openai/widgetDomain": "https://whatsfordinnermcp.com",
            "openai/widgetCSP": {
              connect_domains: ["https://whatsfordinnermcp.com"],
              resource_domains: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            },
          },
        },
      ],
    };
  }
};
