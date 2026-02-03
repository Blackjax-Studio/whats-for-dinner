import { logger } from "../logger.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { showGoogleMapsLinkInputSchema } from "../mcpSchemas.js";

export const showGoogleMapsLinkTool = {
  name: "show_google_maps_link",
  config: {
    title: "Show Google Maps Link Button",
    description: "Used to show a button that links to Google Maps for a restaurant given its address and zip code.",
    inputSchema: showGoogleMapsLinkInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/google-maps-link.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Preparing Google Maps link...",
      "openai/toolInvocation/invoked": "Link ready.",
    },
    annotations: {
      readOnlyHint: true,
    },
  },
  handler: async (args: { poiName?: string, address?: string, zipCode: string }, extra: any): Promise<CallToolResult> => {
    const requestLogger = extra?.request?.logger || logger;
    requestLogger.info({ poiName: args.poiName, address: args.address, zipCode: args.zipCode }, "Tool called: show_google_maps_link");

    return {
      content: [],
      structuredContent: {
        "openai/responseInstructions": "A widget is showing a button that links to the map. Do not provide any text response.",
        poiName: args.poiName,
        address: args.address,
        zipCode: args.zipCode,
      }
    } as CallToolResult;
  }
};
