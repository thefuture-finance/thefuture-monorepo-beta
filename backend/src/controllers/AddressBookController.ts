import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce, SiweMessage } from "siwe";
import { Env } from "../app";
import {
  addAddress,
  deleteAddress,
  getAddressBookByUser,
} from "../services/addressBookService";

const factory = createFactory<Env>();

export const getAddressBookByUserC = factory.createHandlers(async (c) => {
  const session = c.get("session");
  const data = await getAddressBookByUser(session.message.address);
  console.log(data);
  return c.json(data);
});
export const addAddressC = factory.createHandlers(async (c) => {
  const input = c.req.valid("json");
  const session = c.get("session");
  console.log(session);

  await addAddress(session?.message?.address, input.address, input.name);
  return c.json(true);
});
export const removeAddressC = factory.createHandlers(async (c) => {
  const input = c.req.valid("json");
  const session = c.get("session");

  await deleteAddress(session?.message?.address, input.address);
  return c.json(true);
});

export const logOut = factory.createHandlers((c) => {
  deleteCookie(c, "session");
  return c.json(true);
});
