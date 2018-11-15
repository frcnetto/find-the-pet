"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../common/router");
const locations_model_1 = require("./locations.model");
const restify_errors_1 = require("restify-errors");
class LocationRouter extends router_1.Router {
    constructor() {
        super();
        this.locationsNode = '/locations';
        this.locationsIdNode = this.locationsNode + '/:id';
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get(this.locationsNode, (req, res, next) => {
            locations_model_1.Location.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get(this.locationsIdNode, (req, res, next) => {
            locations_model_1.Location.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.post(this.locationsNode, (req, res, next) => {
            if (req.body instanceof Array) {
                let locations = new locations_model_1.Location();
                locations.collection.insert(req.body)
                    .then(this.render(res, next))
                    .catch(next);
            }
            else {
                let location = new locations_model_1.Location(req.body);
                location.save()
                    .then(this.render(res, next))
                    .catch(next);
            }
        });
        application.put(this.locationsIdNode, (req, res, next) => {
            const options = { overwrite: true };
            locations_model_1.Location.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return locations_model_1.Location.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.patch(this.locationsIdNode, (req, res, next) => {
            const options = { new: true };
            locations_model_1.Location.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.del(this.locationsIdNode, (req, res, next) => {
            locations_model_1.Location.deleteOne({ _id: req.params.id }).exec().then(result => {
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
exports.locationsRouter = new LocationRouter();
