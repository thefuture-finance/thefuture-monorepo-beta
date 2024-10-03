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
import portfolioRoute from "./routes/portfolioRoute";
import explorerRoute from "./routes/explorerRoute";
import addressBookRoute from "./routes/addressBookRoute";

type Variables = {
  session: any;
} & JwtVariables;

export type Env = {
  Bindings: {
    DATABASE_URL: string;
    REDIS_URL: string;
  };
  Variables: Variables;
};

export const app = new Hono<Env>();

app.use(
  cors({
    origin: "http://localhost:5173", // Specify the exact origin
    allowHeaders: ["X-Custom-Header", "Content-Type"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true, // Allow cookies to be sent and received
  }),
);

app.use(async (c, next) => {
  console.log("middleware 1");
  const cookie = getCookie(c, "session");
  if (cookie) {
    const session = JSON.parse(cookie);
    c.set("session", session);
  }
  console.log("cookie", c.get("session"));
  await next();
});

const routes = app
  .route("/auth", authRoute)
  .route("/portfolio", portfolioRoute)
  .route("explorer", explorerRoute)
  .route("/addressBook", addressBookRoute);

export type AppType = typeof routes;
