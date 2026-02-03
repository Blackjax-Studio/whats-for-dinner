import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {pickRandomMealTool} from "./tools/pickRandomMealTool.js";
import {showRecipesWidgetTool} from "./tools/showRecipesWidgetTool.ts";
import {showRestaurantsWidgetTool} from "./tools/showRestaurantsWidgetTool.ts";
import {showGoogleMapsLinkTool} from "./tools/showGoogleMapsLinkTool.ts";
import {pickRandomMealWidget} from "./widgets/pickRandomMealWidget.js";
import {recipesWidget} from "./widgets/recipesWidget.js";
import {restaurantsWidget} from "./widgets/restaurantsWidget.js";
import {googleMapsLinkWidget} from "./widgets/googleMapsLinkWidget.ts";

export function createWhatsForDinnerServer() {
  const server = new McpServer({ name: "whats-for-dinner", version: "0.1.0" });

  server.registerResource(
    pickRandomMealWidget.name,
    pickRandomMealWidget.uri,
    pickRandomMealWidget.options,
    pickRandomMealWidget.handler
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

  server.registerTool(
    pickRandomMealTool.name,
    pickRandomMealTool.config,
    (args: any, extra: any) => pickRandomMealTool.handler(args, extra)
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

  return server;
}
