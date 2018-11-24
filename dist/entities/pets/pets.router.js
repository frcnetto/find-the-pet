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
        this.petsNode = '/pets';
        this.petsIdNode = this.petsNode + '/:id';
    }
    applyRoutes(application) {
        application.get(this.petsNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.findAll }
        ]));
        application.get(this.petsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.findById] }
        ]));
        application.post(this.petsNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.save }
        ]));
        application.put(this.petsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.replace] }
        ]));
        application.patch(this.petsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.update] }
        ]));
        application.del(this.petsIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.delete] }
        ]));
    }
}
exports.petsRouter = new PetsRouter();
