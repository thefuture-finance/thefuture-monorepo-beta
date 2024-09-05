import { Hono } from "hono";
import {
  getNonce,
  getPersonelInformation,
  verify,
} from "../controllers/AuthController";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const verifySchema = z.object({
  message: z.string(),
  signature: z.string(),
});
export type VerifySchemaType = z.infer<typeof verifySchema>;

const authRoute = new Hono()
  .get("/personal_information", ...getPersonelInformation)
  .post(
    "/verify",
    zValidator("json", verifySchema, (result, c) => {
      if (!result.success) {
        console.log("res", result);
        return c.text("Invalid!", 400);
      }
    }),
    ...verify,
  )
  .get("/nonce", ...getNonce);

export default authRoute;
