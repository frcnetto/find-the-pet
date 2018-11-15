"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, res, next) => {
    if (req.contentType() == mpContentType && req.method == 'PATCH')
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError(`Error: invalide content: ${e.message}`));
        }
    return next();
};
