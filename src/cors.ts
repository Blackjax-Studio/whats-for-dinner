import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["content-type", "mcp-session-id"],
  exposedHeaders: ["Mcp-Session-Id"],
};
