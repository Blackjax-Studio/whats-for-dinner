import { describe, it, expect, vi } from "vitest";
import { createWhatsForDinnerServer } from "../src/mcpServer.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("mcpServer", () => {
  it("should create an McpServer instance", () => {
    const server = createWhatsForDinnerServer();
    expect(server).toBeInstanceOf(McpServer);
  });

  it("should register tools and resources correctly", () => {
    // Spy on McpServer prototype methods before creating the server
    const registerToolSpy = vi.spyOn(McpServer.prototype, "registerTool");
    const registerResourceSpy = vi.spyOn(McpServer.prototype, "registerResource");

    createWhatsForDinnerServer();

    expect(registerToolSpy).toHaveBeenCalledWith(
      "pick_random_meal",
      expect.any(Object),
      expect.any(Function)
    );

    expect(registerResourceSpy).toHaveBeenCalledWith(
      "pick-random-meal-widget",
      "ui://widget/pickRandomMeal.html",
      expect.any(Object),
      expect.any(Function)
    );

    registerToolSpy.mockRestore();
    registerResourceSpy.mockRestore();
  });
});
