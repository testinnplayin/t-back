import express, { Request, Response } from "express";

const app = express();

import cors, { CorsOptions } from "cors";

import { runScripts } from "./data/db-filler";

const whitelist = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: whitelist[0],
  methods: ["GET"],
};

const PORT = 8080;

import mongoose from "mongoose";

mongoose.Promise = global.Promise;

import thingRouter from "./src/routers/thing-router";

app.use(cors(corsOptions));

app.use("/things", thingRouter);

app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    message: "Resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`--- Server listening on port ${PORT} ----`);
  runScripts();
});
