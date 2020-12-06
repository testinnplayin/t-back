import { NextFunction, Request, Response } from "express";
import dbConnector from "../../database/connection";

import { ThingSchema } from "../models/thing-schema";
import { ThingInterface } from "../interfaces/thing-interface";

export default {
  async getThings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const query = req.query;
    try {
      const conn = await dbConnector.openDBConnection();

      const Thing = conn.model<ThingInterface>("Thing", ThingSchema);
      const things = await Thing.find(query);
      await dbConnector.closeDBConnection(conn);
      return res.status(200).json({ things: things });
    } catch (err) {
      next(err);
    }
  },
};
