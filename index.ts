import express, { Request, Response } from "express";

const app = express();

import cors, { CorsOptions } from "cors";

const whitelist = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: whitelist[0],
  methods: ["GET"],
};

const PORT = 8080;

import mongoose from "mongoose";

mongoose.Promise = global.Promise;

import urlCorrespondanceController from "./src/routers/url-correspondance-router";

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/urls", urlCorrespondanceController);

app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    message: "Resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`--- Server listening on port ${PORT} ----`);
});
