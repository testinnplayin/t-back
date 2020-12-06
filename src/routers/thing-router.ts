import express, { Request, Response } from "express";

const router = express.Router();

import thingController from "../controllers/thing-controller";

router.get("/", thingController.getThings);

router.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  return res.json({
    status: err,
    message: err.message,
  });
});

export = router;
