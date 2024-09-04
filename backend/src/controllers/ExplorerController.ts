import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce } from "siwe";
const factory = createFactory();

export const getMarketData = factory.createHandlers((c) => {
  return c.text(`You are authenticated and your address is`);
});
