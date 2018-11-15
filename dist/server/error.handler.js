"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = function (req, res, err, callback) {
    err.toJSON = function customToJSON() {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000)
                err.statusCode = 400;
            break;
        case 'ValidationError':
            err.statusCode = 400;
        default:
            err.statusCode = 500;
            break;
    }
    return callback();
};
