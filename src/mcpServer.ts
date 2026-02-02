import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {pickRandomMealTool} from "./tools/pickRandomMealTool.js";
import {pickRandomMealWidget} from "./widgets/pickRandomMealWidget.js";

export function createWhatsForDinnerServer() {
  const server = new McpServer({ name: "whats-for-dinner", version: "0.1.0" });

  server.registerResource(
    pickRandomMealWidget.name,
    pickRandomMealWidget.uri,
    pickRandomMealWidget.options,
    pickRandomMealWidget.handler
  );

  server.registerTool(
    pickRandomMealTool.name,
    pickRandomMealTool.config,
    (args: any, extra: any) => pickRandomMealTool.handler(args, extra)
  );

  return server;
}
