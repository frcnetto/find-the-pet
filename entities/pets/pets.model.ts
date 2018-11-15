import mongoose from 'mongoose';
import { values } from '../../common/values';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Pet extends mongoose.Document {
    size: any,
    age: any,
    color: any,
    breed_id: any,
    picture_url: string,
    location_id: any
}

const petsSchema = new Schema( {
    size: {
        type: String,
        enum: values.sizes
    },
    age: {
        type: String,
        enum: values.ages
    },
    color: {
        type: String,
        enum: values.colors
    },
    breed_id: ObjectId,
    picture_url: String,
    location_id: ObjectId
} );

export const Pet = mongoose.model<Pet>( 'Pet', petsSchema );