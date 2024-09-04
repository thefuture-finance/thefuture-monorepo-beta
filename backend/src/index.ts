import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt, JwtVariables } from "hono/jwt";
import { cors } from "hono/cors";
import { z } from "zod";
import { generateNonce, SiweMessage } from "siwe";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
import authRoute from "./routes/authRoute";

type Variables = {
  session: any;
} & JwtVariables;

const app = new Hono<{ Variables: Variables }>();

app.use(
  cors({
    origin: "http://localhost:5173", // Specify the exact origin
    allowHeaders: ["X-Custom-Header", "Content-Type"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true, // Allow cookies to be sent and received
  }),
);

app.use(async (c, next) => {
  const cookie = getCookie(c, "session") || {};
  console.log(cookie);
  // const session = JSON.parse(cookie);
  await next();
});

const routes = app.route("/auth", authRoute);

export type AppType = typeof routes;

export default app;
