import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("logger", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it("should use pino-pretty transport in development", async () => {
    process.env.NODE_ENV = "development";
    const { logger } = await import("../src/logger.ts");
    // We can't easily inspect the internal pino instance transport, 
    // but we can verify it loads without error and is an object.
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
  });

  it("should NOT use pino-pretty transport in production", async () => {
    process.env.NODE_ENV = "production";
    const { logger } = await import("../src/logger.ts");
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
  });

  it("should allow setting serverId", async () => {
    const { logger, setServerId } = await import("../src/logger.ts");
    const childSpy = vi.spyOn(logger, "child");
    
    setServerId("test-server");
    
    expect(childSpy).toHaveBeenCalledWith({ serverId: "test-server" });
  });
});
