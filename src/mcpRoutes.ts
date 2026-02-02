import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createWhatsForDinnerServer } from "./mcpServer.ts";
import { logger } from "./logger.ts";

export async function handleMcpRequest(req: Request, res: Response) {
  const requestLogger = (req as any).logger || logger;
  const correlationId = (req as any).correlationId || randomUUID();

  requestLogger.info("Processing MCP request");

  const server = createWhatsForDinnerServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode
    enableJsonResponse: true,
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  try {
    await server.connect(transport);

    // Use a proxy-like object to satisfy the handleRequest type requirements
    // Attach requestLogger so tools can access it via the request object
    const mcpReq = Object.assign(Object.create(Object.getPrototypeOf(req)), req, {
      logger: requestLogger,
      correlationId: correlationId
    });

    await transport.handleRequest(mcpReq, res);
  } catch (error) {
    requestLogger.error({ error }, "Error handling MCP request");
    if (!res.headersSent) {
      res.status(500).send("Internal server error");
    }
  }
}
