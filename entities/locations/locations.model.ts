import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Location extends mongoose.Document {
    coords: {
        latitude: number,
        longitude: number,
        altitude: number,
        accuracy: number,
        altitudeAccuracy: number,
        heading: number,
        speed: number
    },
    timestamp: number
}

const coordsSchema = new Schema( {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    altitudeAccuracy: Number,
    heading: Number,
    speed: Number
} );

const locationSchema = new Schema( {
    coords: coordsSchema,
    timestamp: Number
} );

export const Location = mongoose.model<Location>( 'Location', locationSchema );