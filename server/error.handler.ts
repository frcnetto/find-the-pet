import * as restify from 'restify';

export const errorHandler = function ( req: restify.Request, res: restify.Response, err: any, callback: restify.Next ) {

    err.toJSON = function customToJSON() {
        return {
            message: err.message
        };
    };

    switch ( err.name ) {
        case 'MongoError':
            if ( err.code === 11000 )
                err.statusCode = 400;
            break;

        case 'ValidationError':
            err.statusCode = 400;

        default:
            err.statusCode = 500;
            break;
    }

    return callback();
}