import pino from "pino";
import { config } from "./config.ts";
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

const isDevelopment = process.env.NODE_ENV !== "production";

const baseLogger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", "res.headers['set-cookie']"],
    remove: true,
  },
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  base: {
    env: process.env.NODE_ENV || "development",
    service: config.appName,
  },
});

export let logger = baseLogger;

export const setServerId = (serverId: string) => {
  logger = baseLogger.child({ serverId });
};

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId = (req.headers["x-correlation-id"] as string) || randomUUID();
  const startTime = Date.now();

  // Create a child logger for this request
  const requestLogger = logger.child({
    correlationId,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  // Attach logger to request object
  (req as any).logger = requestLogger;
  (req as any).correlationId = correlationId;

  // Log request start
  requestLogger.debug({ headers: req.headers }, "Request started");

  // Log request completion
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    requestLogger.info(
      {
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      },
      "Request completed"
    );
  });

  next();
}
