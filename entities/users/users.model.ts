import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface User extends mongoose.Document {
    name    : string,
    email   : string,
    password: string,
    age     : number,
    birth   : Date,
    active  : boolean
}

const userSchema = new Schema( {
    name: {
        type: String
    },
    email: {
        type  : String,
        unique: true
    },
    password: {
        type  : String,
        select: false
    },
    age: {
        type: Number,
        min : 0
    },
    birth: {
        type: Date,
        max : new Date()
    },
    active: {
        type   : Boolean,
        default: 'no'
    }
} );

export const User = mongoose.model<User>( 'User', userSchema );