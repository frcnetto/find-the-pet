"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    initializeDb() {
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connect(environment_1.environment.db.url, {
            useNewUrlParser: true
        });
    }
    initRouts(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify_1.default.createServer({
                    name: 'the-livery-api',
                    version: '0.0.1'
                });
                this.application.use(restify_1.default.plugins.queryParser());
                this.application.use(restify_1.default.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                routers.forEach(router => {
                    router.applyRoutes(this.application);
                });
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.errorHandler);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRouts(routers).then(() => this));
    }
}
exports.Server = Server;
