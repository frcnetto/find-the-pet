"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const petsSchema = new Schema({
    size_id: ObjectId,
    age_id: ObjectId,
    color_id: ObjectId,
    picture_url: String,
    location_id: ObjectId
});
exports.Pet = mongoose_1.default.model('Pet', petsSchema);
