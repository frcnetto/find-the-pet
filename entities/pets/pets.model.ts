import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Pet extends mongoose.Document {
    size_id: any,
    age_id: any,
    color_id: any,
    picture_url: string,
    location_id: any
}

const petsSchema = new Schema( {
    size_id: ObjectId,
    age_id: ObjectId,
    color_id: ObjectId,
    picture_url: String,
    location_id: ObjectId
} );

export const Pet = mongoose.model<Pet>( 'Pet', petsSchema );