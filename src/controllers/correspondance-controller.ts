import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from "express";

import dbConnector from "../../database/connection";

import { CorrespondanceSchema } from '../models/correspondance-schema';
import { ICorrespondance } from '../interfaces/correspondance';

export default {
    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const conn = await dbConnector.openDBConnection();

            const Correspondance = conn.model<ICorrespondance>("Correspondance", CorrespondanceSchema);
            const correspondance = await Correspondance.findOne({ shortenedURL: req.params.shortenedURL });

            await dbConnector.closeDBConnection(conn);

            if (!correspondance) {
                throw new Error('Cannot find resource');
            }

            return res.redirect(correspondance?.originalURL);
        } catch (err) {
            next(err);
        }
    },

    async findOrUpdateOne(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const reqBody = req.body;

        try {
            const conn = await dbConnector.openDBConnection();

            const Correspondance = conn.model<ICorrespondance>("Correspondance", CorrespondanceSchema);
            let correspondance = await Correspondance.findOne({ shortenedURL: req.params.shortenedURL });

            await dbConnector.closeDBConnection(conn);

            if (!correspondance) {
                // build a small hash for the shortened URL here
                const randomString = randomBytes(8).toString("hex");
                const newCorrespondance = Object.assign({}, reqBody);
                newCorrespondance.shortenedURL = `ex.co/${randomString}`;
                correspondance = await Correspondance.create(reqBody);
            }
            return res
                .status(200)
                .json({ urlCorrespondance: correspondance });
        } catch (err) {
            next(err);
        }
    }
};
