"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../common/router");
const breed_model_1 = require("./breed.model");
const restify_errors_1 = require("restify-errors");
class BreedsRouter extends router_1.Router {
    constructor() {
        super(...arguments);
        this.breedsNode = '/locations';
        this.breedsIdNode = this.breedsNode + '/:id';
    }
    applyRoutes(application) {
        application.get(this.breedsNode, (req, res, next) => {
            breed_model_1.Breed.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get(this.breedsIdNode, (req, res, next) => {
            breed_model_1.Breed.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.post(this.breedsNode, (req, res, next) => {
            if (req.body instanceof Array) {
                let breeds = new breed_model_1.Breed();
                breeds.collection.insert(req.body)
                    .then(this.render(res, next))
                    .catch(next);
            }
            else {
                let breed = new breed_model_1.Breed(req.body);
                breed.save()
                    .then(this.render(res, next))
                    .catch(next);
            }
        });
        application.put(this.breedsIdNode, (req, res, next) => {
            const options = { overwrite: true };
            breed_model_1.Breed.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return breed_model_1.Breed.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.patch(this.breedsIdNode, (req, res, next) => {
            const options = { new: true };
            breed_model_1.Breed.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.del(this.breedsIdNode, (req, res, next) => {
            breed_model_1.Breed.deleteOne({ _id: req.params.id }).exec().then(result => {
                console.log(result);
                if (result.n)
                    res.send(204);
                else
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                return next();
            });
        });
    }
}
exports.breedsRouter = new BreedsRouter();
