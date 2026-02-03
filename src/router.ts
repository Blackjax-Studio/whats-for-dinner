import { Router, Request, Response } from "express";
import { handleMcpRequest } from "./mcpRoutes.ts";
import { join } from "node:path";

const router = Router();

router.all("/mcp", handleMcpRequest);

router.get("/mcp.json", (req, res) => {
  res.sendFile(join(process.cwd(), "mcp.json"));
});

export default router;
