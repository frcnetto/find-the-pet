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
        this.basePath = `/${this.model.collection.name}`;
        this.baseIdPath = `/${this.basePath}/:id`;
        this.pageSize = 10;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
    envelopeAll(documents, options = {}) {
        const resource = {
            _links: {
                previus: ``,
                self: `${options.url}`,
                next: ``
            },
            items: documents
        };
        if (options.page && options.count,  && options.pageSize) {
            if ((options.count - options.page * options.pageSize) > 0) {
                resource._links.next = `${this.basePath}?_page=${options.page + 1}`;
            }
            if (options.page > 1) {
                resource._links.previous = `${this.basePath}?_page=${options.page - 1}`;
            }
        }
        return resource;
    }
}
exports.ModelRouter = ModelRouter;
