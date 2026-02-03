import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {pickRandomMealTool} from "./tools/pickRandomMealTool.js";
import {pickRandomRecipeTool} from "./tools/pickRandomRecipeTool.ts";
import {showRecipesWidgetTool} from "./tools/showRecipesWidgetTool.ts";
import {showRestaurantsWidgetTool} from "./tools/showRestaurantsWidgetTool.ts";
import {showGoogleMapsLinkTool} from "./tools/showGoogleMapsLinkTool.ts";
import {pickRandomRestaurantTool} from "./tools/pickRandomRestaurantTool.ts";
import {aboutAppTool} from "./tools/aboutAppTool.ts";
import {pickRandomMealWidget} from "./widgets/pickRandomMealWidget.js";
import {pickRandomRecipeWidget} from "./widgets/pickRandomRecipeWidget.ts";
import {recipesWidget} from "./widgets/recipesWidget.js";
import {restaurantsWidget} from "./widgets/restaurantsWidget.js";
import {googleMapsLinkWidget} from "./widgets/googleMapsLinkWidget.ts";
import {pickRandomRestaurantWidget} from "./widgets/pickRandomRestaurantWidget.js";
import {aboutAppWidget} from "./widgets/aboutAppWidget.ts";

export function createWhatsForDinnerServer() {
  const server = new McpServer({ name: "whats-for-dinner", version: "1.0.0" });

  server.registerResource(
    pickRandomMealWidget.name,
    pickRandomMealWidget.uri,
    pickRandomMealWidget.options,
    pickRandomMealWidget.handler
  );

  server.registerResource(
    pickRandomRecipeWidget.name,
    pickRandomRecipeWidget.uri,
    pickRandomRecipeWidget.options,
    pickRandomRecipeWidget.handler
  );

  server.registerResource(
    recipesWidget.name,
    recipesWidget.uri,
    recipesWidget.options,
    recipesWidget.handler
  );

  server.registerResource(
    restaurantsWidget.name,
    restaurantsWidget.uri,
    restaurantsWidget.options,
    restaurantsWidget.handler
  );

  server.registerResource(
    googleMapsLinkWidget.name,
    googleMapsLinkWidget.uri,
    googleMapsLinkWidget.options,
    googleMapsLinkWidget.handler
  );

  server.registerResource(
    pickRandomRestaurantWidget.name,
    pickRandomRestaurantWidget.uri,
    pickRandomRestaurantWidget.options,
    pickRandomRestaurantWidget.handler
  );

  server.registerResource(
    aboutAppWidget.name,
    aboutAppWidget.uri,
    aboutAppWidget.options,
    aboutAppWidget.handler
  );

  server.registerTool(
    pickRandomMealTool.name,
    pickRandomMealTool.config,
    (args: any, extra: any) => pickRandomMealTool.handler(args, extra)
  );

  server.registerTool(
    pickRandomRecipeTool.name,
    pickRandomRecipeTool.config,
    (args: any, extra: any) => pickRandomRecipeTool.handler(args, extra)
  );

  server.registerTool(
    showRecipesWidgetTool.name,
    showRecipesWidgetTool.config,
    (args: any, extra: any) => showRecipesWidgetTool.handler(args, extra)
  );

  server.registerTool(
    showRestaurantsWidgetTool.name,
    showRestaurantsWidgetTool.config,
    (args: any, extra: any) => showRestaurantsWidgetTool.handler(args, extra)
  );

  server.registerTool(
    showGoogleMapsLinkTool.name,
    showGoogleMapsLinkTool.config,
    (args: any, extra: any) => showGoogleMapsLinkTool.handler(args, extra)
  );

  server.registerTool(
    pickRandomRestaurantTool.name,
    pickRandomRestaurantTool.config,
    (args: any, extra: any) => pickRandomRestaurantTool.handler(args, extra)
  );

  server.registerTool(
    aboutAppTool.name,
    aboutAppTool.config,
    (args: any, extra: any) => aboutAppTool.handler(args, extra)
  );

  return server;
}
