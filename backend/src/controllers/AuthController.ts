import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce } from "siwe";
const factory = createFactory();

export const getPersonelInformation = factory.createHandlers((c) => {
  if (!c.get("session")?.siwe) {
    console.log("err");
    c.status(401);
    return c.json({ message: "You have to first sign_in" });
  }
  console.log("User is authenticated!");
  c.header("Content-Type", "text/plain");
  return c.text(
    `You are authenticated and your address is: ${c.get("session")}`,
  );
});

export const verify = factory.createHandlers((c) => {
  console.log("verify");
  const session = {};
  try {
    const body = c.req.valid("json");
    // let SIWEObject = new SiweMessage(body.message);
    // const { data: message } = await SIWEObject.verify({
    //   signature: body.signature,
    //   nonce: "",
    // });

    // setCookie(c, "session", "ads", {
    //   sameSite: "lax", // Use Lax for local testing
    //   httpOnly: true,
    //   maxAge: 1000,
    //   expires: new Date(Date.UTC(2024, 11, 24, 10, 30, 59, 900)),
    //   // domain: "localhost", // Optional: specify only the domain name, or omit
    // });

    c.header(
      "Set-Cookie",
      "sessionid=z2s5v7c5wwrt1kpc7bs12n7qclmgbcav; expires=Sun, 14 Jan 2024 19:25:28 GMT; HttpOnly; Max-Age=1209600; Path=/; SameSite=None; Secure",
    );

    c.status(200);
    return c.json(true);
  } catch (e: any) {
    console.log(e);
    return c.json({ message: e.message });
  }
});

export const getNonce = factory.createHandlers((c) => {
  console.log("nonce");
  let nonce = generateNonce();
  c.header("Content-Type", "text/plain");
  c.status(200);
  nonce = "";
  return c.json(nonce);
});
