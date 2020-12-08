import express, { Request, Response } from "express";

const router = express.Router();

import correspondanceController from "../controllers/url-correspondance-controller";

router.get("/:shortenedURL", correspondanceController.findOne);

router.put("/", correspondanceController.findOrUpdateOne);

router.use((err: Error, _req: Request, res: Response) => {
  console.error(err);
  return res.status(500).json({
    status: err,
    message: err.message,
  });
});

export = router;
