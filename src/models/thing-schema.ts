import { Schema } from "mongoose";

const ThingSchema: Schema = new Schema({
  prop1: String,
  prop2: String,
  prop3: String,
});

export { ThingSchema };
