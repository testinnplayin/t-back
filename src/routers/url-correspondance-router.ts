import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

import correspondanceController from "../controllers/url-correspondance-controller";

router.get("/:shortenedURL", correspondanceController.findOne);

router.post("/", correspondanceController.findOrUpdateOne);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  return res.status(500).json({
    status: err,
    message: err.message,
  });
});

export = router;
