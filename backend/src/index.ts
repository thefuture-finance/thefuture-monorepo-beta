import db from "./config/db";
import { app } from "./app";

(async () => await db())();
export default app;
