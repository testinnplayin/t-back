import { Schema } from 'mongoose';

const CorrespondanceSchema: Schema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortenedURL: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
});

export { CorrespondanceSchema };