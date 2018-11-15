"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const values_1 = require("../../common/values");
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const petsSchema = new Schema({
    size: {
        type: String,
        enum: values_1.values.sizes
    },
    age: {
        type: String,
        enum: values_1.values.ages
    },
    color: {
        type: String,
        enum: values_1.values.colors
    },
    breed_id: ObjectId,
    picture_url: String,
    location_id: ObjectId
});
exports.Pet = mongoose_1.default.model('Pet', petsSchema);
