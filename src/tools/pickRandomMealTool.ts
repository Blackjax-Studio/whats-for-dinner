import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import mealOptions from "../meal-options.json" with { type: "json" };
import {pickRandomMealInputSchema} from "../mcpSchemas.js";

export const pickRandomMealTool = {
  name: "pick_random_meal",
  config: {
    title: "Pick a Random Meal Option from a list of app supplied options or a list of model supplied options of meals and/or restaurants.",
    description: "Opens a widget that shows a view of the options being cycled through and then randomly stopping on one. The list of options depends on if the model sent in options or not. If not, the tool will use the tool's built-in meal options. If the model did provide options, it will use those options. Please follow the input schema.",
    inputSchema: pickRandomMealInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/pickRandomMeal.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Picking a meal option...",
      "openai/toolInvocation/invoked": "Meal option picked.",
    },
    annotations: {
      readOnlyHint: true,
    },
  },
  handler: async (args: { providedOptions?: boolean, options?: any[] }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ providedOptions: args.providedOptions }, "Tool called: pick_random_meal");
    requestLogger.debug({ args }, "pick_random_meal arguments");

    let initialOptions: any[];

    if (args.providedOptions && args.options && args.options.length > 0) {
      requestLogger.debug({ count: args.options.length }, "Using provided meal options");
      // Use provided options
      initialOptions = args.options.map(opt => ({
        ...opt,
        name: opt.title // Ensure name is present for backward compatibility in EJS
      }));
    } else {
      requestLogger.debug({ count: mealOptions.length }, "Using built-in meal options");
      // Use all options from mealOptions
      initialOptions = mealOptions.map(opt => ({
        ...opt,
        type: 'dish' // mealOptions are all dishes
      }));
    }

    // Randomly pick up to 50 options if using built-in ones
    const limit = args.providedOptions ? 70 : 50;
    const shuffled = [...initialOptions].sort(() => 0.5 - Math.random());
    const optionsToUse = shuffled.slice(0, limit);

    requestLogger.info({ selectedCount: optionsToUse.length }, "Random meal options selected");

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing for them to interact. Do not provide any text response.",
        options: optionsToUse,
      }
    } as CallToolResult;
  }
};
