import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleMcpRequest } from "../src/mcpRoutes.js";
import { Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createWhatsForDinnerServer } from "../src/mcpServer.js";
import { config } from "../src/config.js";
import router from "../src/router.js";

// Mock dependencies
vi.mock("../src/mcpServer.js", () => ({
  createWhatsForDinnerServer: vi.fn(),
}));

vi.mock("@modelcontextprotocol/sdk/server/streamableHttp.js", () => {
  const handleRequest = vi.fn();
  const close = vi.fn();
  return {
    StreamableHTTPServerTransport: vi.fn().mockImplementation(function() {
      return {
        handleRequest,
        close,
      };
    }),
  };
});

describe("mcpRoutes", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockServer: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReq = {
      headers: {},
      method: "POST",
      url: "/mcp",
      on: vi.fn(),
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      on: vi.fn(),
      headersSent: false,
    };

    mockServer = {
      connect: vi.fn().mockResolvedValue(undefined),
      close: vi.fn(),
    };

    (createWhatsForDinnerServer as any).mockReturnValue(mockServer);
  });

  it("should handle a successful MCP request", async () => {
    await handleMcpRequest(mockReq as Request, mockRes as Response);

    expect(createWhatsForDinnerServer).toHaveBeenCalled();
    expect(StreamableHTTPServerTransport).toHaveBeenCalled();
    expect(mockServer.connect).toHaveBeenCalled();

    // Check if handleRequest was called on the transport instance
    const transportInstance = (StreamableHTTPServerTransport as any).mock.results[0].value;
    expect(transportInstance.handleRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: expect.any(String),
        logger: expect.any(Object),
      }),
      mockRes
    );
  });

  it("should use the x-correlation-id header if provided", async () => {
    const correlationId = "test-correlation-id";
    (mockReq as any).correlationId = correlationId;

    await handleMcpRequest(mockReq as Request, mockRes as Response);

    const transportInstance = (StreamableHTTPServerTransport as any).mock.results[0].value;
    expect(transportInstance.handleRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: correlationId,
      }),
      mockRes
    );
  });

  it("should return 500 if an error occurs", async () => {
    mockServer.connect.mockRejectedValue(new Error("Connection failed"));

    await handleMcpRequest(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("Internal server error");
  });

  it("should not return 500 if headers were already sent", async () => {
    mockServer.connect.mockRejectedValue(new Error("Connection failed"));
    mockRes.headersSent = true;

    await handleMcpRequest(mockReq as Request, mockRes as Response);

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).not.toHaveBeenCalled();
  });

  it("should close transport and server on response close", async () => {
    let closeHandler: () => void = () => {};
    (mockRes.on as any).mockImplementation((event: string, handler: () => void) => {
      if (event === "close") {
        closeHandler = handler;
      }
    });

    await handleMcpRequest(mockReq as Request, mockRes as Response);

    // Simulate response close
    closeHandler();

    const transportInstance = (StreamableHTTPServerTransport as any).mock.results[0].value;
    expect(transportInstance.close).toHaveBeenCalled();
    expect(mockServer.close).toHaveBeenCalled();
  });

  describe("router", () => {
    it("should have a root route that renders index template", async () => {
      const mockReq = {} as Request;
      const mockRes = {
        render: vi.fn(),
      } as unknown as Response;

      // Find the GET / route handler
      const rootRoute = router.stack.find(
        (s: any) => s.route?.path === "/" && s.route?.methods?.get
      );
      expect(rootRoute).toBeDefined();

      const handler = rootRoute!.route!.stack[0].handle;
      await handler(mockReq, mockRes, () => {});
      expect(mockRes.render).toHaveBeenCalledWith("index", { appName: config.appName });
    });

    it("should have a /privacy route that renders privacy template", async () => {
      const mockReq = {} as Request;
      const mockRes = {
        render: vi.fn(),
      } as unknown as Response;

      const privacyRoute = router.stack.find(
        (s: any) => s.route?.path === "/privacy" && s.route?.methods?.get
      );
      expect(privacyRoute).toBeDefined();

      const handler = privacyRoute!.route!.stack[0].handle;
      await handler(mockReq, mockRes, () => {});
      expect(mockRes.render).toHaveBeenCalledWith("privacy", { appName: config.appName });
    });

    it("should have a /terms route that renders terms template", async () => {
      const mockReq = {} as Request;
      const mockRes = {
        render: vi.fn(),
      } as unknown as Response;

      const termsRoute = router.stack.find(
        (s: any) => s.route?.path === "/terms" && s.route?.methods?.get
      );
      expect(termsRoute).toBeDefined();

      const handler = termsRoute!.route!.stack[0].handle;
      await handler(mockReq, mockRes, () => {});
      expect(mockRes.render).toHaveBeenCalledWith("terms", { appName: config.appName });
    });

    it("should have a /support route that renders support template", async () => {
      const mockReq = {} as Request;
      const mockRes = {
        render: vi.fn(),
      } as unknown as Response;

      const supportRoute = router.stack.find(
        (s: any) => s.route?.path === "/support" && s.route?.methods?.get
      );
      expect(supportRoute).toBeDefined();

      const handler = supportRoute!.route!.stack[0].handle;
      await handler(mockReq, mockRes, () => {});
      expect(mockRes.render).toHaveBeenCalledWith("support", { appName: config.appName });
    });

    it("should have an /mcp route that calls handleMcpRequest", () => {
      const mcpRoute = router.stack.find(
        (s: any) => s.route?.path === "/mcp"
      );
      expect(mcpRoute).toBeDefined();
      expect(mcpRoute!.route!.stack[0].handle).toBe(handleMcpRequest);
    });
  });
});
