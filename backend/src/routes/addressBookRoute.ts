import { Hono } from "hono";
import {
  getNonce,
  getPersonelInformation,
  logOut,
  verify,
} from "../controllers/AuthController";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  addAddressC,
  getAddressBookByUserC,
  removeAddressC,
} from "../controllers/AddressBookController";

const addressBookRoute = new Hono()
  .get("/getAddressBookByUser", ...getAddressBookByUserC)
  .post(
    "/addAddress",
    zValidator(
      "json",
      z.object({
        address: z.string(),
        name: z.string(),
        end: z.string().optional(),
      }),
      (result, c) => {
        if (!result.success) {
          console.log("res", result);
          return c.text("Invalid!", 400);
        }
      },
    ),
    ...addAddressC,
  )
  .delete(
    "/removeAddress",
    zValidator(
      "json",
      z.object({
        address: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          console.log("res", result);
          return c.text("Invalid!", 400);
        }
      },
    ),
    ...removeAddressC,
  );

export default addressBookRoute;
