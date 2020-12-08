import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";

import dbConnector from "../../database/connection";

import { URLCorrespondanceSchema } from "../models/url-correspondance-schema";
import {
  ICorrespondance,
  IURLCorrespondanceSchema,
} from "../interfaces/url-correspondance";

export default {
  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const conn = await dbConnector.openDBConnection();

      const Correspondance = conn.model<IURLCorrespondanceSchema>(
        "Correspondance",
        URLCorrespondanceSchema
      );
      const correspondance = await Correspondance.findOne({
        shortenedURL: req.params.shortenedURL,
      });

      await dbConnector.closeDBConnection(conn);

      if (!correspondance) {
        throw new Error("Cannot find resource");
      }

      return res.redirect(correspondance?.originalURL);
    } catch (err) {
      next;
    }
  },

  async findOrUpdateOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
      console.log('IAMHERE');
    const reqBody = req.body;

    try {
      const conn = await dbConnector.openDBConnection();

      const Correspondance = conn.model<IURLCorrespondanceSchema>(
        "Correspondance",
        URLCorrespondanceSchema
      );
      let correspondance = await Correspondance.findOne({
        originalURL: reqBody.originalURL,
      });

      if (!correspondance) {
        // build a small hash for the shortened URL here
        const randomString = randomBytes(8).toString("hex");
        const newCorrespondance: ICorrespondance = Object.assign({}, reqBody);
        newCorrespondance.shortenedURL = randomString;

        correspondance = await Correspondance.create(newCorrespondance);
      }
      correspondance.shortenedURL = `ex.co/${correspondance.shortenedURL}`;
      await dbConnector.closeDBConnection(conn);

      return res.status(200).json({ urlCorrespondance: correspondance });
    } catch (err) {
      next;
    }
  },
};
