import express, { Request, Response } from "express";

const router = express.Router();

import correspondanceController from '../controllers/correspondance-controller';

router.get("/", correspondanceController.findOrUpdateOne);

router.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  return res.json({
    status: err,
    message: err.message,
  });
});

export = router;
