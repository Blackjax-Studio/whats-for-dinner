import {readFileSync} from "node:fs";
import ejs from "ejs";
import {join} from "node:path";
import {logger} from "../logger.ts";

const templatePath = join(process.cwd(), "views/pickRandomMeal.ejs");
const pickRandomMealTemplate = readFileSync(templatePath, "utf8");

export const pickRandomMealWidget = {
  name: "pick-random-meal-widget",
  uri: "ui://widget/pickRandomMeal.html",
  options: {},
  handler: async () => {
    logger.debug("Rendering pick-random-meal-widget");
    const renderedHtml = ejs.render(pickRandomMealTemplate, {});
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
