import express, { Request, Response } from "express";

const router = express.Router();

import correspondanceController from "../controllers/url-correspondance-controller";

router.get("/:shortenedURL", correspondanceController.findOne);

router.post("/", correspondanceController.findOrUpdateOne);

router.use((err: Error, _req: Request, res: Response) => {
  console.error(err.message);
  return res.status(500).json({
    status: err,
    message: err.message,
  });
});

export = router;
