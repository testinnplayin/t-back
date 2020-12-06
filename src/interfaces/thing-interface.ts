import { Document } from "mongoose";
import { ProtoThingDoc } from "./proto-thing-doc";

export interface ThingInterface extends Document, ProtoThingDoc {
  prop1: string;
  prop2: string;
  prop3: string;
}
