"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    age: {
        type: Number,
        min: 0
    },
    birth: {
        type: Date,
        max: new Date()
    },
    active: {
        type: Boolean,
        default: 'no'
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
