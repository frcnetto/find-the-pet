"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../common/router");
const pets_model_1 = require("./pets.model");
const restify_errors_1 = require("restify-errors");
class PetsRouter extends router_1.Router {
    constructor() {
        super(...arguments);
        this.petsNode = '/pets';
        this.petsIdNode = this.petsNode + '/:id';
    }
    applyRoutes(application) {
        application.get(this.petsNode, (req, res, next) => {
            pets_model_1.Pet.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get(this.petsIdNode, (req, res, next) => {
            pets_model_1.Pet.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.post(this.petsNode, (req, res, next) => {
            if (req.body instanceof Array) {
                let pets = new pets_model_1.Pet();
                pets.collection.insert(req.body)
                    .then(this.render(res, next))
                    .catch(next);
            }
            else {
                let pet = new pets_model_1.Pet(req.body);
                pet.save()
                    .then(this.render(res, next))
                    .catch(next);
            }
        });
        application.put(this.petsIdNode, (req, res, next) => {
            const options = { overwrite: true };
            pets_model_1.Pet.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return pets_model_1.Pet.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.patch(this.petsIdNode, (req, res, next) => {
            const options = { new: true };
            pets_model_1.Pet.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.del(this.petsIdNode, (req, res, next) => {
            pets_model_1.Pet.deleteOne({ _id: req.params.id }).exec().then(result => {
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
exports.petsRouter = new PetsRouter();
