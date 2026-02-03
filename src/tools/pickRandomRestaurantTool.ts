import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { pickRandomRestaurantInputSchema } from "../mcpSchemas.js";

export const pickRandomRestaurantTool = {
  name: "pick_random_restaurant",
  config: {
    title: "Pick a Random Restaurant from a list of model supplied restaurants.",
    description: "Opens a widget that shows a view of the restaurants being cycled through and then randomly stopping on one. The model must provide the list of restaurants. Use this tool when you want to help the user choose a restaurant from a list of options by picking one randomly with an interactive spinner.",
    inputSchema: pickRandomRestaurantInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/pickRandomRestaurant.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Picking a restaurant...",
      "openai/toolInvocation/invoked": "Restaurant picked.",
    },
    annotations: {
      readOnlyHint: true,
    },
  },
  handler: async (args: { restaurants: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ count: args.restaurants.length }, "Tool called: pick_random_restaurant");

    // Randomly pick up to 70 options for the spinner
    const shuffled = [...args.restaurants].sort(() => 0.5 - Math.random());
    const optionsToUse = shuffled.slice(0, 70).map(r => ({
      ...r,
      title: r.name // Ensure title is present for spinner compatibility
    }));

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing for them to interact. Do not provide any text response.",
        options: optionsToUse,
      }
    } as CallToolResult;
  }
};
