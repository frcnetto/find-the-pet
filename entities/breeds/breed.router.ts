import { Router } from '../../common/router'
import restify from 'restify';
import { Breed } from './breed.model';
import { NotFoundError } from 'restify-errors';

class BreedsRouter extends Router {

    breedsNode = '/breeds';
    breedsIdNode = this.breedsNode + '/:id';

    applyRoutes( application: restify.Server ) {
        application.get( this.breedsNode, ( req: restify.Request, res, next ) => {
            Breed.find()
                .then( this.render( res, next ) )
                .catch( next );
        } );

        application.get( this.breedsIdNode, ( req, res, next ) => {
            Breed.findById( req.params.id )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.post( this.breedsNode, ( req, res, next ) => {
            if ( req.body instanceof Array ) {
                let breeds = new Breed();

                breeds.collection.insert( req.body )
                    .then( this.render( res, next ) )
                    .catch( next );

            } else {

                let breed = new Breed( req.body );

                breed.save()
                    .then( this.render( res, next ) )
                    .catch( next );

            }
        } );

        application.put( this.breedsIdNode, ( req, res, next ) => {
            const options = { overwrite: true }
            Breed.update( { _id: req.params.id }, req.body, options )
                .exec()
                .then( result => {
                    if ( result.n ) {
                        return Breed.findById( req.params.id );
                    } else {
                        throw new NotFoundError( 'Documento não encontrado.' );
                    }
                } )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.patch( this.breedsIdNode, ( req, res, next ) => {
            const options = { new: true };
            Breed.findByIdAndUpdate( req.params.id, req.body, options )
                .then( this.render( res, next ) )
                .catch( next );;
        } );

        application.del( this.breedsIdNode, ( req, res, next ) => {
            Breed.deleteOne( { _id: req.params.id } ).exec().then( result => {
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

export const breedsRouter = new BreedsRouter();