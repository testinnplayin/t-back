import { Document } from "mongoose";

export interface ThingInterface extends Document {
  prop1: string;
  prop2: string;
  prop3: string;
}
