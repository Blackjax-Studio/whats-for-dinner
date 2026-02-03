import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { showMapWidgetInputSchema } from "../mcpSchemas.js";

export const showMapWidgetTool = {
  name: "show_map_widget",
  config: {
    title: "Show Map Widget",
    description: "Used to show a map for a restaurant given its address and zip code.",
    inputSchema: showMapWidgetInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/map.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoked": "Showing map",
    },
  },
  handler: async (args: { address: string, zipCode: string }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ address: args.address, zipCode: args.zipCode }, "Tool called: show_map_widget");

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing the map. Do not provide any text response.",
        address: args.address,
        zipCode: args.zipCode,
      }
    } as CallToolResult;
  }
};
