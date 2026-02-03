import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["POST", "GET", "OPTIONS", "HEAD"],
  allowedHeaders: ["content-type", "mcp-session-id", "authorization"],
  exposedHeaders: ["Mcp-Session-Id"],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
