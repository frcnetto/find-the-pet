"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const breed_model_1 = require("./breed.model");
const model_router_1 = require("../../common/model-router");
class BreedsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(breed_model_1.Breed);
        this.breedsNode = '/breeds';
        this.breedsIdNode = this.breedsNode + '/:id';
    }
    applyRoutes(application) {
        application.get(this.breedsNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.findAll }
        ]));
        application.get(this.breedsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.findById] }
        ]));
        application.post(this.breedsNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.save }
        ]));
        application.put(this.breedsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.replace] }
        ]));
        application.patch(this.breedsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.update] }
        ]));
        application.del(this.breedsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.delete] }
        ]));
    }
}
exports.breedsRouter = new BreedsRouter();
