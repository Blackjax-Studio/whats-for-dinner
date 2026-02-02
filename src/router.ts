import { Router, Request, Response } from "express";
import { handleMcpRequest } from "./mcpRoutes.ts";

const router = Router();

router.all("/mcp", handleMcpRequest);

export default router;
