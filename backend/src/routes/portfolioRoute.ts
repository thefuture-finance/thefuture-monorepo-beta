import { Hono } from "hono";
import { getPortfolioData } from "../controllers/PortfolioController";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const portfolioRoute = new Hono().get("/getPortfolioData", ...getPortfolioData);

export default portfolioRoute;
