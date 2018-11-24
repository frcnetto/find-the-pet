"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const pets_model_1 = require("./pets.model");
const model_router_1 = require("../../common/model-router");
class PetsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pets_model_1.Pet);
    }
    prepareOne(query) {
        return query
            .populate('breed')
            .populate('location');
    }
    envelope(document) {
        let resource = super.envelope(document);
        const breed = document.breed._id ? document.breed._id : document.breed;
        resource._links.breed = `/breed/${breed}`;
        const location = document.location._id ? document.location._id : document.location;
        resource._links.location = `location/${location}`;
        return resource;
    }
    applyRoutes(application) {
        application.get(this.basePath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.findAll }
        ]));
        application.get(this.baseIdPath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.findById] }
        ]));
        application.post(this.basePath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.save }
        ]));
        application.put(this.baseIdPath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.replace] }
        ]));
        application.patch(this.baseIdPath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.update] }
        ]));
        application.del(this.baseIdPath, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.delete] }
        ]));
    }
}
exports.petsRouter = new PetsRouter();
