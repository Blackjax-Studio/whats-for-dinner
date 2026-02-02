export const config = {
  port: Number(process.env.PORT ?? 8787),
  appName: process.env.APP_NAME || "Whats for Dinner",
  mcpPath: "/mcp",
};
