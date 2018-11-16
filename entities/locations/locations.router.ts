import { Router } from '../../common/router'
import restify from 'restify';
import { Location } from './locations.model';
import { NotFoundError } from 'restify-errors';

class LocationRouter extends Router {

    locationsNode = '/locations';
    locationsIdNode = this.locationsNode + '/:id';

    applyRoutes( application: restify.Server ) {
        application.get( this.locationsNode, ( req: restify.Request, res, next ) => {
            Location.find()
                .then( this.render( res, next ) )
                .catch( next );
        } );

        application.get( this.locationsIdNode, ( req, res, next ) => {
            Location.findById( req.params.id )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.post( this.locationsNode, ( req, res, next ) => {
            if ( req.body instanceof Array ) {
                let locations = new Location();

                locations.collection.insert( req.body )
                    .then( this.render( res, next ) )
                    .catch( next );

            } else {

                let location = new Location( req.body );

                location.save()
                    .then( this.render( res, next ) )
                    .catch( next );

            }
        } );

        application.put( this.locationsIdNode, ( req, res, next ) => {
            const options = { overwrite: true }
            Location.update( { _id: req.params.id }, req.body, options )
                .exec()
                .then( result => {
                    if ( result.n ) {
                        return Location.findById( req.params.id );
                    } else {
                        throw new NotFoundError( 'Documento não encontrado.' );
                    }
                } )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.patch( this.locationsIdNode, ( req, res, next ) => {
            const options = { new: true };
            Location.findByIdAndUpdate( req.params.id, req.body, options )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.del( this.locationsIdNode, ( req, res, next ) => {
            Location.deleteOne( { _id: req.params.id } ).exec().then( result => {
                console.log( result )
                if ( result.n )
                    res.send( 204 );
                else
                    throw new NotFoundError( 'Documento não encontrado.' );
                return next();
            } );
        } );
    }
}

export const locationsRouter = new LocationRouter();