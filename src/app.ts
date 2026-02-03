#!/usr/bin/env node
import "dotenv/config";
import express from "express";
import cors from "cors";
import { corsOptions } from "./cors.ts";
import { config } from "./config.ts";
import { logger, setServerId, requestLoggingMiddleware } from "./logger.ts";
import router from "./router.ts";
import { randomUUID } from "crypto";

const serverId = randomUUID();
setServerId(serverId);

const app = express();

// Apply CORS - must be early in the middleware chain
app.use(cors(corsOptions));

// DO NOT use express.json() - the MCP SDK needs raw body streams
// It will handle parsing internally

app.get("/.well-known/openai-apps-challenge", (req, res) => {
  logger.info("Handling openai-apps-challenge request");
  res.set("Content-Type", "text/plain");
  res.send(config.openaiChallengeToken);
});

app.use(express.static("assets"));
app.use("/dist", express.static("web/dist"));
app.use(express.static("web/public", { dotfiles: "allow" }));
app.use(requestLoggingMiddleware);
app.use(router);

// Serve React app for all other routes (SPA fallback)
app.get(/^\/.*/, (req, res) => {
  res.sendFile("index.html", { root: "web/public" });
});

// Initialize services and start server
app.listen(config.port, () => {
  logger.info(
    { port: config.port, mcpPath: config.mcpPath },
    `${config.appName} server listening on http://localhost:${config.port}${config.mcpPath}`
  );
});
