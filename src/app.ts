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

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(requestLoggingMiddleware);
app.use(cors(corsOptions));
app.use(router);

// Initialize services and start server
app.listen(config.port, () => {
  logger.info(
    { port: config.port, mcpPath: config.mcpPath },
    `${config.appName} server listening on http://localhost:${config.port}${config.mcpPath}`
  );
});
