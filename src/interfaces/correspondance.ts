import { Document } from 'mongoose';

export interface ICorrespondance extends Document {
    originalURL: string;
    shortenedURL: string;
}