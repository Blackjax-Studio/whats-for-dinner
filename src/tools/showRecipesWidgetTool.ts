import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { showRecipesInputSchema } from "../mcpSchemas.js";

export const showRecipesWidgetTool = {
  name: "show_recipes_widget",
  config: {
    title: "Show Recipes Widget",
    description: "ONLY used to show the recipes widget with the specified recipes. This tool does NOT retrieve any data itself; the model must provide the recipe data to it. Use this tool when you want to display a list of recipes to the user in an interactive widget.",
    inputSchema: showRecipesInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/recipes.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoked": "Listing recipes",
    },
  },
  handler: async (args: { dishName: string, recipes: { title: string, description: string }[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ dishName: args.dishName, count: args.recipes.length }, "Tool called: show_recipes_widget");

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
