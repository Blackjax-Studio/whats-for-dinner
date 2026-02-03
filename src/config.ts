export const config = {
  port: Number(process.env.PORT ?? 8787),
  appName: process.env.APP_NAME || "Whats for Dinner",
  mcpPath: "/mcp",
  openaiChallengeToken: process.env.OPENAI_CHALLENGE_TOKEN || "AIcXGP4Gdy4D4AwIMDrNST1_1dyfKyvSr-riPlz3-5k",
};
