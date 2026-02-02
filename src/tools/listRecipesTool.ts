import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { listRecipesInputSchema } from "../mcpSchemas.js";

export const listRecipesTool = {
  name: "list_recipes",
  config: {
    title: "List recipes for a specific dish.",
    description: "Displays a list of recipes for a given dish name. Each recipe includes a title and a brief description. This tool opens the recipes widget.",
    inputSchema: listRecipesInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/recipes.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoked": "Listing recipes",
    },
  },
  handler: async (args: { dishName: string, recipes: { title: string, description: string }[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ dishName: args.dishName, count: args.recipes.length }, "Tool called: list_recipes");

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "The recipes are being displayed in a widget. Do not provide a text list of recipes unless asked.",
        dishName: args.dishName,
        options: args.recipes,
      }
    } as CallToolResult;
  }
};
