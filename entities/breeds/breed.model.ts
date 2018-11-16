import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Breed extends mongoose.Document {
    name: string
}

const breedsSchema = new Schema( {
    name: String
} );

export const Breed = mongoose.model<Breed>( 'Breed', breedsSchema );