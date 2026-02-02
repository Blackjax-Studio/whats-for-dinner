import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { listRestaurantsInputSchema } from "../mcpSchemas.js";

export const showRestaurantsWidgetTool = {
  name: "show_restaurants_widget",
  config: {
    title: "Show Restaurants Widget",
    description: "ONLY used to show the restaurants widget with the specified restaurants. This tool does NOT retrieve any data itself; the model must provide the restaurant data to it. Use this tool when you want to display a list of restaurants to the user in an interactive widget.",
    inputSchema: listRestaurantsInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/restaurants.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoked": "Listing restaurants",
    },
  },
  handler: async (args: { dishName: string, restaurants: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ dishName: args.dishName, count: args.restaurants.length }, "Tool called: show_restaurants_widget");

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
