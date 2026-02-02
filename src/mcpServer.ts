import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {pickRandomMealTool} from "./tools/pickRandomMealTool.js";
import {listRecipesTool} from "./tools/listRecipesTool.js";
import {listRestaurantsTool} from "./tools/listRestaurantsTool.js";
import {pickRandomMealWidget} from "./widgets/pickRandomMealWidget.js";
import {recipesWidget} from "./widgets/recipesWidget.js";
import {restaurantsWidget} from "./widgets/restaurantsWidget.js";

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

  server.registerTool(
    pickRandomMealTool.name,
    pickRandomMealTool.config,
    (args: any, extra: any) => pickRandomMealTool.handler(args, extra)
  );

  server.registerTool(
    listRecipesTool.name,
    listRecipesTool.config,
    (args: any, extra: any) => listRecipesTool.handler(args, extra)
  );
  
  server.registerTool(
    listRestaurantsTool.name,
    listRestaurantsTool.config,
    (args: any, extra: any) => listRestaurantsTool.handler(args, extra)
  );

  return server;
}
