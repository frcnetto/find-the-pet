"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const coordsSchema = new Schema({
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    altitudeAccuracy: Number,
    heading: Number,
    speed: Number
});
const locationSchema = new Schema({
    coords: coordsSchema,
    timestamp: Number
});
exports.Location = mongoose_1.default.model('Location', locationSchema);
