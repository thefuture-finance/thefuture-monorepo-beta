import { Hono } from "hono";
import { getMarketData } from "../controllers/ExplorerController";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const explorerRoute = new Hono().get("/personal_information", ...getMarketData);

export default explorerRoute;
