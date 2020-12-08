import { Document } from "mongoose";

export interface ICorrespondance {
  originalURL: string;
  shortenedURL: string;
}

export interface IURLCorrespondanceSchema extends Document, ICorrespondance {}
