import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce } from "siwe";
import { Env } from "../app";
const factory = createFactory<Env>();

export const getPortfolioData = factory.createHandlers((c) => {
  return c.json({ data: "asd" });
});
