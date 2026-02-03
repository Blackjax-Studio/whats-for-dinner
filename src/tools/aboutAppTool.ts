import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { aboutAppInputSchema } from "../mcpSchemas.js";

export const aboutAppTool = {
  name: "about_the_app",
  config: {
    title: "About What's for Dinner App",
    description: "Returns information about the What's for Dinner application, its purpose, and open source information. Use ONLY when the user asks specifically about this application, its features, or its development.",
    inputSchema: aboutAppInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/aboutApp.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Loading app information...",
      "openai/toolInvocation/invoked": "App information loaded.",
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: async (args: any, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info("Tool called: about_the_app");

    const appInfo = {
      name: "What's for Dinner",
      description: "An interactive tool to help you decide what to eat by spinning for random meals, recipes, or restaurants.",
      features: [
        "Random meal selection from built-in or model-provided options",
        "Interactive spinner for picking random restaurants",
        "Interactive spinner for picking random recipes",
        "Direct links to Google Maps for restaurants",
        "Recipe generation and detailed views"
      ],
      openSource: {
        license: "MIT",
        repository: "https://github.com/Blackjax-Studio/whats-for-dinner",
        builtWith: ["Model Context Protocol (MCP)", "React", "TypeScript", "Node.js"]
      },
      mission: "Stop spinning about what to eat. We'll spin for you!"
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(appInfo, null, 2)
        }
      ],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing app information. Use the provided JSON to answer any specific questions the user has about the app.",
        appInfo
      }
    } as CallToolResult;
  }
};
