import { Schema, model } from "mongoose";

const addressBookSchema = new Schema({
  user: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  ens: { type: String, required: false },
});

addressBookSchema.index({ user: 1, address: 1 }, { unique: true });

export default model("AddressBook", addressBookSchema);
