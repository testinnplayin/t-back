import { Schema } from "mongoose";

const URLCorrespondanceSchema: Schema = new Schema(
  {
    originalURL: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    shortenedURL: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "url-correspondances",
  }
);

export { URLCorrespondanceSchema };
