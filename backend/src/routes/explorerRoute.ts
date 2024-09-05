import { Hono } from "hono";
import { getMarketData } from "../controllers/ExplorerController";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const explorerRoute = new Hono().get("/getMarketData", ...getMarketData);

export default explorerRoute;
