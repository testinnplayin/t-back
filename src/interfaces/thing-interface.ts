import { Document } from "mongoose";
import { ProtoThingDoc } from "./proto-thing-doc";

export interface ThingInterface extends Document, ProtoThingDoc {}
