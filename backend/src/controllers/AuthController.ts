import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce, SiweMessage } from "siwe";
const factory = createFactory();

export const getPersonelInformation = factory.createHandlers((c) => {
  if (!c.get("session").signature) {
    console.log("err");
    c.status(401);
    return c.json({ message: "You have to first sign_in" });
  }
  console.log("User is authenticated!");
  c.header("Content-Type", "text/plain");
  const session = c.get("session");
  console.log(session);
  return c.json({
    message: session.message.address,
    chainId: session.message.chainId,
  });
});

export const verify = factory.createHandlers(async (c) => {
  try {
    const body = c.req.valid("json");
    let SIWEObject = new SiweMessage(body.message);
    const { data: message } = await SIWEObject.verify({
      signature: body.signature,
      nonce: c.get("session").nonce,
    });

    setCookie(
      c,
      "session",
      JSON.stringify({
        message,
        signature: body.signature,
        nonce: c.get("session").nonce,
      }),
      {
        path: "/",
        sameSite: "None",
        secure: true,
        httpOnly: true,
        maxAge: 1000,
        expires: new Date(Date.UTC(2024, 11, 24, 10, 30, 59, 900)),
      },
    );

    c.status(200);
    return c.json(true);
  } catch (e: any) {
    console.log(e);
    return c.json({ message: e.message });
  }
});

export const getNonce = factory.createHandlers((c) => {
  let nonce = generateNonce();
  c.header("Content-Type", "text/plain");
  c.status(200);
  setCookie(c, "session", JSON.stringify({ nonce }), {
    path: "/",
    sameSite: "None",
    secure: true,
    httpOnly: true,
    maxAge: 1000,
    expires: new Date(Date.UTC(2024, 11, 24, 10, 30, 59, 900)),
  });
  return c.json(nonce);
});
