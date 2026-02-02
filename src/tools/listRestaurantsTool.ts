import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { listRestaurantsInputSchema } from "../mcpSchemas.js";

export const listRestaurantsTool = {
  name: "list_restaurants",
  config: {
    title: "List Restaurants",
    description: "Displays a list of restaurants that serve a specific dish using the restaurants-widget.",
    inputSchema: listRestaurantsInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/restaurants.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoked": "Listing restaurants",
    },
  },
  handler: async (args: { dishName: string, restaurants: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ dishName: args.dishName, count: args.restaurants.length }, "Tool called: list_restaurants");

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing the restaurants. Do not provide any text response.",
        dishName: args.dishName,
        options: args.restaurants.map(r => ({
            ...r,
            title: r.name // Ensure title is present for frontend compatibility
        })),
      }
    } as CallToolResult;
  }
};
