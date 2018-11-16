"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.usersNode = '/users';
        this.usersIdNode = this.usersNode + '/:id';
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get(this.usersNode, (req, res, next) => {
            users_model_1.User.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get(this.usersIdNode, (req, res, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.post(this.usersNode, (req, res, next) => {
            let user = new users_model_1.User(req.body);
            user.save()
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.put(this.usersIdNode, (req, res, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.patch(this.usersIdNode, (req, res, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
            ;
        });
        application.del(this.usersIdNode, (req, res, next) => {
            users_model_1.User.deleteOne({ _id: req.params.id }).exec().then(result => {
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
exports.usersRouter = new UsersRouter();
