import { Router, Request, Response } from "express";
import { handleMcpRequest } from "./mcpRoutes.ts";
import {config} from "./config.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index", { appName: config.appName });
});

router.get("/privacy", (req: Request, res: Response) => {
  res.render("privacy", { appName: config.appName });
});

router.get("/terms", (req: Request, res: Response) => {
  res.render("terms", { appName: config.appName });
});

router.get("/support", (req: Request, res: Response) => {
  res.render("support", { appName: config.appName });
});

router.get("/how-it-works", (req: Request, res: Response) => {
  res.render("howItWorks", { appName: config.appName });
});

router.get("/see-it-work", (req: Request, res: Response) => {
  res.render("seeItWork", { appName: config.appName });
});

router.get("/test-widget", (req: Request, res: Response) => {
  res.render("testWidget", { appName: config.appName });
});

router.get("/render-test-widget", (req: Request, res: Response) => {
  res.render("pickRandomMeal", {});
});

router.all("/mcp", handleMcpRequest);

export default router;
