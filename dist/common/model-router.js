"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose_1 = __importDefault(require("mongoose"));
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (req, res, next) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                next(new restify_errors_1.NotFoundError('Documento não encontrado'));
            else
                next();
        };
        this.findAll = (req, res, next) => {
            this.model.find()
                .then(this.render(res, next))
                .catch(next);
        };
        this.findById = (req, res, next) => {
            this.model.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        };
        this.save = (req, res, next) => {
            let user = new this.model(req.body);
            user.save()
                .then(this.render(res, next))
                .catch(next);
        };
        this.replace = (req, res, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(res, next))
                .catch(next);
        };
        this.update = (req, res, next) => {
            const options = { runValidators: true, new: true };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
        };
        this.delete = (req, res, next) => {
            this.model.deleteOne({ _id: req.params.id }).exec().then(result => {
                console.log(result);
                if (result.n)
                    res.send(204);
                else
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                return next();
            });
        };
    }
}
exports.ModelRouter = ModelRouter;
