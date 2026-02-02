import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { formatRecipesInputSchema } from "../mcpSchemas.js";

export const formatRecipesTool = {
  name: "format_recipes",
  config: {
    title: "Format a list of recipes or restaurants",
    description: "Formats a list of recipes or restaurants provided by the model. The model must first generate this list (including just the title and description for each item) based on the tool input, its knowledge, and the conversation context. The generated list must be passed to the 'options' field in the format [{title: '...', description: '...'}]. Once the list is generated, use this tool to format it for display in the widget.",
    inputSchema: formatRecipesInputSchema,
    _meta: {
      "openai/toolInvocation/invoked": "Formatting recipes",
      "openai/widgetAccessible": true,
    },
  },
  handler: async (args: { type: string, dish_details?: string, restaurant_details?: string, options: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ args }, "Tool called: format_recipes");

    // Simulate 2 second processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const responseOptions = args.options && args.options.length > 0 ? args.options : [
      { title: "Generic Recipe/Restaurant", description: "Information based on " + (args.dish_details || "your choice") }
    ];

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "The options have been formatted. Do not provide any text response.",
        options: responseOptions,
      }
    } as CallToolResult;
  }
};
