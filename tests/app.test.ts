import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocking must happen before importing the server file
const mockApp = {
  set: vi.fn(),
  use: vi.fn(),
  get: vi.fn(),
  listen: vi.fn((port, callback) => {
    if (callback) callback();
  }),
};

vi.mock("express", () => {
  const mockExpress = vi.fn(() => mockApp);
  (mockExpress as any).static = vi.fn(() => "mocked-static");
  return {
    default: mockExpress,
    Router: vi.fn(() => ({
      get: vi.fn(),
      all: vi.fn(),
    })),
  };
});

vi.mock("cors", () => ({
  default: vi.fn(() => "mocked-cors"),
}));

vi.mock("../src/config/config.ts", () => ({
  config: {
    port: 8787,
    appName: "Test App",
    mcpPath: "/mcp",
  },
}));

vi.mock("../src/config/logger.ts", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    child: vi.fn().mockReturnThis(),
  },
  setServerId: vi.fn(),
}));

vi.mock("../src/router.ts", () => ({
  default: "mocked-router",
}));

describe("app.ts", () => {
  it("should initialize the server correctly", async () => {
    // Import the server file to trigger its side effects
    await import("../src/app.ts");

    // Verify express app configuration
    // expect(mockApp.set).toHaveBeenCalledWith("view engine", "ejs"); // Removed in actual code

    // Check for CORS and router usage
    expect(mockApp.use).toHaveBeenCalledWith("mocked-cors");
    expect(mockApp.use).toHaveBeenCalledWith("mocked-router");

    // Verify app.listen was called
    expect(mockApp.listen).toHaveBeenCalledWith(8787, expect.any(Function));
  });
});
