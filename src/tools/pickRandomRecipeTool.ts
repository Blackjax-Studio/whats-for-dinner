import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { pickRandomRecipeInputSchema } from "../mcpSchemas.js";

export const pickRandomRecipeTool = {
  name: "pick_random_recipe",
  config: {
    title: "Pick a Random Recipe from a list of model supplied recipes.",
    description: "Opens a widget that shows a view of the recipes being cycled through and then randomly stopping on one. The model must provide a list of at least 10 recipes. Use this tool ONLY when you want to help the user choose a recipe from a list of options by picking one randomly with an interactive spinner.",
    inputSchema: pickRandomRecipeInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/pickRandomRecipe.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Preparing spinner...",
      "openai/toolInvocation/invoked": "Spinner ready!",
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: async (args: { recipes: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ count: args.recipes.length }, "Tool called: pick_random_recipe");

    // Randomly pick up to 70 options for the spinner
    const shuffled = [...args.recipes].sort(() => 0.5 - Math.random());
    const optionsToUse = shuffled.slice(0, 70).map(r => ({
      ...r,
      name: r.title // Ensure name is present for compatibility with some internal expectations if any
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
