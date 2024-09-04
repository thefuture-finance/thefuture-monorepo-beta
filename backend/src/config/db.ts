import mongoose from "mongoose";
import "dotenv/config";

export async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "theFuture",
    });
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
}

export default connectDb;
