"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const users_model_1 = require("./users.model");
const model_router_1 = require("../../common/model-router");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.usersNode = '/users';
        this.usersIdNode = this.usersNode + '/:id';
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get(this.usersNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.findAll }
        ]));
        application.get(this.usersIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.findById] }
        ]));
        application.post(this.usersNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: this.save }
        ]));
        application.put(this.usersIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.replace] }
        ]));
        application.patch(this.usersIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.update] }
        ]));
        application.del(this.usersIdNode, restify_1.default.plugins.conditionalHandler([
            { version: '1.0.0', handler: [this.validateId, this.delete] }
        ]));
    }
}
exports.usersRouter = new UsersRouter();
